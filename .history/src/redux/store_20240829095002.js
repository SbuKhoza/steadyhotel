import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/slices/userSlice';
e';

export const store = configureStore({
  reducer: {
    user: userReducer,
    booking: bookingReducer,
  },
});

export default store;
