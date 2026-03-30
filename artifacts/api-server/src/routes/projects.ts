import { Router } from "express";
import { db } from "@workspace/db";
import { projectsTable, usersTable, bidsTable } from "@workspace/db/schema";
import { eq, and, ilike, sql, count } from "drizzle-orm";
import { authenticate, requireRole, type AuthenticatedRequest } from "../middlewares/auth.js";

const router = Router();

async function getProjectWithDetails(projectId: number) {
  const [project] = await db.select().from(projectsTable).where(eq(projectsTable.id, projectId));
  if (!project) return null;

  const [client] = project.clientId
    ? await db.select({ id: usersTable.id, name: usersTable.name, email: usersTable.email, role: usersTable.role, phone: usersTable.phone, bio: usersTable.bio, skills: usersTable.skills, avatarUrl: usersTable.avatarUrl, isActive: usersTable.isActive, createdAt: usersTable.createdAt }).from(usersTable).where(eq(usersTable.id, project.clientId))
    : [null];

  const [assignedUser] = project.assignedUserId
    ? await db.select({ id: usersTable.id, name: usersTable.name, email: usersTable.email, role: usersTable.role, phone: usersTable.phone, bio: usersTable.bio, skills: usersTable.skills, avatarUrl: usersTable.avatarUrl, isActive: usersTable.isActive, createdAt: usersTable.createdAt }).from(usersTable).where(eq(usersTable.id, project.assignedUserId))
    : [null];

  const [bidCountResult] = await db.select({ count: count() }).from(bidsTable).where(eq(bidsTable.projectId, project.id));

  return { ...project, client, assignedUser, bidCount: Number(bidCountResult?.count ?? 0) };
}

router.get("/client/mine", authenticate, requireRole("CLIENT"), async (req: AuthenticatedRequest, res) => {
  try {
    const projects = await db.select().from(projectsTable).where(eq(projectsTable.clientId, req.user!.id));
    const withDetails = await Promise.all(projects.map(p => getProjectWithDetails(p.id)));
    res.json(withDetails.filter(Boolean));
  } catch (err) {
    req.log.error({ err }, "Get client projects error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/user/assigned", authenticate, requireRole("USER"), async (req: AuthenticatedRequest, res) => {
  try {
    const projects = await db.select().from(projectsTable).where(eq(projectsTable.assignedUserId, req.user!.id));
    const withDetails = await Promise.all(projects.map(p => getProjectWithDetails(p.id)));
    res.json(withDetails.filter(Boolean));
  } catch (err) {
    req.log.error({ err }, "Get user assigned projects error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    const { status, search, category } = req.query as { status?: string; search?: string; category?: string };
    let projects = await db.select().from(projectsTable);

    if (status) {
      projects = projects.filter(p => p.status === status);
    }
    if (category) {
      projects = projects.filter(p => p.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      projects = projects.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    const withDetails = await Promise.all(projects.map(p => getProjectWithDetails(p.id)));
    res.json(withDetails.filter(Boolean));
  } catch (err) {
    req.log.error({ err }, "Get projects error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", authenticate, requireRole("CLIENT"), async (req: AuthenticatedRequest, res) => {
  try {
    const { title, description, category, budget, deadline } = req.body;
    if (!title || !description) {
      res.status(400).json({ error: "Bad Request", message: "Title and description required" });
      return;
    }
    const [project] = await db.insert(projectsTable).values({
      title,
      description,
      category,
      budget: budget ? String(budget) : undefined,
      deadline: deadline ? new Date(deadline) : undefined,
      clientId: req.user!.id,
      status: "Open",
    }).returning();
    const detail = await getProjectWithDetails(project.id);
    res.status(201).json(detail);
  } catch (err) {
    req.log.error({ err }, "Create project error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const project = await getProjectWithDetails(id);
    if (!project) {
      res.status(404).json({ error: "Not Found", message: "Project not found" });
      return;
    }
    res.json(project);
  } catch (err) {
    req.log.error({ err }, "Get project by id error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, category, budget, deadline, status } = req.body;
    const [updated] = await db.update(projectsTable)
      .set({ title, description, category, budget: budget ? String(budget) : undefined, deadline: deadline ? new Date(deadline) : undefined, status, updatedAt: new Date() })
      .where(eq(projectsTable.id, id))
      .returning();
    if (!updated) {
      res.status(404).json({ error: "Not Found" });
      return;
    }
    const detail = await getProjectWithDetails(updated.id);
    res.json(detail);
  } catch (err) {
    req.log.error({ err }, "Update project error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(projectsTable).where(eq(projectsTable.id, id));
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    req.log.error({ err }, "Delete project error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/:id/assign", authenticate, requireRole("ADMIN"), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { userId } = req.body;
    if (!userId) {
      res.status(400).json({ error: "Bad Request", message: "userId required" });
      return;
    }
    await db.update(bidsTable).set({ status: "Rejected" }).where(eq(bidsTable.projectId, id));
    await db.update(bidsTable).set({ status: "Accepted" }).where(and(eq(bidsTable.projectId, id), eq(bidsTable.userId, userId)));
    const [updated] = await db.update(projectsTable)
      .set({ assignedUserId: userId, status: "Assigned", updatedAt: new Date() })
      .where(eq(projectsTable.id, id))
      .returning();
    if (!updated) {
      res.status(404).json({ error: "Not Found" });
      return;
    }
    const detail = await getProjectWithDetails(updated.id);
    res.json(detail);
  } catch (err) {
    req.log.error({ err }, "Assign project error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
