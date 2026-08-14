import { UserController } from "../controllers/userController.js";
import { Router } from 'express';
import { authenticate } from "../middleware/authentication.js";
import limiter from "../middleware/rateLimiter.js";

const router = Router();

const userController = new UserController();

router.use(limiter);

router.put('/updateuser/:id', authenticate, userController.updateUser);

router.delete('/deleteuser/:id', authenticate, userController.deleteUser);

router.get('/getuser/:id', authenticate, userController.getUser);

router.get('/:id/connections', authenticate, userController.getUserConnections);

router.get('/:id/reports', authenticate, userController.getUserReports);

export default router;
