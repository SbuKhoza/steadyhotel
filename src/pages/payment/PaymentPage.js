import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, TextField, Button, Grid, Typography, CircularProgress, IconButton } from '@mui/material';
import { processPayment, resetPaymentState } from '../../redux/slices/paymentSlice';
import visaIcon from '../../icons/visa.svg'; 
import mastercardIcon from '../../icons/mastercard.svg'; 
import amexIcon from '../../icons/amex.svg'; 

const stripePromise = loadStripe('your-publishable-key'); // Replace with your Stripe public key for testing

function PaymentForm() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
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

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name,
        address: {
          city,
          postal_code: zip,
        },
      },
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
    setName('');
    setAddress('');
    setCity('');
    setZip('');
  };

  return (
    <Box 
      sx={{ 
        maxWidth: 500, 
        margin: 'auto', 
        padding: 3, 
        boxShadow: 3, 
        borderRadius: 2, 
        backgroundColor: '#fff',
      
      }}
    >
      <Typography variant="h5" component="h3" gutterBottom>
        Fast & Easy Payments with Stripe
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Cardholder Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Billing Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="City"
              variant="outlined"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Zip Code"
              variant="outlined"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              required
            />
          </Grid>
          
          {/* Card icons section */}
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <IconButton>
              <img src={visaIcon} alt="Visa" width="40" />
            </IconButton>
            <IconButton>
              <img src={mastercardIcon} alt="MasterCard" width="40" />
            </IconButton>
            <IconButton>
              <img src={amexIcon} alt="American Express" width="40" />
            </IconButton>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: 2,
                padding: 2,
                marginBottom: 2,
              }}
            >
              <CardElement />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={!stripe || isProcessing || paymentStatus === 'loading'}
              startIcon={isProcessing ? <CircularProgress size={20} /> : null}
            >
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </Button>
          </Grid>
        </Grid>
      </form>

      {paymentStatus === 'succeeded' && (
        <Typography color="success.main" mt={2}>
          Payment Successful!
        </Typography>
      )}
      {paymentStatus === 'failed' && (
        <Typography color="error.main" mt={2}>
          Payment Failed. Please try again.
        </Typography>
      )}
      {paymentStatus !== 'idle' && (
        <Button onClick={handleReset} sx={{ mt: 2 }} fullWidth variant="outlined">
          Reset
        </Button>
      )}
    </Box>
  );
}

export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}