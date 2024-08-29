import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    userInfo: {},
  },
  reducers: {
    login: (state, action) => {
        state.isLoggedIn = true;
        state.userInfo = action.payload;
      },
      logout: (state) => {
        state.isLoggedIn = false;
        state.userInfo = {};
      },
    },
  });
  
  export const { login, logout } = userSlice.actions;
  export default userSlice.reducer;
  