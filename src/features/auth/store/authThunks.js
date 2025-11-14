import * as authAPI from '../api/authApi.js';
import { jwtDecode } from 'jwt-decode';
import { fetchUserProfile } from '../../users/store/usersThunks.js';
import { logOut, setTokens } from './authSlice.js';
import { tokenService } from '../../../api/tokenService.js';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const logIn = createAsyncThunk('auth/login', async (credentials, { dispatch, rejectWithValue }) => {
  try {
    const response = await authAPI.login(credentials);
    const { access_token: accessToken, refresh_token: refreshToken } = response.data;

    dispatch(setTokens({ accessToken, refreshToken }));
    tokenService.setTokens({ accessToken, refreshToken });

    await dispatch(fetchUserProfile());
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { dispatch, rejectWithValue, getState }) => {
  try {
    const state = getState();
    const { accessToken: currentAccessToken, refreshToken: currentRefreshToken } = state.auth;

    if (!currentRefreshToken) {
      dispatch(logOut());
      return rejectWithValue('No refresh token available');
    }

    if (currentAccessToken) {
      const { exp } = jwtDecode(currentAccessToken);
      const now = Date.now() / 1000;
      if (exp > now + 10) {
        await dispatch(fetchUserProfile());
        return;
      }
    }

    const response = await authAPI.refresh(currentRefreshToken);
    const { access_token: accessToken, refresh_token: refreshToken } = response.data;

    dispatch(setTokens({ accessToken, refreshToken }));
    tokenService.setTokens({ accessToken, refreshToken });

    await dispatch(fetchUserProfile());
  } catch (err) {
    dispatch(logOut());
    return rejectWithValue(err.response?.data?.message || 'Session expired. Please login again.');
  }
});
