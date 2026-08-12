import { Router } from "express";
import limiter from "../middleware/rateLimiter.js";
import reportController from "../controllers/reportController.js";
import { authenticate } from "../middleware/authentication.js";

const router = Router();

router.use(limiter);
router.use(authenticate);

router.get("/", reportController.listMyReports);

router.get("/:id", reportController.getReportById);

router.delete("/:id", reportController.deleteReport);

export default router;
