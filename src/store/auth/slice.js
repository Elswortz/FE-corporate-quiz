import { createSlice } from '@reduxjs/toolkit';
import { getUserProfile, logIn, refresh, googleLogIn, azureLogIn } from './operations';
import initialState from './initialState';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut(state) {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isLoggedIn = null;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(logIn.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.isLoggedIn = true;
      })
      .addCase(googleLogIn.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.isLoggedIn = true;
      })
      .addCase(azureLogIn.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.isLoggedIn = true;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.isLoggedIn = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      }),
});

export const { logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
