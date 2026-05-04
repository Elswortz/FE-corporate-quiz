import { createSlice } from '@reduxjs/toolkit';
import { logIn, checkAuth } from './authThunks';
import { tokenService } from '../../../api/tokenService';

const initialState = {
  accessToken: tokenService.getAccessToken(),
  refreshToken: tokenService.getRefreshToken(),
  isAuthenticated: !!tokenService.getAccessToken(),
  isLoading: false,
  error: null,
};

const resetAuth = state => {
  state.accessToken = null;
  state.refreshToken = null;
  state.isAuthenticated = false;
  state.error = null;
  state.isLoading = false;
  tokenService.clearTokens();
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
    },
    logOut: resetAuth,
  },
  extraReducers: builder =>
    builder
      .addCase(logIn.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(checkAuth.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, resetAuth),
});

export const { logOut, setTokens } = authSlice.actions;
export const authReducer = authSlice.reducer;
