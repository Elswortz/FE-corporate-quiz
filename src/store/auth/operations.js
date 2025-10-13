import api from '../../api/api.js';
import * as authAPI from '../../api/authApi.js';
import { getUserProfile } from '../../api/usersApi.js';
import { setAuthTokens, logOut } from './slice.js';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const logIn = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await authAPI.login(credentials);
    const { access_token, refresh_token } = response.data;
    api.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    const profile = await getUserProfile();
    return { access_token, refresh_token, user: profile.data };
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

export const fetchUserProfile = createAsyncThunk('users/fetchUserProfile', async (_, thunkAPI) => {
  try {
    const res = await getUserProfile();
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Failed to fetch profile');
  }
});

export const googleLogIn = createAsyncThunk('auth/googleLogin', async (_, thunkAPI) => {
  try {
    const response = await authAPI.googleLogin();
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login with Google failed');
  }
});

export const azureLogIn = createAsyncThunk('auth/azureLogin', async (_, thunkAPI) => {
  try {
    const response = await authAPI.azureLogin();
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login with Azure failed');
  }
});

export const refreshToken = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const currentRefreshToken = state.auth.refreshToken;

    if (!currentRefreshToken) {
      thunkAPI.dispatch(logOut());
      return thunkAPI.rejectWithValue('No refresh token available');
    }

    const response = await authAPI.refresh(currentRefreshToken);
    const { access_token, refresh_token } = response.data;
    thunkAPI.dispatch(setAuthTokens({ accessToken: access_token, refreshToken: refresh_token }));
    return response.data;
  } catch (err) {
    thunkAPI.dispatch(logOut());
    return thunkAPI.rejectWithValue('Session expired. Please login again.');
  }
});
