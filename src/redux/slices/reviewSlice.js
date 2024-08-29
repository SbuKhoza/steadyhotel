import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';


export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
  const reviewsCollection = collection(db, 'reviews');
  const reviewSnapshot = await getDocs(reviewsCollection);
  const reviewList = reviewSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return reviewList;
});

export const addReview = createAsyncThunk('reviews/addReview', async (review) => {
  const reviewsCollection = collection(db, 'reviews');
  await addDoc(reviewsCollection, review);
  return review;
});

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      });
  },
});

export default reviewSlice.reducer;