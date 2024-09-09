import { createSlice } from '@reduxjs/toolkit';

export const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    bookings: [],
    currentBooking: null, // Stores the current booking details (including room type)
  },
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push(action.payload);  // Push the booking data to bookings array
      state.currentBooking = action.payload; // Set the current booking to the one just added
    },
    removeBooking: (state, action) => {
      state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;  // Clear current booking after payment or cancellation
    },
  },
});

export const { addBooking, removeBooking, clearCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
