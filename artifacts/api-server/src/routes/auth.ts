import { Router } from "express";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, verifyPassword, generateToken } from "../lib/auth.js";
import { authenticate, type AuthenticatedRequest } from "../middlewares/auth.js";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Bad Request", message: "Email and password required" });
      return;
    }
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if (!user || !verifyPassword(password, user.password)) {
      res.status(401).json({ error: "Unauthorized", message: "Invalid credentials" });
      return;
    }
    const token = generateToken(user.id, user.role);
    const { password: _, ...safeUser } = user;
    res.json({ user: safeUser, token });
  } catch (err) {
    req.log.error({ err }, "Login error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, phone, bio, skills } = req.body;
    if (!name || !email || !password || !role) {
      res.status(400).json({ error: "Bad Request", message: "Name, email, password, and role required" });
      return;
    }
    if (!["CLIENT", "USER"].includes(role)) {
      res.status(400).json({ error: "Bad Request", message: "Role must be CLIENT or USER" });
      return;
    }
    const [existing] = await db.select({ id: usersTable.id }).from(usersTable).where(eq(usersTable.email, email));
    if (existing) {
      res.status(400).json({ error: "Bad Request", message: "Email already registered" });
      return;
    }
    const hashed = hashPassword(password);
    const [user] = await db.insert(usersTable).values({ name, email, password: hashed, role, phone, bio, skills }).returning();
    const token = generateToken(user.id, user.role);
    const { password: _, ...safeUser } = user;
    res.status(201).json({ user: safeUser, token });
  } catch (err) {
    req.log.error({ err }, "Register error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/me", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, req.user!.id));
    if (!user) {
      res.status(404).json({ error: "Not Found" });
      return;
    }
    const { password: _, ...safeUser } = user;
    res.json(safeUser);
  } catch (err) {
    req.log.error({ err }, "Get me error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

export default router;
