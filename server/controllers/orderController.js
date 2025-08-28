import User from '../models/User.js';
import Order from '../models/Order.js';
import Item from '../models/Item.js';

// Checkout and create order
export const checkout = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findById(userId).populate('cart.item');

        // Check for stock availability
        for (let cartItem of user.cart) {
            const item = await Item.findById(cartItem.item._id);
            if (item.stock < cartItem.quantity) {
                return res.status(400).json({ message: `${item.name} is out of stock` });
            }
        }

        let totalAmount = 0;
        for (let cartItem of user.cart) {
            totalAmount += cartItem.quantity * cartItem.item.price;
            await Item.findByIdAndUpdate(cartItem.item._id, { $inc: { stock: -cartItem.quantity } });
        }

        const order = new Order({ user: userId, items: user.cart, totalAmount });
        await order.save();
        user.orders.push(order);
        user.cart = []; // Clear cart after checkout
        await user.save();

        res.json({ message: 'Order placed successfully', orderId: order._id });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const getUserOrders = async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    try {
        const orders = await Order.find({ user: userId }).populate('items.item');
        if (orders.length === 0) {
            return res.status(200).json({ message: 'No orders found for this user.', orders: [] });

        }
        res.status(200).json({
            orders
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching orders.',
            error: error.message
        });
    }
};
