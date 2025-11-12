import { createSlice } from '@reduxjs/toolkit';
import { logIn, checkAuth } from './authThunks';
import authState from './authState';

const resetAuthState = state => {
  state.accessToken = null;
  state.refreshToken = null;
  state.isAuthenticated = false;
  state.isLoading = false;
  state.error = null;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const handleAuthSuccess = (state, action) => {
  const { access_token: accessToken, refresh_token: refreshToken } = action.payload;
  state.accessToken = accessToken;
  state.refreshToken = refreshToken;
  state.isAuthenticated = true;
  state.isLoading = false;

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

const handleAuthPending = (state, action) => {
  state.isLoading = true;
  state.error = null;
};

const handleAuthRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    logOut: resetAuthState,
    setAuthTokens(state, action) {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      if (accessToken) localStorage.setItem('accessToken', accessToken);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
    },
  },
  extraReducers: builder =>
    builder
      .addCase(logIn.pending, handleAuthPending)
      .addCase(logIn.fulfilled, handleAuthSuccess)
      .addCase(logIn.rejected, handleAuthRejected)
      .addCase(checkAuth.pending, handleAuthPending)
      .addCase(checkAuth.fulfilled, (state, action) => {
        const { access_token, refresh_token } = action.payload;
        state.accessToken = access_token;
        state.refreshToken = refresh_token;
        state.isAuthenticated = true;
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('refreshToken', refresh_token);
      })
      .addCase(checkAuth.rejected, resetAuthState),
});

export const { logOut, setAuthTokens } = authSlice.actions;
export const authReducer = authSlice.reducer;
