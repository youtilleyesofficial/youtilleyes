import { Router } from "express";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db/schema";
import { eq, ilike, or } from "drizzle-orm";
import { authenticate, requireRole, type AuthenticatedRequest } from "../middlewares/auth.js";

const router = Router();

router.get("/", authenticate, requireRole("ADMIN"), async (req, res) => {
  try {
    const { role, search } = req.query as { role?: string; search?: string };
    let query = db.select({ id: usersTable.id, name: usersTable.name, email: usersTable.email, role: usersTable.role, phone: usersTable.phone, bio: usersTable.bio, skills: usersTable.skills, avatarUrl: usersTable.avatarUrl, isActive: usersTable.isActive, createdAt: usersTable.createdAt }).from(usersTable);

    const conditions: any[] = [];
    if (role && ["ADMIN", "CLIENT", "USER"].includes(role)) {
      conditions.push(eq(usersTable.role, role as any));
    }
    if (search) {
      conditions.push(or(ilike(usersTable.name, `%${search}%`), ilike(usersTable.email, `%${search}%`)));
    }

    let users;
    if (conditions.length > 0) {
      users = await query.where(conditions.length === 1 ? conditions[0] : conditions.reduce((a, b) => ({ ...a, ...b })));
    } else {
      users = await query;
    }

    res.json(users);
  } catch (err) {
    req.log.error({ err }, "Get users error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const id = parseInt(req.params.id);
    const [user] = await db.select({ id: usersTable.id, name: usersTable.name, email: usersTable.email, role: usersTable.role, phone: usersTable.phone, bio: usersTable.bio, skills: usersTable.skills, avatarUrl: usersTable.avatarUrl, isActive: usersTable.isActive, createdAt: usersTable.createdAt }).from(usersTable).where(eq(usersTable.id, id));
    if (!user) {
      res.status(404).json({ error: "Not Found", message: "User not found" });
      return;
    }
    res.json(user);
  } catch (err) {
    req.log.error({ err }, "Get user by id error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
