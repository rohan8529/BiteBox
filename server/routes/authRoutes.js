import express from 'express';
import { register, login, logout, checkAuth } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/check', authMiddleware, checkAuth);
router.post('/logout', logout)

export default router;
