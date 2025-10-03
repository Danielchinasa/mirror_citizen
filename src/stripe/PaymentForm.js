import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Create PaymentIntent when component mounts
    createPaymentIntent();
  }, []);

  const createPaymentIntent = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:4242/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 2000, // $20.00
            currency: "usd",
          }),
        }
      );

      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (error) {
      setMessage("Error creating payment intent");
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error) {
      setMessage(error.message);
    }

    setIsProcessing(false);
  };

  return (
    <div className="payment-form">
      <form onSubmit={handleSubmit}>
        <PaymentElement />

        <button
          disabled={!stripe || isProcessing || isLoading}
          className="pay-button"
        >
          {isProcessing ? "Processing..." : `Pay $20.00`}
        </button>

        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
};

export default PaymentForm;
