import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { uploadProfilePicture } from '../../services/firebase';

// Thunk action for user signup
export const signupUser = createAsyncThunk(
  'user/signupUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email, // Add other relevant fields
      };
    } catch (error) {
      return rejectWithValue('Signup failed');
    }
  }
);

// Thunk action for user login
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email, // Add other relevant fields
      };
    } catch (error) {
      return rejectWithValue('Login failed');
    }
  }
);

// Thunk action for user logout
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue('Logout failed');
    }
  }
);

// Thunk action for updating user profile
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async ({ displayName, address, profilePic, imageFile }, { getState, rejectWithValue }) => {
    const userId = getState().user.userInfo?.uid; // Assuming userId is available
    try {
      let profilePictureUrl = profilePic;

      // If an image file is provided, upload it
      if (imageFile) {
        profilePictureUrl = await uploadProfilePicture(imageFile, userId);
      }

      const updatedUser = {
        displayName,
        address,
        profilePic: profilePictureUrl,
      };

      // Example: Call to update profile in your backend/Firebase
      // await updateUserInBackend(userId, updatedUser);

      return updatedUser; // Assuming backend returns updated profile
    } catch (error) {
      return rejectWithValue('Profile update failed');
    }
  }
);

// Initial state for the user slice
const initialState = {
  isLoggedIn: false,
  userInfo: null,
  loading: false,
  error: null,
};

// User slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Optional reducers for synchronous actions
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.userInfo = null;
        state.loading = false;
      })

      // Update profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userInfo = { ...state.userInfo, ...action.payload };
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;