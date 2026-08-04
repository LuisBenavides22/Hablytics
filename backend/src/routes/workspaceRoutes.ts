import { Router } from "express";
import workspaceController from "../controllers/workspaceController";
import { authenticate } from "../middleware/authentication";
import limiter from "../middleware/rateLimiter";

const router = Router();

router.use(limiter);

router.post("/getReport", authenticate, workspaceController.getReport);

export default router;
