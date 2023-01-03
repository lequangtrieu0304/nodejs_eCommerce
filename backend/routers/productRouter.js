import express from 'express';
const router = express.Router();

import productController from '../controllers/productController';
import { isAdmin, isAuth } from '../utils';

router.get('/', productController.getProducts);

router.get('/:id', productController.getProductById)

router.post('/', isAuth, isAdmin, productController.createdProduct);

router.put('/:id', isAuth, isAdmin, productController.updateProduct)

export default router;