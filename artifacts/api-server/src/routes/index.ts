import { Router } from "express";
import healthRouter from "./health.js";
import authRouter from "./auth.js";
import usersRouter from "./users.js";
import projectsRouter from "./projects.js";
import bidsRouter from "./bids.js";
import submissionsRouter from "./submissions.js";
import dashboardRouter from "./dashboard.js";

const router = Router();

router.use("/", healthRouter);
router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/projects", projectsRouter);
router.use("/bids", bidsRouter);
router.use("/submissions", submissionsRouter);
router.use("/dashboard", dashboardRouter);

export default router;
