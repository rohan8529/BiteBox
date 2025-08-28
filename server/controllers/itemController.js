import Item from '../models/Item.js';

export const getAllItems = async (req, res) => {
    // Extract page and limit from query parameters, with default values
    const page = parseInt(req.query.page, 10) || 1;

    try {
        // Validate page
        if (page < 1) {
            return res.status(400).json({ error: 'Page  must be positive integer.' });
        }

        // Fetch items with pagination
        const items = await Item.find()
            .skip((page - 1) * 18)  // Skip items for previous pages
            .limit(18);            // Limit the number of items per page

        // Get the total number of items for pagination information
        const totalItems = await Item.countDocuments();

        res.json({
            totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / 18),
            items
        });
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'An error occurred while fetching items.' });
    }
};

// Get items by category with pagination
export const getItemsByCategory = async (req, res) => {
    const { type } = req.params;
    // Extract page from query parameters, with default values
    const page = parseInt(req.query.page, 10) || 1;

    try {
        // Validate page
        if (page < 1) {
            return res.status(400).json({ error: 'Page must be positive integer.' });
        }

        // Fetch items by category with pagination
        const items = await Item.find({ "sub-type": { $regex: `^${type}$`, $options: 'i' } })
            .skip((page - 1) * 18) // Skip items for previous pages
            .limit(18);           // Limit the number of items per page

        // Get the total number of items for pagination information
        const totalItems = await Item.countDocuments({ type });

        // Return paginated response
        res.json({
            totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / 18),
            items
        });
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: error.message });
    }
};

//Search an item
export const searchItem = async (req, res) => {
    const { search } = req.query;

    if (!search) {
        return res.status(400).json({ error: 'Search parameter is required' });
    }

    try {
        const result = await Item.find({ name: new RegExp(search, 'i') });

        if (result.length === 0) {
            return res.status(404).json({ message: 'No items found' });
        }

        res.status(200).json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
