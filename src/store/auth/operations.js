import * as authAPI from '../../api/authApi.js';
import { setAuthTokens, logOut } from './slice.js';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const logIn = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await authAPI.login(credentials);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
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

    const response = await authAPI.refresh({ refresh_token: currentRefreshToken });
    const { access_token, refresh_token } = response.data;
    thunkAPI.dispatch(setAuthTokens({ accessToken: access_token, refreshToken: refresh_token }));
    return response.data;
  } catch (err) {
    thunkAPI.dispatch(logOut());
    return thunkAPI.rejectWithValue('Session expired. Please login again.');
  }
});
