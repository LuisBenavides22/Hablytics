import { Router } from "express";
import { authenticate } from "../middleware/authentication.js";
import limiter from "../middleware/rateLimiter.js";
import analyticsController from "../controllers/analyticsController.js";

const router = Router();

router.use(limiter);
router.use(authenticate);

router.get("/", analyticsController.getSummary);

router.get("/by-service", analyticsController.getReportByService);

export default router;