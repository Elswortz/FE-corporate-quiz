import { createSlice } from '@reduxjs/toolkit';
import { getUserProfile, logIn, refreshToken, googleLogIn, azureLogIn } from './operations';
import initialState from './initialState';

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
  initialState,
  reducers: {
    logOut(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    setAuthTokens(state, action) {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(logIn.pending, handleAuthPending)
      .addCase(logIn.fulfilled, handleAuthSuccess)
      .addCase(logIn.rejected, handleAuthRejected)
      .addCase(googleLogIn.pending, handleAuthPending)
      .addCase(googleLogIn.fulfilled, handleAuthSuccess)
      .addCase(googleLogIn.rejected, handleAuthRejected)
      .addCase(azureLogIn.pending, handleAuthPending)
      .addCase(azureLogIn.fulfilled, handleAuthSuccess)
      .addCase(azureLogIn.rejected, handleAuthRejected)
      .addCase(refreshToken.fulfilled, (state, action) => {
        const { access_token: accessToken, refresh_token: refreshToken } = action.payload;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      })
      .addCase(refreshToken.rejected, state => {
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(getUserProfile.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserProfile.rejected, state => {
        state.isAuthenticated = false;
        state.user = null;
        state.isLoading = false;
      }),
});

export const { logOut, setAuthTokens } = authSlice.actions;
export const authReducer = authSlice.reducer;
