
import { createSlice } from '@reduxjs/toolkit';

export const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        bookings: [],
        // currentBooking: null,
    },
    reducers: {
        addBooking: (state, action) => {
            state.bookings.push(action.payload);
        },
        setCurrentBooking: (state, action) => {
            state.currentBooking = action.payload;
        },
    },
}