import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/slices/userSlice';
import bookingReducer from './redux/slices/bookice';
ngSli
export const store = configureStore({
  reducer: {
    user: userReducer,
    booking: bookingReducer,
  },
});

export default store;
