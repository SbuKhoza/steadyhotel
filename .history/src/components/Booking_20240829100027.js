// Booking.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../redux/slices/bookingSlice';

export function Booking() {
    const book = useSelector(state => state.booking.currentBooking);
    const dispatch = useDispatch();

    return (
        <div>
            <h2>Current Booking: {book}</h2>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <button onClick={() => dispatch(increment())}>Increment</button>
        </div>
    );
}

export default Booking;
