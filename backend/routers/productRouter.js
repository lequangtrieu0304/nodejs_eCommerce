import express from 'express';
const router = express.Router();

import productController from '../controllers/productController';
import { isAdmin, isAuth } from '../utils';

router.post('/', isAuth, isAdmin, productController.createdProduct);

export default router;