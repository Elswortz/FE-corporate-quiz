import { api } from '../../api/api.js';
import * as authAPI from '../../api/authApi.js';
import * as usersAPI from '../../api/usersApi.js';
import { setAuthTokens, logOut } from './slice.js';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const logIn = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await authAPI.login(credentials);
    const { access_token, refresh_token } = response.data;
    api.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    const profile = await usersAPI.getUserProfile();
    return { access_token, refresh_token, user: profile.data };
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async (_, thunkAPI) => {
  try {
    const res = await usersAPI.getUserProfile();
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
    const currentRefreshToken = state.auth.refreshToken;

    if (!currentRefreshToken) {
      thunkAPI.dispatch(logOut());
      return thunkAPI.rejectWithValue('No refresh token available');
    }

    const res = await authAPI.refresh(currentRefreshToken);
    const { access_token, refresh_token } = res.data;
    thunkAPI.dispatch(setAuthTokens({ accessToken: access_token, refreshToken: refresh_token }));
    return res.data;
  } catch (err) {
    thunkAPI.dispatch(logOut());
    return thunkAPI.rejectWithValue('Session expired. Please login again.');
  }
});

export const updateUser = createAsyncThunk('auth/updateUser', async (data, thunkAPI) => {
  try {
    const res = await usersAPI.updateUser(data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Failed to update user');
  }
});

export const removeUser = createAsyncThunk('auth/removeUser', async (_, thunkAPI) => {
  try {
    await usersAPI.deleteUser();
    return true;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Failed to delete user');
  }
});

export const updateUserAvatar = createAsyncThunk(
  'auth/updateUserAvatar',
  async (formData, thunkAPI) => {
    try {
      const res = await usersAPI.updateAvatar(formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || 'Failed to update avatar');
    }
  }
);
