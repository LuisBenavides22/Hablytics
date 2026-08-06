import { Router } from "express";
import limiter from "../middleware/rateLimiter";
import reportController from "../controllers/reportController";
import { authenticate } from "../middleware/authentication";

const router = Router();

router.use(limiter);
router.use(authenticate);

router.get("/", reportController.listMyReports);

router.get("/:id", reportController.getReportById);

router.delete("/:id", reportController.deleteReport);

export default router;
