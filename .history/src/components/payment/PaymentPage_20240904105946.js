import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { processPayment, resetPaymentState } from '../redux/slices/paymentSlice';
import './PaymentPage.css';

function PaymentPage() {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const dispatch = useDispatch();
  const paymentStatus = useSelector((state) => state.payment.paymentStatus);
  const selectedAccommodation = useSelector((state) => state.booking.currentBooking);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fullPaymentDetails = { ...paymentDetails, accommodation: selectedAccommodation };
    dispatch(processPayment(fullPaymentDetails));
  };

  const handleReset = () => {
    dispatch(resetPaymentState());
    setPaymentDetails({
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    });
  };

  return (
    <div className='payment-section'>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Card Number:
          <input type="text" name="cardNumber" value={paymentDetails.cardNumber} onChange={handleChange} required />
        </label>
        <label>
          Expiry Date:
          <input type="text" name="expiryDate" value={paymentDetails.expiryDate} onChange={handleChange} required />
        </label>
        <label>
          CVV:
          <input type="text" name="cvv" value={paymentDetails.cvv} onChange={handleChange} required />
        </label>
        <input type="submit" value="Pay Now" disabled={paymentStatus === 'loading'} />
      </form>
      {paymentStatus === 'succeeded' && <p>Payment Successful!</p>}
      {paymentStatus === 'failed' && <p>Payment Failed. Please try again.</p>}
      {paymentStatus !== 'idle' && <button onClick={handleReset}>Reset</button>}
    </div>
  );
}

export default PaymentPage;