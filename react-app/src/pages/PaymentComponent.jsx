import { useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentComponent = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/orders/${orderId}`)
            .then(response => {
                setOrder(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching order:", error);
                setLoading(false);
            });
    }, [orderId]);

    const handlePaymentSuccess = async (details, data) => {
        try {
            await axios.put(`http://localhost:8080/api/orders/${orderId}/status`, null, { 
                params: { status: "PAID" } 
            });

            alert("✅ Payment Successful! Thank you for your order.");
            navigate("/orders"); // Redirect to Orders page
        } catch (error) {
            console.error("Payment update failed:", error);
            alert("❌ Payment update failed!");
        }
    };

    const handleCancelPayment = async () => {
        try {
            await axios.put(`http://localhost:8080/api/orders/${orderId}/cancel`);
            alert("⚠ Payment cancelled.");
            navigate("/");
        } catch (error) {
            console.error("Payment cancellation failed:", error);
            alert("❌ Failed to cancel payment.");
        }
    };

    if (loading) return <div className="text-center text-gray-600">⏳ Loading order details...</div>;
    if (!order) return <div className="text-center text-red-500">❌ Order not found!</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-6 shadow-lg rounded-lg max-w-lg w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">💳 Pay for Order #{orderId}</h2>
                <p className="text-gray-700 text-lg font-semibold">Total Amount: <span className="text-black">₹{order.totalPrice}</span></p>

                {/* PayPal Button */}
                <div className="mt-6">
                    <PayPalButtons 
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [{
                                    amount: { currency_code: "USD", value: order.totalPrice }
                                }]
                            });
                        }}
                        onApprove={(data, actions) => {
                            return actions.order.capture().then(details => handlePaymentSuccess(details, data));
                        }}
                        onError={(err) => console.error("PayPal Checkout Error:", err)}
                    />
                </div>

                {/* Cancel Payment Button */}
                <button 
                    onClick={handleCancelPayment} 
                    className="mt-4 w-full p-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
                >
                    ❌ Cancel Payment
                </button>
            </div>
        </div>
    );
};

export default PaymentComponent;
