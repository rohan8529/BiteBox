import express from 'express';
import { addToCart, removeFromCart, updateCartQuantity, viewCart } from '../controllers/cartController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add', authMiddleware, addToCart);
router.get('/view', authMiddleware, viewCart);
router.put('/update', authMiddleware, updateCartQuantity)
router.delete('/remove', authMiddleware, removeFromCart);


export default router;
