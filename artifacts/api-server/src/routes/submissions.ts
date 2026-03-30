import { Router } from "express";
import { db } from "@workspace/db";
import { submissionsTable, projectsTable, usersTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { authenticate, requireRole, type AuthenticatedRequest } from "../middlewares/auth.js";

const router = Router();

async function getSubmissionWithDetails(subId: number) {
  const [sub] = await db.select().from(submissionsTable).where(eq(submissionsTable.id, subId));
  if (!sub) return null;

  const [project] = await db.select().from(projectsTable).where(eq(projectsTable.id, sub.projectId));
  const [user] = await db.select({ id: usersTable.id, name: usersTable.name, email: usersTable.email, role: usersTable.role, phone: usersTable.phone, bio: usersTable.bio, skills: usersTable.skills, avatarUrl: usersTable.avatarUrl, isActive: usersTable.isActive, createdAt: usersTable.createdAt }).from(usersTable).where(eq(usersTable.id, sub.userId));

  return { ...sub, project: project || null, user: user || null };
}

router.get("/user/mine", authenticate, requireRole("USER"), async (req: AuthenticatedRequest, res) => {
  try {
    const subs = await db.select().from(submissionsTable).where(eq(submissionsTable.userId, req.user!.id));
    const withDetails = await Promise.all(subs.map(s => getSubmissionWithDetails(s.id)));
    res.json(withDetails.filter(Boolean));
  } catch (err) {
    req.log.error({ err }, "Get user submissions error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/project/:projectId", authenticate, async (req, res) => {
  try {
    const projectId = parseInt(req.params.projectId);
    const subs = await db.select().from(submissionsTable).where(eq(submissionsTable.projectId, projectId));
    const withDetails = await Promise.all(subs.map(s => getSubmissionWithDetails(s.id)));
    res.json(withDetails.filter(Boolean));
  } catch (err) {
    req.log.error({ err }, "Get submissions by project error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", authenticate, requireRole("ADMIN"), async (req, res) => {
  try {
    const { projectId, status } = req.query as { projectId?: string; status?: string };
    let subs = await db.select().from(submissionsTable);
    if (projectId) subs = subs.filter(s => s.projectId === parseInt(projectId));
    if (status) subs = subs.filter(s => s.status === status);
    const withDetails = await Promise.all(subs.map(s => getSubmissionWithDetails(s.id)));
    res.json(withDetails.filter(Boolean));
  } catch (err) {
    req.log.error({ err }, "Get submissions error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", authenticate, requireRole("USER"), async (req: AuthenticatedRequest, res) => {
  try {
    const { projectId, fileUrl, fileDescription, notes } = req.body;
    if (!projectId || !fileUrl) {
      res.status(400).json({ error: "Bad Request", message: "projectId and fileUrl required" });
      return;
    }
    const [sub] = await db.insert(submissionsTable).values({ projectId, userId: req.user!.id, fileUrl, fileDescription, notes, status: "Pending" }).returning();
    await db.update(projectsTable).set({ status: "Submitted", updatedAt: new Date() }).where(eq(projectsTable.id, projectId));
    const detail = await getSubmissionWithDetails(sub.id);
    res.status(201).json(detail);
  } catch (err) {
    req.log.error({ err }, "Create submission error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const sub = await getSubmissionWithDetails(id);
    if (!sub) {
      res.status(404).json({ error: "Not Found" });
      return;
    }
    res.json(sub);
  } catch (err) {
    req.log.error({ err }, "Get submission by id error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", authenticate, requireRole("ADMIN"), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status, adminNotes } = req.body;
    const [updated] = await db.update(submissionsTable).set({ status, adminNotes, updatedAt: new Date() }).where(eq(submissionsTable.id, id)).returning();
    if (!updated) {
      res.status(404).json({ error: "Not Found" });
      return;
    }
    if (status === "Approved" || status === "Forwarded") {
      await db.update(projectsTable).set({ status: "Completed", updatedAt: new Date() }).where(eq(projectsTable.id, updated.projectId));
    }
    const detail = await getSubmissionWithDetails(updated.id);
    res.json(detail);
  } catch (err) {
    req.log.error({ err }, "Update submission error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
