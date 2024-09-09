import { createSlice } from '@reduxjs/toolkit';

export const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    bookings: [],
    currentBooking: null, // Store the current booking details
  },
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push(action.payload);  // Add new booking to the bookings array
      state.currentBooking = action.payload; // Set the current booking to the newly added one
    },
    removeBooking: (state, action) => {
      state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;  // Clear the current booking after payment or cancellation
    },
  },
});

export const { addBooking, removeBooking, clearCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
