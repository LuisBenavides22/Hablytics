import { Router } from "express";
import authController from "../controllers/authController";
import limiter from "../middleware/rateLimiter";

const router = Router();

router.use(limiter);

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.put('/resetpassword', authController.resetPassword);

router.post('/forgotpassword', authController.forgotPassword);

export default router;

