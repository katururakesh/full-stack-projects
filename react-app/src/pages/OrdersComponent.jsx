import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getOrdersByUserId, deleteOrder } from "../services/orderService";

const OrdersComponent = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersByUserId();
        setOrders(data);
      } catch (err) {
        setError("Failed to fetch orders.");
      }
    };
    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    try {
      await deleteOrder(orderId);
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (err) {
      alert("Failed to delete order.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-6 border">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🛒 My Orders</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {orders.length === 0 && <p className="text-gray-600 text-center">No orders found.</p>}

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className={`p-5 border-l-8 rounded-lg shadow-lg ${
                order.status === "PAID"
                  ? "border-green-500 bg-green-100"
                  : order.status === "CANCELLED"
                  ? "border-red-500 bg-red-100"
                  : "border-yellow-500 bg-yellow-100"
              }`}
            >
              {/* Order Summary */}
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                  <p className="text-gray-700">
                    <span className="font-medium">Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded-md text-sm ${
                        order.status === "PAID"
                          ? "bg-green-600 text-white"
                          : order.status === "CANCELLED"
                          ? "bg-red-600 text-white"
                          : "bg-yellow-600 text-white"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                  <p className="text-gray-700 font-medium">
                    Total Amount: <span className="text-black">₹{order.totalPrice}</span>
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(order.id)}
                  className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md transition hover:bg-red-700 hover:scale-105"
                >
                  🗑 Delete
                </button>
              </div>

              {/* Items List with Navigation */}
              <div className="mt-4">
                <h4 className="text-md font-semibold text-gray-800">Items Ordered:</h4>
                <ul className="mt-2 space-y-2">
                  {order.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between bg-white p-3 border rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 hover:scale-105 transition"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-gray-700">
                          Quantity: {item.quantity} × ₹{item.price}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersComponent;
