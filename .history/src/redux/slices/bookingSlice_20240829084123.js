
import { createSlice } from '@reduxjs/toolkit';

export const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        bookings: [undefined],
        currentBooking: null,
    },
   reducers: {
    addBooking: (State, action) => {
      state.bookingSlice.push(action.payload);
    },
    removeBooking: (state, action) => {
        state.bookings = state.bookings.filter(booking => booking.id!== action.payload);
    },
   },
});

export const { addBooking, removeBooking } = bookingSlice.actions;
export default bookingSlice.reducer;