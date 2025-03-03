import React from "react";
import PayPalButton from "./PaypalButton";

const Checkout = ({ orderId }) => {
  return (
    <div>
      <h2>Complete Your Payment</h2>
      <PayPalButton orderId={orderId} />
    </div>
  );
};

export default Checkout;
