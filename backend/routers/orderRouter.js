import express from 'express';
const router = express.Router();

import orderController from '../controllers/orderController';
import { isAuth } from '../utils';

router.get('/:id', isAuth, orderController.getOrder);

router.post('/create-order', isAuth, orderController.createOrder);

export default router;