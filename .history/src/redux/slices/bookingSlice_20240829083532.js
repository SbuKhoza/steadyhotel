
import { createSlice } from '@reduxjs/toolkit';

export const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        bookings: [],
        // currentBooking: null,
    },
   reducers: {
    addBooking: (State, action) => {
      state.bookingSlice.push(action.payload);
    },
    removeB
   }