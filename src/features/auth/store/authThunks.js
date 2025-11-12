import { api } from '../../../api/api.js';
import * as authAPI from '../api/authApi.js';
import { logOut } from './authSlice.js';
import { jwtDecode } from 'jwt-decode';
import { fetchUserProfile } from '../../users/store/usersThunks.js';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const logIn = createAsyncThunk('auth/login', async (credentials, { dispatch, rejectWithValue }) => {
  try {
    const response = await authAPI.login(credentials);
    const { access_token, refresh_token } = response.data;

    api.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    await dispatch(fetchUserProfile());

    return { access_token, refresh_token };
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const { accessToken, refreshToken } = state.auth;

    if (!refreshToken) {
      thunkAPI.dispatch(logOut());
      return thunkAPI.rejectWithValue('No refresh token available');
    }

    if (accessToken) {
      const { exp } = jwtDecode(accessToken);
      const now = Date.now() / 1000;

      if (exp > now + 10) {
        return thunkAPI.fulfillWithValue({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
      }
    }

    const res = await authAPI.refresh(refreshToken);
    return res.data;
  } catch (err) {
    thunkAPI.dispatch(logOut());
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Session expired. Please login again.');
  }
});
