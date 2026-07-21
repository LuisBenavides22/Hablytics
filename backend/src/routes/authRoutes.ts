import { Router } from "express";
import authController from "../controllers/authController";
import limiter from "../middleware/rateLimiter";

const router = Router();

router.post('/signup', limiter, authController.signup);

router.post('/login', limiter, authController.login);

router.put('/resetpassword', limiter, authController.resetPassword);

router.post('/forgotpassword', limiter, authController.forgotPassword);

router.post('/refresh-token', limiter, authController.refreshToken);

router.post('/logout', limiter, authController.logout);

export default router;
