import { Router } from "express";
import integrationController from "../controllers/integrationController.js";
import { authenticate } from "../middleware/authentication.js";
import limiter from "../middleware/rateLimiter.js";

const router = Router();

router.use(limiter);

router.get('/github/redirect', authenticate, integrationController.githubRedirect);

router.get('/github/callback', integrationController.githubCallback);

export default router;
