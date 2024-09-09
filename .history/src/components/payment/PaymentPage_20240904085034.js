import React, { useState } from 'react';
import './PaymentPage.css';

function PaymentPage() {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement payment gateway logic (Stripe/Yoco)
    alert('Payment Successful!');
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
        <input type="submit" value="Pay Now" />
      </form>
    </div>
  );
}

export default PaymentPage;