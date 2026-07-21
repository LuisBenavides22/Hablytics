import { Router } from "express";
import workspaceController from "../controllers/workspaceController";
import limiter from "../middleware/rateLimiter";

const router = Router()

router.get("/getReport", workspaceController.getReport, limiter);

export default router;