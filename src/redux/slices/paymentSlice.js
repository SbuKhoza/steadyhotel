import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../services/firebase';  // Adjust this path as per your folder structure
import { doc, setDoc } from 'firebase/firestore';

// Async thunk to process payment and store it in Firebase
export const processPayment = createAsyncThunk(
  'payment/processPayment',
  async (paymentDetails, { getState, rejectWithValue }) => {
    const booking = getState().booking.currentBooking;  // Get current booking from state

    try {
      // Simulate payment processing
      const paymentResponse = await fakePaymentProcessing({ ...paymentDetails, booking });

      // If payment is successful, save payment details to Firestore
      const paymentDocRef = doc(db, 'payments', booking.id);  // Use booking ID as document ID
      await setDoc(paymentDocRef, {
        ...paymentDetails,
        bookingId: booking.id,
        timestamp: new Date(),
        status: 'completed',
      });

      return paymentResponse;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    paymentStatus: 'idle', 
    paymentDetails: null,
    error: null,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.paymentStatus = 'idle';
      state.paymentDetails = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processPayment.pending, (state) => {
        state.paymentStatus = 'loading';
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.paymentStatus = 'succeeded';
        state.paymentDetails = action.payload;
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.paymentStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;

// Mock function to simulate payment processing
async function fakePaymentProcessing(details) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, ...details });
    }, 1000);
  });
}