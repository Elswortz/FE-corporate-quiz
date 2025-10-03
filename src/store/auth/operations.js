import * as authAPI from '../../api/authApi.js';
import * as userAPI from '../../api/usersApi.js';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUserProfile = createAsyncThunk('auth/profile', async (_, thunkAPI) => {
  try {
    const respone = await userAPI.getUserProfile();
    return respone.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logIn = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await authAPI.login(credentials);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const googleLogIn = createAsyncThunk('auth/googleLogin', async (_, thunkAPI) => {
  try {
    const response = await authAPI.googleLogin();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const azureLogIn = createAsyncThunk('auth/azureLogin', async (_, thunkAPI) => {
  try {
    const response = await authAPI.azureLogin();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refresh = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const { token } = thunkAPI.getState().auth;
  if (!token) return thunkAPI.rejectWithValue('Invalid token');

  try {
    const respone = await authAPI.refresh();
    return respone.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
