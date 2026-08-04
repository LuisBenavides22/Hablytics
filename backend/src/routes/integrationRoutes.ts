import { Router } from "express";
import integrationController from "../controllers/integrationController";
import { authenticate } from "../middleware/authentication";
import limiter from "../middleware/rateLimiter";

const router = Router();

router.use(limiter);

router.get('/github/redirect', authenticate, integrationController.githubRedirect);

router.get('/github/callback', integrationController.githubCallback);

export default router;
