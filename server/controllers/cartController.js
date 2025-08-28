import User from '../models/User.js';
import Item from '../models/Item.js';

// Add items to cart
export const addToCart = async (req, res) => {
    const { userId, itemId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found." })

        const item = await Item.findById(itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        const existingItem = user.cart.find(i => i.item.equals(itemId));

        if (existingItem) {
            return res.status(204).json({ message: "Already in the cart." });
        }
        if (!existingItem) {
            user.cart.push({ item: itemId, quantity: 1 });
        }

        await user.save();
        res.status(200).json(user.cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// View cart
export const viewCart = async (req, res) => {
    try {

        // Fetch the user by ID and populate cart with item details
        const user = await User.findById(req.user.id).populate('cart.item');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.cart || user.cart.length === 0) {
            return res.status(200).json({ message: 'Cart is empty' });
        }

        res.status(200).json(user.cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update quantity of an item in the cart
export const updateCartQuantity = async (req, res) => {
    const { itemId, quantity } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found." });

        const cartItem = user.cart.find(i => i.item.equals(itemId));
        if (cartItem) {

            cartItem.quantity = quantity;
            if (quantity <= 0) {
                user.cart = user.cart.filter(i => !i.item.equals(itemId)); // Remove item if quantity is zero or less
            }
        } else {
            return res.status(404).json({ message: "Item not found in cart." });
        }

        await user.save();
        res.status(200).json(user.cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Remove item from the cart
export const removeFromCart = async (req, res) => {
    const { itemId } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found." });

        user.cart = user.cart.filter(i => !i.item.equals(itemId));

        await user.save();
        res.status(200).json(user.cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


