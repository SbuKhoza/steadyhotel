import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const processPayment = createAsyncThunk(
  'payment/processPayment',
  async (paymentDetails, { rejectWithValue }) => {
    try {
      const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDetails),
      });

      if (!response.ok) {
        throw new Error('Payment processing failed');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    paymentStatus: 'idle',
    error: null,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.paymentStatus = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processPayment.pending, (state) => {
        state.paymentStatus = 'loading';
      })
      .addCase(processPayment.fulfilled, (state) => {
        state.paymentStatus = 'succeeded';
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.paymentStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
