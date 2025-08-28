import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "./authContext";
import { useCart } from "./CartContext";
import { Flip, toast } from "react-toastify";

const orderContext = createContext();

export const useOrder = () => useContext(orderContext);

export const OrderProvider = ({ children }) => {
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setCart } = useCart();
    const { user } = useAuth();


    // Function to handle checkout
    const checkout = async () => {
        if (!user) {
            console.error('User not authenticated');
            return;
        }
        setIsCheckingOut(true);
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/orders/checkout`,
                { userId: user.id },
                { withCredentials: true }
            );
            toast.success(`${res.data.message}`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
            });
            setCart([]);

        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(`${res.data.message}`, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Flip,
                });
            } else {
                console.error('Failed to checkout:', error.message);
                alert("Failed to place order.");
            }
        } finally {
            setIsCheckingOut(false);
        }
    };

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/orders/view-orders`,
                { params: { userId: user.id }, withCredentials: true }
            );
            setOrders(res.data.orders);
        } catch (error) {
            console.log(error)
            console.error('Failed to fetch orders:', error.message);
            setError('Failed to fetch orders');
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <orderContext.Provider value={{ checkout, fetchOrders, orders, setOrders, isCheckingOut, isLoading, error }}>
            {children}
        </orderContext.Provider>
    );
};
