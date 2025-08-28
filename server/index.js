import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

// Import routes
import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Initialize environment variables
dotenv.config();

// Initialize Express app
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true // Allow cookies to be sent
};

// To allow cors
app.use(cors(corsOptions))


app.use(cookieParser());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
connectDB();

// Define routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/items', itemRoutes); // Item browsing routes
app.use('/api/cart', cartRoutes);  // Cart handling routes
app.use('/api/orders', orderRoutes); // Checkout and orders

// Root route
app.get('/', (req, res) => {
    res.send('Food Ordering Platform API is running');
});

// Define PORT from environment or use default 5000
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
