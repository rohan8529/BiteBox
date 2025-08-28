import React, { useCallback, useEffect, useState } from "react";
import { formatCurrency } from "../services/formatCurrency";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/orderContext";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [total, setTotal] = useState(0);
  const { cart, updateCartQuantity, removeFromCart } = useCart();
  const { checkout, isLoading, isCheckingOut } = useOrder();
  const { user } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user])

  useEffect(() => {
    // Calculate the total amount based on cart items
    const calculateTotal = (items) => {
      const totalAmount = items.reduce(
        (acc, { item, quantity }) => acc + (item.price || 0) * quantity,
        0
      );
      setTotal(totalAmount);
    };
    calculateTotal(cart);
  }, [cart]);

  const handleQuantityChange = (itemId, newQuantity, stock) => {
    if (newQuantity > stock) {
      if (stock === 0) {
        return alert(`Currently not available`);
      }
      alert(`Only ${stock} in stock`);
    } else {
      updateCartQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleCheckout = useCallback(() => {
    if (!isCheckingOut && !isLoading) {
      checkout();
    }
  }, [isCheckingOut, isLoading, checkout]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="xs:py-8 sm:py-4 mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-base sm:text-lg md:text-xl">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          <ul className="border-2 border-gray-300">
            {cart.map(({ _id, item, quantity }) => (
              <li
                key={_id}
                className="py-4 flex flex-row items-start gap-4 relative m-2 border-b-2 border-gray-300 animate-fade-in"
              >
                <img
                  src={item.img}
                  alt={item.name || "Item Image"}
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-cover"
                />
                <div className="flex-1  flex flex-col">
                  <h2 className="xs:text-base sm:text-lg md:text-xl font-semibold">
                    {item.name || "Item Name"}
                  </h2>
                  <span className="text-green-600 xs:text-xs md:text-base">{item.stock} in stock</span>

                  <p className="text-gray-600 mt-1 text-sm sm:text-base">
                    {quantity} x {formatCurrency(item.price || 0)}
                  </p>

                  <div className="flex items-center mt-2 gap-2 xs:text-sm md:text-base">
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, quantity + 1, item.stock)
                      }
                      className="bg-gray-200 text-gray-600 px-1 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item._id,
                          parseInt(e.target.value, 10),
                          item.stock
                        )
                      }
                      className="w-8 text-center border border-gray-300 rounded"
                      readOnly
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, quantity - 1, item.stock)
                      }
                      className="bg-gray-200 text-gray-600 px-1 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="text-red-500 hover:scale-110 mt-2 sm:mt-0 absolute top-1 right-1 "
                >
                  ❌
                </button>

                <p className="text-base sm:text-lg md:text-xl font-semibold mt-2 sm:mt-0 self-end">
                  {formatCurrency((item.price || 0) * quantity)}
                </p>

              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-6 p-4 bg-gray-100 border border-gray-300 rounded">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Total</h2>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold">
              {formatCurrency(total)}
            </p>
          </div>
          <button
            onClick={handleCheckout}
            disabled={isCheckingOut || isLoading} // Disable button during checkout or loading
            className={`mt-6 py-2 px-4 rounded focus:outline-none ${isCheckingOut ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
          >
            {isCheckingOut ? "Processing..." : "Checkout"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

