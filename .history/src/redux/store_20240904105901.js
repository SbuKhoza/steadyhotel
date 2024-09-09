// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import bookingReducer from './slices/bookingSlice';
import reviewReducer from './slices/reviewSlice';
import paymentReducer from './slices/paymentSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    booking: bookingReducer,
    reviews: reviewReducer,
    payment: paymentReducer,
  },
});

export default store;
