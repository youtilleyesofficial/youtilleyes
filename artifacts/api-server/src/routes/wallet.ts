import { Router } from "express";
import { db } from "@workspace/db";
import { walletBalancesTable, withdrawalRequestsTable, usersTable } from "@workspace/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { authenticate, requireRole, type AuthenticatedRequest } from "../middlewares/auth.js";

const router = Router();

async function ensureWallet(userId: number) {
  const [existing] = await db.select().from(walletBalancesTable).where(eq(walletBalancesTable.userId, userId));
  if (!existing) {
    await db.insert(walletBalancesTable).values({ userId, balance: "0", totalEarned: "0" });
    const [created] = await db.select().from(walletBalancesTable).where(eq(walletBalancesTable.userId, userId));
    return created;
  }
  return existing;
}

router.get("/", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const wallet = await ensureWallet(req.user!.id);
    const requests = await db
      .select()
      .from(withdrawalRequestsTable)
      .where(eq(withdrawalRequestsTable.userId, req.user!.id))
      .orderBy(desc(withdrawalRequestsTable.createdAt))
      .limit(10);

    res.json({ wallet, requests });
  } catch (err) {
    req.log.error({ err }, "Get wallet error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/withdraw", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const { amount, bankName, accountNumber, ifscCode, accountHolder, upiId } = req.body;
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }
    const wallet = await ensureWallet(req.user!.id);
    if (parseFloat(wallet.balance) < parseFloat(amount)) {
      return res.status(400).json({ error: "Insufficient balance" });
    }
    if (!upiId && (!bankName || !accountNumber || !ifscCode || !accountHolder)) {
      return res.status(400).json({ error: "Provide UPI ID or complete bank details" });
    }

    const pendingCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(withdrawalRequestsTable)
      .where(eq(withdrawalRequestsTable.userId, req.user!.id));
    const pending = await db
      .select()
      .from(withdrawalRequestsTable)
      .where(eq(withdrawalRequestsTable.userId, req.user!.id))
      .orderBy(desc(withdrawalRequestsTable.createdAt));
    const hasPending = pending.some(r => r.status === "pending");
    if (hasPending) {
      return res.status(400).json({ error: "You already have a pending withdrawal request" });
    }

    await db.insert(withdrawalRequestsTable).values({
      userId: req.user!.id,
      amount: amount.toString(),
      bankName: bankName || null,
      accountNumber: accountNumber || null,
      ifscCode: ifscCode || null,
      accountHolder: accountHolder || null,
      upiId: upiId || null,
      status: "pending",
    });

    await db.update(walletBalancesTable)
      .set({ balance: (parseFloat(wallet.balance) - parseFloat(amount)).toFixed(2) })
      .where(eq(walletBalancesTable.userId, req.user!.id));

    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Withdraw error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/admin/all", authenticate, requireRole("ADMIN"), async (req, res) => {
  try {
    const wallets = await db
      .select({
        userId: walletBalancesTable.userId,
        balance: walletBalancesTable.balance,
        totalEarned: walletBalancesTable.totalEarned,
        updatedAt: walletBalancesTable.updatedAt,
        userName: usersTable.name,
        userEmail: usersTable.email,
      })
      .from(walletBalancesTable)
      .leftJoin(usersTable, eq(walletBalancesTable.userId, usersTable.id))
      .orderBy(desc(walletBalancesTable.balance));
    res.json(wallets);
  } catch (err) {
    req.log.error({ err }, "Admin get wallets error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/admin/withdrawals", authenticate, requireRole("ADMIN"), async (req, res) => {
  try {
    const requests = await db
      .select({
        id: withdrawalRequestsTable.id,
        amount: withdrawalRequestsTable.amount,
        bankName: withdrawalRequestsTable.bankName,
        accountNumber: withdrawalRequestsTable.accountNumber,
        ifscCode: withdrawalRequestsTable.ifscCode,
        accountHolder: withdrawalRequestsTable.accountHolder,
        upiId: withdrawalRequestsTable.upiId,
        status: withdrawalRequestsTable.status,
        adminNote: withdrawalRequestsTable.adminNote,
        createdAt: withdrawalRequestsTable.createdAt,
        updatedAt: withdrawalRequestsTable.updatedAt,
        userId: withdrawalRequestsTable.userId,
        userName: usersTable.name,
        userEmail: usersTable.email,
      })
      .from(withdrawalRequestsTable)
      .leftJoin(usersTable, eq(withdrawalRequestsTable.userId, usersTable.id))
      .orderBy(desc(withdrawalRequestsTable.createdAt));
    res.json(requests);
  } catch (err) {
    req.log.error({ err }, "Admin get withdrawals error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/admin/withdrawals/:id", authenticate, requireRole("ADMIN"), async (req: AuthenticatedRequest, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status, adminNote, creditBack } = req.body;
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const [request] = await db.select().from(withdrawalRequestsTable).where(eq(withdrawalRequestsTable.id, id));
    if (!request) return res.status(404).json({ error: "Request not found" });
    if (request.status !== "pending") return res.status(400).json({ error: "Already processed" });

    await db.update(withdrawalRequestsTable)
      .set({ status, adminNote: adminNote || null, updatedAt: new Date() })
      .where(eq(withdrawalRequestsTable.id, id));

    if (status === "rejected") {
      const wallet = await ensureWallet(request.userId);
      await db.update(walletBalancesTable)
        .set({ balance: (parseFloat(wallet.balance) + parseFloat(request.amount)).toFixed(2) })
        .where(eq(walletBalancesTable.userId, request.userId));
    }

    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Admin update withdrawal error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/admin/credit", authenticate, requireRole("ADMIN"), async (req: AuthenticatedRequest, res) => {
  try {
    const { userId, amount, note } = req.body;
    if (!userId || !amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return res.status(400).json({ error: "Invalid userId or amount" });
    }
    const wallet = await ensureWallet(parseInt(userId));
    const newBalance = (parseFloat(wallet.balance) + parseFloat(amount)).toFixed(2);
    const newTotal = (parseFloat(wallet.totalEarned) + parseFloat(amount)).toFixed(2);
    await db.update(walletBalancesTable)
      .set({ balance: newBalance, totalEarned: newTotal, updatedAt: new Date() })
      .where(eq(walletBalancesTable.userId, parseInt(userId)));
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Admin credit wallet error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
