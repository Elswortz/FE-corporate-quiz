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
