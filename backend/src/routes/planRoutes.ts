import planController from "../controllers/planController.js";
import { Router } from "express";
import authenticate from "../middleware/authentication.js";
import limiter from "../middleware/rateLimiter.js";
import { requirePlan } from "../middleware/requirePlan.js";

const router = Router();

router.use(limiter);

router.use(authenticate);

router.use(requirePlan(["PRO", "ELITE"]));

router.post("/", planController.generate);

router.get("/", planController.getPlans);

router.get("/active", planController.getActivePlan);

router.patch("/:id/done", planController.markPlanDone);

router.patch("/:id/extend", planController.extendPlan);

router.patch("/:id/tasks/:index", planController.toggleTask);

router.delete("/:id", planController.deletePlanById);

export default router;
