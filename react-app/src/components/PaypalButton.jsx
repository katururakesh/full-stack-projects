import { useEffect, useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PayPalButton = ({ orderId }) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const [amount, setAmount] = useState(0);
  
  useEffect(() => {
    fetch(`http://localhost:8080/api/orders/${orderId}`)
      .then(response => response.json())
      .then(data => setAmount(data.totalPrice))
      .catch(error => console.error("Error fetching order:", error));
  }, [orderId]);

  const createOrder = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/payments/create/${orderId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      return data.orderID;
    } catch (error) {
      console.error("Error creating PayPal order:", error);
    }
  };

  const onApprove = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/payments/success?orderID=${data.orderID}&PayerID=${data.payerID}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const result = await response.text();
      alert(result);
    } catch (error) {
      console.error("Error executing PayPal payment:", error);
    }
  };

  // ✅ Handle payment cancellation
  const onCancel = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/payments/cancel/${orderId}`, {
        method: "POST",
        credentials: "include",
      });

      const result = await response.text();
      alert(result);
    } catch (error) {
      console.error("Error canceling PayPal payment:", error);
    }
  };

  return (
    <div>
      {isPending ? <p>Loading PayPal...</p> : null}
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={createOrder}
        onApprove={onApprove}
        onCancel={onCancel}
      />
    </div>
  );
};

export default PayPalButton;
