import express from 'express';
import { checkout, getUserOrders } from '../controllers/orderController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/checkout', authMiddleware, checkout);
router.get('/view-orders', authMiddleware, getUserOrders)

export default router;
