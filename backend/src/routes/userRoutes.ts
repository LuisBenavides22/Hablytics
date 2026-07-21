import { UserController } from "../controllers/userController";
import { Router } from 'express';

const router = Router();

const userController =  new UserController();

router.post('/createuser', userController.createUser);

router.put('/updateuser/:id', userController.updateUser);

router.delete('/deleteuser/:id', userController.deleteUser);

router.get('/getuser/:id', userController.getUser);

router.get('/getall', userController.getAll);

export default router;