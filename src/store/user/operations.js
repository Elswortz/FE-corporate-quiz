import { createAsyncThunk } from '@reduxjs/toolkit';
import * as usersAPI from '../../api/usersApi';

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async ({ page = 1, limit = 20 } = {}, thunkAPI) => {
    try {
      const offset = (page - 1) * limit;
      const res = await usersAPI.getUsers({ limit, offset });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || 'Failed to load users');
    }
  }
);

export const fetchUserById = createAsyncThunk('users/fetchById', async (id, thunkAPI) => {
  try {
    const res = await usersAPI.getUserById(id);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Failed to load user');
  }
});

export const createUser = createAsyncThunk('users/create', async (data, thunkAPI) => {
  try {
    const res = await usersAPI.createUser(data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Failed to create user');
  }
});

export const updateUser = createAsyncThunk('users/update', async (data, thunkAPI) => {
  try {
    const res = await usersAPI.updateUser(data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Failed to update user');
  }
});

export const removeUser = createAsyncThunk('users/delete', async (_, thunkAPI) => {
  try {
    await usersAPI.deleteUser();
    return true;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Failed to delete user');
  }
});

export const updateAvatar = createAsyncThunk('users/updateAvatar', async (formData, thunkAPI) => {
  try {
    const res = await usersAPI.updateAvatar(formData);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Failed to update avatar');
  }
});
