import { configureStore } from '@reduxjs/toolkit';

import bookingReducer from './redux/slices/bookingSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    booking: bookingReducer,
  },
});

export default store;
