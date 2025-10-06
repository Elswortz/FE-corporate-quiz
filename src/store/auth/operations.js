import * as authAPI from '../../api/authApi.js';
import * as userAPI from '../../api/usersApi.js';

import { createAsyncThunk } from '@reduxjs/toolkit';

// export const getUserProfile = createAsyncThunk('auth/profile', async (_, thunkAPI) => {
//   try {
//     const respone = await userAPI.getUserProfile();
//     return respone.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

export const logIn = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await authAPI.login(credentials);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

export const getUserProfile = createAsyncThunk('auth/profile', async (_, thunkAPI) => {
  try {
    const response = await userAPI.getUserProfile();
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to load user');
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
  const { token } = thunkAPI.getState().auth;
  if (!token) return thunkAPI.rejectWithValue('Invalid token');

  try {
    const respone = await authAPI.refresh();
    return respone.data;
  } catch (error) {
    thunkAPI.dispatch(logOut());
    return thunkAPI.rejectWithValue('Session expired. Please login again.');
  }
});
