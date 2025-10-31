import { api } from '../../../api/api.js';
import * as authAPI from '../api/authApi.js';
import * as profileAPI from '../api/profileApi.js';
import { setAuthTokens, logOut } from './authSlice.js';
import { jwtDecode } from 'jwt-decode';
import { showNotification } from '../../notifications/store/notificationsSlice.js';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const logIn = createAsyncThunk('auth/login', async (credentials, { dispatch, rejectWithValue }) => {
  try {
    const response = await authAPI.login(credentials);
    dispatch(showNotification({ message: 'Login successful', severity: 'success' }));
    const { access_token, refresh_token } = response.data;

    api.defaults.headers.common.Authorization = `Bearer ${access_token}`;

    const profile = await authAPI.getUserProfile();
    return { access_token, refresh_token, user: profile.data };
  } catch (err) {
    dispatch(showNotification({ message: 'Login failed', severity: 'error' }));
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async (_, thunkAPI) => {
  try {
    const res = await authAPI.getUserProfile();
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
    return thunkAPI.rejectWithValue('Session expired. Please login again.');
  }
});

export const updateUser = createAsyncThunk('auth/updateUser', async (data, { dispatch, rejectWithValue }) => {
  try {
    const res = await profileAPI.updateUser(data);
    dispatch(showNotification({ message: 'User updated successfully', severity: 'success' }));
    return res.data;
  } catch (err) {
    dispatch(showNotification({ message: 'Failed to update user', severity: 'error' }));
    return rejectWithValue(err.response?.data || 'Failed to update user');
  }
});

export const removeUser = createAsyncThunk('auth/removeUser', async (_, { dispatch, rejectWithValue }) => {
  try {
    await profileAPI.deleteUser();
    dispatch(showNotification({ message: 'User deleted successfully', severity: 'success' }));
    return true;
  } catch (err) {
    dispatch(showNotification({ message: 'Failed to delete user', severity: 'error' }));
    return rejectWithValue(err.response?.data || 'Failed to delete user');
  }
});

export const updateUserAvatar = createAsyncThunk(
  'auth/updateUserAvatar',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const res = await profileAPI.updateAvatar(formData);
      dispatch(showNotification({ message: 'User avatar updated successfully', severity: 'success' }));
      return res.data;
    } catch (err) {
      dispatch(showNotification({ message: 'Failed to update avatar', severity: 'error' }));
      return rejectWithValue(err.response?.data || 'Failed to update avatar');
    }
  }
);
