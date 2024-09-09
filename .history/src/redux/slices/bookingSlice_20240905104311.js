import { createSlice } from '@reduxjs/toolkit';

export const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        bookings: [],
        currentBooking: null,
    },
    reducers: {
        addBooking: (state, action) => {
            state.bookings.push(action.payload);
        },
        removeBooking: (state, action) => {
            state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
        },
        increment: (state) => {
            state.currentBooking += 1;
        },
        decrement: (state) => {
            state.currentBooking -= 1;
        }
    },
});

export const { addBooking, removeBooking, increment, decrement } = bookingSlice.actions;
export default bookingSlice.reducer;
