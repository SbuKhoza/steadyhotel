// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { processPayment, resetPaymentState } from '../../redux/slices/paymentSlice';


export const processPayment = createAsyncThunk(
  'payment/processPayment',
  async (paymentDetails, { rejectWithValue }) => {
    try {
      // Simulate payment processing (replace with actual payment gateway logic)
      const response = await fakePaymentProcessing(paymentDetails);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    paymentStatus: 'idle', // idle | loading | succeeded | failed
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

// Simulate a fake payment processing function
async function fakePaymentProcessing(details) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, ...details });
    }, 1000);
  });
}
