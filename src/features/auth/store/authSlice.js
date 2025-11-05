import { createSlice } from '@reduxjs/toolkit';
import { logIn, fetchUserProfile, checkAuth, updateUser, removeUser, updateUserAvatar } from './authThunks';
import authState from './authState';

const resetAuthState = state => {
  state.user.data = null;
  state.user.isLoading = false;
  state.user.error = null;
  state.user.operations.updateUser.isLoading = false;
  state.user.operations.updateUser.error = null;
  state.user.operations.removeUser.isLoading = false;
  state.user.operations.removeUser.error = null;
  state.user.operations.updateUserAvatar.isLoading = false;
  state.user.operations.updateUserAvatar.error = null;
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
      .addCase(checkAuth.rejected, resetAuthState)
      .addCase(fetchUserProfile.pending, (state, action) => {
        state.user.isLoading = true;
        state.user.error = false;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user.data = action.payload;
        state.user.isLoading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.user.error = action.payload;
        state.user.isLoading = false;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.user.operations.updateUser.isLoading = true;
        state.user.operations.updateUser.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user.data = action.payload;
        state.user.operations.updateUser.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.user.operations.updateUser.error = action.payload;
        state.user.operations.updateUser.isLoading = false;
      })
      .addCase(removeUser.pending, (state, action) => {
        state.user.operations.removeUser.isLoading = true;
        state.user.operations.removeUser.error = null;
      })
      .addCase(removeUser.fulfilled, resetAuthState)
      .addCase(removeUser.rejected, (state, action) => {
        state.user.operations.removeUser.isLoading = false;
        state.user.operations.removeUser.error = action.payload;
      })
      .addCase(updateUserAvatar.pending, (state, action) => {
        state.user.operations.updateUserAvatar.isLoading = true;
        state.user.operations.updateUserAvatar.error = null;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.user.data = action.payload;
        state.user.operations.updateUserAvatar.isLoading = false;
      })
      .addCase(updateUserAvatar.rejected, (state, action) => {
        state.user.operations.updateUserAvatar.isLoading = false;
        state.user.operations.updateUserAvatar.error = action.payload;
      }),
});

export const { logOut, setAuthTokens } = authSlice.actions;
export const authReducer = authSlice.reducer;
