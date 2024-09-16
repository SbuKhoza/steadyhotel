import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../services/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

// Thunk action to handle adding booking with Firestore
export const addBooking = createAsyncThunk(
  "booking/addBooking",
  async (booking, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, "bookings"), booking);
      return { ...booking, id: docRef.id };
    } catch (e) {
      console.error("Failed to add booking", e);
      return rejectWithValue(e.message);
    }
  }
);

// Thunk action to fetch all bookings from Firestore
export const fetchBookings = createAsyncThunk(
  "booking/fetchBookings",
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, "bookings"));
      const bookings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return bookings;
    } catch (e) {
      console.error("Failed to fetch bookings", e);
      return rejectWithValue(e.message);
    }
  }
);

// Thunk action to handle removing booking from Firestore
export const removeBooking = createAsyncThunk(
  "booking/removeBooking",
  async (bookingId, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "bookings", bookingId));
      return bookingId;
    } catch (e) {
      console.error("Failed to remove booking", e);
      return rejectWithValue(e.message);
    }
  }
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    currentBooking: null,
    error: null,
  },
  reducers: {
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
        state.currentBooking = action.payload;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
      })
      .addCase(removeBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter((booking) => booking.id !== action.payload);
      });
  },
});

export const { clearCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
