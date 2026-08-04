import { UserController } from "../controllers/userController";
import { Router } from 'express';
import { authenticate } from "../middleware/authentication";
import limiter from "../middleware/rateLimiter";

const router = Router();

const userController = new UserController();

router.use(limiter);

router.post('/createuser', userController.createUser);

router.put('/updateuser/:id', authenticate, userController.updateUser);

router.delete('/deleteuser/:id', authenticate, userController.deleteUser);

router.get('/getuser/:id', authenticate, userController.getUser);

router.get('/getall', authenticate, userController.getAll);

router.put('/updaterole/:id', authenticate, userController.updateRole);

router.get('/:id/connections', authenticate, userController.getUserConnections);

router.get('/:id/reports', authenticate, userController.getUserReports);

export default router;
