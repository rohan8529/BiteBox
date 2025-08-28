import React from 'react'

const OrderHistory = ({orders}) => {
    return (
        <ul className="space-y-4">
            {orders.map((order) => (
                <li key={order._id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 animate-fade-in">
                    <h2 className="xs:text-sm sm:text-lg font-semibold text-gray-800">Order ID: {order._id}</h2>
                    <p className="text-gray-600 xs:text-xs md:text-sm">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                    <p className="text-gray-600 xs:text-xs md:text-sm">Total Amount: ₹{order.totalAmount.toFixed(2)}</p>
                    <p className="text-gray-600 xs:text-xs md:text-sm" >Status: {order.isDelivered ? "Delivered" : "Processing"}</p>
                    <h3 className="text-lg font-medium text-gray-700 mt-4">Items:</h3>
                    <ul className="space-y-2 mt-2">
                        {order.items.map((item) => (
                            <li key={item.item._id} className="border border-gray-300 rounded-md p-2 bg-gray-100 flex items-start">
                                <img
                                    src={item.item.img}
                                    alt={item.item.name}
                                    className="w-16 h-16 object-cover rounded-md mr-4"
                                />
                                <div>
                                    <p className="xs:text-sm sm:text-lg font-semibold text-gray-800">{item.item.name}</p>
                                    <p className="text-gray-600 xs:text-xs md:text-sm">Quantity: {item.quantity}</p>
                                    <p className="text-gray-600 xs:text-xs md:text-sm">Price: ₹{item.item.price.toFixed(2)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <hr className="my-4 border-gray-300" />
                </li>
            ))}
        </ul>
    )
}

export default OrderHistory