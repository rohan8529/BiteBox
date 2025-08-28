import React, { useState, useEffect } from 'react';
import axios from 'axios';

const categories = ['veg', 'non-veg', 'sweets', 'beverage', 'burger', 'cake', 'fruits', 'sandwich',];

const Menu = ({ sendData }) => {
    const [selectedCategory, setSelectedCategory] = useState('veg');

    useEffect(() => {
        let isMounted = true;

        const fetchItems = async (category) => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/items/category/${category}`);
                if (isMounted) {
                    sendData(response.data.items); // Send data to parent
                }
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems(selectedCategory);

        return () => {
            isMounted = false;
        };
    }, [selectedCategory, sendData]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="p-4 lg:p-8 mx-auto md:mb-8 xs:mb-4">
            <p className='font-extrabold text-lg'>What are you craving for?</p>
            <div className="flex overflow-x-auto space-x-4 py-8  border-b-2 border-gray-300 animate-fade-in">
                {categories.map(category => (
                    <div
                        key={category}
                        className="flex-shrink-0 cursor-pointer text-center px-8"
                        onClick={() => handleCategoryClick(category)}
                    >
                        <img
                            src={`menu/${category}-image.png`}
                            alt={category}
                            className="w-24 h-24 object-cover rounded-full"
                        />
                        <p className="mt-2 text-sm font-medium text-gray-700">{category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;
