// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/slices/userSlice';
import bookingReducer from '../redux/slices/bookingSlice';
import reviewReducer from '../redux/slices/reviewSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    booking: bookingReducer,
    reviews: reviewReducer,
  },
});

export default store;