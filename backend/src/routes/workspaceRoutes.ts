import { Router } from "express";
import workspaceController from "../controllers/workspaceController.js";
import { authenticate } from "../middleware/authentication.js";
import limiter from "../middleware/rateLimiter.js";

const router = Router();

router.use(limiter);

router.post("/getReport", authenticate, workspaceController.getReport);

export default router;
