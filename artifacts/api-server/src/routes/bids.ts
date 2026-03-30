import { Router } from "express";
import { db } from "@workspace/db";
import { bidsTable, projectsTable, usersTable } from "@workspace/db/schema";
import { eq, and } from "drizzle-orm";
import { authenticate, requireRole, type AuthenticatedRequest } from "../middlewares/auth.js";

const router = Router();

async function getBidWithDetails(bidId: number) {
  const [bid] = await db.select().from(bidsTable).where(eq(bidsTable.id, bidId));
  if (!bid) return null;

  const [project] = await db.select().from(projectsTable).where(eq(projectsTable.id, bid.projectId));
  const [user] = await db.select({ id: usersTable.id, name: usersTable.name, email: usersTable.email, role: usersTable.role, phone: usersTable.phone, bio: usersTable.bio, skills: usersTable.skills, avatarUrl: usersTable.avatarUrl, isActive: usersTable.isActive, createdAt: usersTable.createdAt }).from(usersTable).where(eq(usersTable.id, bid.userId));

  return { ...bid, project: project || null, user: user || null };
}

router.get("/user/mine", authenticate, requireRole("USER"), async (req: AuthenticatedRequest, res) => {
  try {
    const bids = await db.select().from(bidsTable).where(eq(bidsTable.userId, req.user!.id));
    const withDetails = await Promise.all(bids.map(b => getBidWithDetails(b.id)));
    res.json(withDetails.filter(Boolean));
  } catch (err) {
    req.log.error({ err }, "Get user bids error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/project/:projectId", authenticate, async (req, res) => {
  try {
    const projectId = parseInt(req.params.projectId);
    const bids = await db.select().from(bidsTable).where(eq(bidsTable.projectId, projectId));
    const withDetails = await Promise.all(bids.map(b => getBidWithDetails(b.id)));
    res.json(withDetails.filter(Boolean));
  } catch (err) {
    req.log.error({ err }, "Get bids by project error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", authenticate, requireRole("ADMIN"), async (req, res) => {
  try {
    const { projectId, userId } = req.query as { projectId?: string; userId?: string };
    let bids = await db.select().from(bidsTable);
    if (projectId) bids = bids.filter(b => b.projectId === parseInt(projectId));
    if (userId) bids = bids.filter(b => b.userId === parseInt(userId));
    const withDetails = await Promise.all(bids.map(b => getBidWithDetails(b.id)));
    res.json(withDetails.filter(Boolean));
  } catch (err) {
    req.log.error({ err }, "Get bids error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", authenticate, requireRole("USER"), async (req: AuthenticatedRequest, res) => {
  try {
    const { projectId, amount, proposal, timeline } = req.body;
    if (!projectId || !amount) {
      res.status(400).json({ error: "Bad Request", message: "projectId and amount required" });
      return;
    }
    const [existing] = await db.select().from(bidsTable).where(and(eq(bidsTable.projectId, projectId), eq(bidsTable.userId, req.user!.id)));
    if (existing) {
      res.status(400).json({ error: "Bad Request", message: "You have already bid on this project" });
      return;
    }
    const [bid] = await db.insert(bidsTable).values({ projectId, userId: req.user!.id, amount: String(amount), proposal, timeline, status: "Pending" }).returning();
    const detail = await getBidWithDetails(bid.id);
    res.status(201).json(detail);
  } catch (err) {
    req.log.error({ err }, "Create bid error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const bid = await getBidWithDetails(id);
    if (!bid) {
      res.status(404).json({ error: "Not Found" });
      return;
    }
    res.json(bid);
  } catch (err) {
    req.log.error({ err }, "Get bid by id error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(bidsTable).where(eq(bidsTable.id, id));
    res.json({ message: "Bid deleted successfully" });
  } catch (err) {
    req.log.error({ err }, "Delete bid error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
