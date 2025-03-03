import React, { useEffect, useState } from "react";
import { getCartByUserId, removeFromCart, clearCart } from "../services/cartService";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartComponent = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const cartData = await getCartByUserId();
            setCartItems(cartData?.items || []);
            calculateTotalPrice(cartData?.items || []);
        } catch (error) {
            console.error("Error fetching cart items:", error);
            setError("Failed to load cart items.");
        }
    };

    const calculateTotalPrice = (items) => {
        const total = items.reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(total);
    };

    const handleRemoveFromCart = async (menuItemId) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user?.userId) {
                alert("User ID not found.");
                return;
            }
            await removeFromCart(user.userId, menuItemId);
            fetchCartItems();
        } catch (error) {
            console.error("Failed to remove item from cart:", error);
            alert("Error removing item from cart.");
        }
    };

    const handleClearCart = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user?.userId) {
                alert("User ID not found.");
                return;
            }
            await clearCart(user.userId);
            setCartItems([]);
            setTotalPrice(0);
        } catch (error) {
            console.error("Failed to clear cart:", error);
            alert("Error clearing the cart.");
        }
    };

    const handleToCheckout = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user?.userId) {
                alert("User ID not found.");
                return;
            }
            const response = await axios.post(`http://localhost:8080/api/orders/${user.userId}`, cartItems.map(item => item.id));
            const orderId = response.data.id;
            navigate(`/payment/${orderId}`);
        } catch (error) {
            console.error("Failed to create order:", error);
            alert("Error creating order.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🛍️ Your Cart</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {cartItems.length > 0 ? (
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {cartItems.map(item => (
                                <div key={item.id} className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition">
                                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h4>
                                    <p className="text-green-600 font-bold mb-2 text-lg">₹{item.price}</p>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium w-full hover:bg-red-700 transition transform hover:scale-105"
                                        onClick={() => handleRemoveFromCart(item.id)}
                                    >
                                        🗑 Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-5 bg-gray-100 rounded-lg shadow-md text-center">
                            <h3 className="text-2xl font-semibold text-gray-900">Total: ₹{totalPrice}</h3>
                            <button
                                className="bg-gray-700 text-white px-6 py-3 rounded-lg font-medium mt-4 mr-4 hover:bg-gray-900 transition transform hover:scale-105"
                                onClick={handleClearCart}
                            >
                                🧹 Clear Cart
                            </button>
                            <button
                                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium mt-4 hover:bg-blue-700 transition transform hover:scale-105"
                                onClick={handleToCheckout}
                            >
                                💳 Checkout
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500 text-center text-lg">🛒 Your cart is empty.</p>
                )}
            </div>
        </div>
    );
};

export default CartComponent;
