import { Router } from "express";
import { db } from "@workspace/db";
import { usersTable, projectsTable, bidsTable, submissionsTable } from "@workspace/db/schema";
import { eq, count, and } from "drizzle-orm";
import { authenticate, requireRole, type AuthenticatedRequest } from "../middlewares/auth.js";

const router = Router();

router.get("/admin", authenticate, requireRole("ADMIN"), async (req, res) => {
  try {
    const [allUsers] = await db.select({ count: count() }).from(usersTable);
    const [clients] = await db.select({ count: count() }).from(usersTable).where(eq(usersTable.role, "CLIENT"));
    const [workers] = await db.select({ count: count() }).from(usersTable).where(eq(usersTable.role, "USER"));
    const [allProjects] = await db.select({ count: count() }).from(projectsTable);
    const [openProjects] = await db.select({ count: count() }).from(projectsTable).where(eq(projectsTable.status, "Open"));
    const [assignedProjects] = await db.select({ count: count() }).from(projectsTable).where(eq(projectsTable.status, "Assigned"));
    const [inProgressProjects] = await db.select({ count: count() }).from(projectsTable).where(eq(projectsTable.status, "In-Progress"));
    const [completedProjects] = await db.select({ count: count() }).from(projectsTable).where(eq(projectsTable.status, "Completed"));
    const [allBids] = await db.select({ count: count() }).from(bidsTable);
    const [pendingSubs] = await db.select({ count: count() }).from(submissionsTable).where(eq(submissionsTable.status, "Pending"));

    const allProjectsList = await db.select().from(projectsTable).limit(50);
    const categoryMap: Record<string, number> = {};
    allProjectsList.forEach(p => {
      const cat = p.category || "Uncategorized";
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });
    const projectsByCategory = Object.entries(categoryMap).map(([category, count]) => ({ category, count }));

    const recentProjectsRaw = await db.select().from(projectsTable).limit(5);

    res.json({
      totalUsers: Number(allUsers?.count ?? 0),
      totalClients: Number(clients?.count ?? 0),
      totalWorkers: Number(workers?.count ?? 0),
      totalProjects: Number(allProjects?.count ?? 0),
      openProjects: Number(openProjects?.count ?? 0),
      assignedProjects: Number(assignedProjects?.count ?? 0),
      inProgressProjects: Number(inProgressProjects?.count ?? 0),
      completedProjects: Number(completedProjects?.count ?? 0),
      totalBids: Number(allBids?.count ?? 0),
      pendingSubmissions: Number(pendingSubs?.count ?? 0),
      projectsByCategory,
      recentProjects: recentProjectsRaw,
    });
  } catch (err) {
    req.log.error({ err }, "Admin dashboard error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/client", authenticate, requireRole("CLIENT"), async (req: AuthenticatedRequest, res) => {
  try {
    const clientId = req.user!.id;
    const [total] = await db.select({ count: count() }).from(projectsTable).where(eq(projectsTable.clientId, clientId));
    const [open] = await db.select({ count: count() }).from(projectsTable).where(and(eq(projectsTable.clientId, clientId), eq(projectsTable.status, "Open")));
    const [inProg] = await db.select({ count: count() }).from(projectsTable).where(and(eq(projectsTable.clientId, clientId), eq(projectsTable.status, "In-Progress")));
    const [completed] = await db.select({ count: count() }).from(projectsTable).where(and(eq(projectsTable.clientId, clientId), eq(projectsTable.status, "Completed")));

    const myProjects = await db.select({ id: projectsTable.id }).from(projectsTable).where(eq(projectsTable.clientId, clientId));
    const projectIds = myProjects.map(p => p.id);

    let totalBidsReceived = 0;
    for (const pid of projectIds) {
      const [bc] = await db.select({ count: count() }).from(bidsTable).where(eq(bidsTable.projectId, pid));
      totalBidsReceived += Number(bc?.count ?? 0);
    }

    const recentProjects = await db.select().from(projectsTable).where(eq(projectsTable.clientId, clientId)).limit(5);
    const recentSubmissions = projectIds.length > 0
      ? await db.select().from(submissionsTable).where(eq(submissionsTable.projectId, projectIds[0])).limit(5)
      : [];

    res.json({
      totalProjects: Number(total?.count ?? 0),
      openProjects: Number(open?.count ?? 0),
      inProgressProjects: Number(inProg?.count ?? 0),
      completedProjects: Number(completed?.count ?? 0),
      totalBidsReceived,
      recentProjects,
      recentSubmissions,
    });
  } catch (err) {
    req.log.error({ err }, "Client dashboard error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/user", authenticate, requireRole("USER"), async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user!.id;
    const [totalBids] = await db.select({ count: count() }).from(bidsTable).where(eq(bidsTable.userId, userId));
    const [accepted] = await db.select({ count: count() }).from(bidsTable).where(and(eq(bidsTable.userId, userId), eq(bidsTable.status, "Accepted")));
    const [pending] = await db.select({ count: count() }).from(bidsTable).where(and(eq(bidsTable.userId, userId), eq(bidsTable.status, "Pending")));
    const [activeProjects] = await db.select({ count: count() }).from(projectsTable).where(eq(projectsTable.assignedUserId, userId));
    const [totalSubs] = await db.select({ count: count() }).from(submissionsTable).where(eq(submissionsTable.userId, userId));
    const [approvedSubs] = await db.select({ count: count() }).from(submissionsTable).where(and(eq(submissionsTable.userId, userId), eq(submissionsTable.status, "Approved")));
    const [availableProjects] = await db.select({ count: count() }).from(projectsTable).where(eq(projectsTable.status, "Open"));

    const recentBids = await db.select().from(bidsTable).where(eq(bidsTable.userId, userId)).limit(5);
    const assignedProjects = await db.select().from(projectsTable).where(eq(projectsTable.assignedUserId, userId));

    res.json({
      totalBids: Number(totalBids?.count ?? 0),
      acceptedBids: Number(accepted?.count ?? 0),
      pendingBids: Number(pending?.count ?? 0),
      activeProjects: Number(activeProjects?.count ?? 0),
      totalSubmissions: Number(totalSubs?.count ?? 0),
      approvedSubmissions: Number(approvedSubs?.count ?? 0),
      availableProjects: Number(availableProjects?.count ?? 0),
      recentBids,
      assignedProjects,
    });
  } catch (err) {
    req.log.error({ err }, "User dashboard error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/activity", authenticate, async (req, res) => {
  try {
    const recentProjects = await db.select({ id: projectsTable.id, title: projectsTable.title, createdAt: projectsTable.createdAt, clientId: projectsTable.clientId }).from(projectsTable).limit(5);
    const recentBids = await db.select({ id: bidsTable.id, userId: bidsTable.userId, projectId: bidsTable.projectId, createdAt: bidsTable.createdAt }).from(bidsTable).limit(5);
    const recentSubs = await db.select({ id: submissionsTable.id, userId: submissionsTable.userId, projectId: submissionsTable.projectId, createdAt: submissionsTable.createdAt }).from(submissionsTable).limit(5);

    const activities: any[] = [];

    for (const p of recentProjects) {
      const [client] = await db.select({ name: usersTable.name }).from(usersTable).where(eq(usersTable.id, p.clientId));
      activities.push({
        id: `project_${p.id}`,
        type: "project_created",
        message: `New project posted: "${p.title}"`,
        userName: client?.name,
        projectTitle: p.title,
        createdAt: p.createdAt,
      });
    }

    for (const b of recentBids) {
      const [user] = await db.select({ name: usersTable.name }).from(usersTable).where(eq(usersTable.id, b.userId));
      const [project] = await db.select({ title: projectsTable.title }).from(projectsTable).where(eq(projectsTable.id, b.projectId));
      activities.push({
        id: `bid_${b.id}`,
        type: "bid_submitted",
        message: `${user?.name ?? "User"} submitted a bid on "${project?.title ?? "a project"}"`,
        userName: user?.name,
        projectTitle: project?.title,
        createdAt: b.createdAt,
      });
    }

    for (const s of recentSubs) {
      const [user] = await db.select({ name: usersTable.name }).from(usersTable).where(eq(usersTable.id, s.userId));
      const [project] = await db.select({ title: projectsTable.title }).from(projectsTable).where(eq(projectsTable.id, s.projectId));
      activities.push({
        id: `sub_${s.id}`,
        type: "submission_uploaded",
        message: `${user?.name ?? "User"} submitted work for "${project?.title ?? "a project"}"`,
        userName: user?.name,
        projectTitle: project?.title,
        createdAt: s.createdAt,
      });
    }

    activities.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    res.json(activities.slice(0, 15));
  } catch (err) {
    req.log.error({ err }, "Recent activity error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
