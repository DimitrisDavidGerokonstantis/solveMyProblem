import React from "react";
import ReactDOM from "react-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
class PaypalPayment extends React.Component {
  constructor(props) {
    super(props);
  }
  createOrder(data) {
    // Order is created on the server and the order id is returned
    return fetch("http://localhost:8080/pay/paypal/create-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        cart: [
          {
            id: "1",
            name: "Credits for Solvio",
            quantity: `${this.props.credits}`,
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  }
  onApprove(data) {
    // Order is captured on the server  /paypal/orders/:orderID/capture
    return fetch(
      `http://localhost:8080/pay/paypal/orders/${data.orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: `${this.props.credits}`,
        }),
      }
    )
      .then((response) => response.json())
      .then(() => window.location.reload());
  }
  render() {
    return (
      <PayPalButtons
        createOrder={(data, actions) => this.createOrder(data)}
        onApprove={(data, actions) => this.onApprove(data)}
      />
    );
  }
}

export default PaypalPayment;
