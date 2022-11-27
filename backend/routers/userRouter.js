import express from 'express';
import userController from '../controllers/userController';
import { isAuth } from '../utils';

const router = express.Router();

router.get('/createAdmin', userController.createAdmin);

router.post('/signin', userController.signIn);

router.post('/register', userController.register);

router.put('/update/:id', isAuth, userController.update)

export default router;