import { createSlice } from "@reduxjs/toolkit";
import { addBookingToFirestore, removeBookingFromFirestore } from "../../services/firestoreService"; // Firestore service

export const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    currentBooking: null,
  },
  reducers: {
    setBooking: (state, action) => {
      state.bookings.push(action.payload);
      state.currentBooking = action.payload;
    },
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
    removeBookingLocally: (state, action) => {
      state.bookings = state.bookings.filter(
        (booking) => booking.id !== action.payload
      );
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
  },
});

export const {
  setBooking,
  removeBookingLocally,
  clearCurrentBooking,
  setBookings,
} = bookingSlice.actions;

// Thunk action to handle adding booking to Firestore
export const addBooking = (booking) => async (dispatch) => {
  try {
    const bookingId = await addBookingToFirestore(booking);
    dispatch(setBooking({ ...booking, id: bookingId }));
  } catch (e) {
    console.error("Failed to add booking", e);
  }
};

// Thunk action to handle removing booking from Firestore
export const removeBooking = (bookingId) => async (dispatch) => {
  try {
    await removeBookingFromFirestore(bookingId);
    dispatch(removeBookingLocally(bookingId));
  } catch (e) {
    console.error("Failed to remove booking", e);
  }
};

export default bookingSlice.reducer;