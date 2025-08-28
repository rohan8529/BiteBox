import React, { useEffect } from 'react';
import { useOrder } from '../context/orderContext';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import OrderHistory from '../components/OrderHistory';

const Order = () => {
    const { orders, fetchOrders, setOrders, isLoading, error } = useOrder();
    const { user, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn && user) {
            fetchOrders(user.id);
        } else {
            navigate('/')
            setOrders([]);
        }
    }, [user]);


    if (isLoading) {
        return <div>Loading orders...</div>;
    }

    if (error) {
        return <div>Error fetching orders: {error}</div>;
    }

    return (
        <div className="mx-auto xs:px-2 md:px-4 py-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Your Orders</h1>
            <div className="bg-white shadow-md rounded-lg xs:p-2 md:p-6">
                {orders.length === 0 ? (
                    <p className="text-gray-600">No orders found.</p>
                ) : (
                    <OrderHistory orders={orders}/>
                )}
            </div>
        </div>
    );
};

export default Order;
