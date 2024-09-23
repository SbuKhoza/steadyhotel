// PaymentPage.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { processPayment, resetPaymentState } from '../../redux/slices/paymentSlice';

const stripePromise = loadStripe('your-publishable-key'); // Replace with your Stripe public key for testing

function PaymentForm() {
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const paymentStatus = useSelector((state) => state.payment.paymentStatus);
  const selectedAccommodation = useSelector((state) => state.booking.currentBooking);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    // Create Payment Method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
      setIsProcessing(false);
      return;
    }

    // Send payment method to the server
    const paymentDetails = { paymentMethodId: paymentMethod.id, accommodation: selectedAccommodation };
    dispatch(processPayment(paymentDetails));

    setIsProcessing(false);
  };

  const handleReset = () => {
    dispatch(resetPaymentState());
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || isProcessing || paymentStatus === 'loading'}>
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
      {paymentStatus === 'succeeded' && <p>Payment Successful!</p>}
      {paymentStatus === 'failed' && <p>Payment Failed. Please try again.</p>}
      {paymentStatus !== 'idle' && <button onClick={handleReset}>Reset</button>}
    </form>
  );
}

export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}
