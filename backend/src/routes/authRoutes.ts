import { Router } from "express";
import authController from "../controllers/authController";
import limiter from "../middleware/rateLimiter";

const router = Router();

router.post('/signup', authController.signup, limiter);

router.post('/login', authController.login, limiter);

router.put('/resetpassword', authController.resetPassword, limiter);

router.post('/forgotpassword', authController.forgotPassword, limiter);

export default router;
