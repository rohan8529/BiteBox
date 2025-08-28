import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const ItemCard = ({ item }) => {
    const { addToCart } = useCart();
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    const add = () => {
        if (!isLoggedIn) {
            const userWantsToLogin = window.confirm("Please log in to add items to your cart.");
            if (userWantsToLogin) {
                navigate("/login");
            }
            return;
        }
        addToCart(item._id);
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); 
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className={`bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform ${isVisible ? 'animate-fade-in' : ''} hover:scale-105 hover:shadow-lg flex flex-col h-full`}
        >
            <img
                className="w-full sm:h-48 xs:h-28 object-cover"
                src={item.img}
                alt={item.name}
            />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-gray-800 mb-2 h-1/3 xs:text-sm md:text-base">{item.name}</h3>
                <div className="flex xs:flex-col md:flex-row justify-between text-gray-700 mb-4">
                    <span className="font-bold text-red-500 xs:text-sm md:text-base">₹{item.price}</span>
                    <span className="flex items-center text-xs text-gray-500">
                        {item.rating}⭐ ({item.reviews} reviews)
                    </span>
                </div>
                <button
                    className="w-full bg-gray-500 text-white py-2 xs:text-sm md:text-base rounded-md hover:bg-corg transition-colors"
                    onClick={add}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ItemCard;

