import { createAsyncThunk } from '@reduxjs/toolkit';
import { RejectValue, Pagination } from '@/types/globalTypes';
import * as usersAPI from '../api/usersApi';
import { UpdateAvatarGto, UpdateUserGto, User, UserId } from '../types/userTypes';
import { AppDispatch } from '@/store/store';
import { logOut } from '@/features/auth/store/authSlice';

export const fetchUsers = createAsyncThunk<User[], Pagination, { rejectValue: RejectValue }>(
  'users/fetchAll',
  async ({ limit, offset }, { rejectWithValue }) => {
    try {
      const res = await usersAPI.getUsers({ limit, offset });
      return res.data.items;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Failed to load users');
    }
  }
);

export const fetchUserById = createAsyncThunk<User, UserId, { rejectValue: RejectValue }>(
  'users/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await usersAPI.getUserById(id);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Failed to load user');
    }
  }
);

export const fetchUserProfile = createAsyncThunk<User, void, { rejectValue: RejectValue }>(
  'users/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const res = await usersAPI.getUserProfile();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

export const updateUser = createAsyncThunk<User, UpdateUserGto, { rejectValue: RejectValue }>(
  'users/update',
  async (data, { rejectWithValue }) => {
    try {
      const res = await usersAPI.updateUser(data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update user');
    }
  }
);

export const removeUser = createAsyncThunk<void, void, { rejectValue: RejectValue; dispatch: AppDispatch }>(
  'users/remove',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await usersAPI.deleteUser();
      dispatch(logOut());
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete user');
    }
  }
);

export const updateUserAvatar = createAsyncThunk<User, UpdateAvatarGto, { rejectValue: RejectValue }>(
  'users/updateAvatar',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await usersAPI.updateAvatar(formData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update avatar');
    }
  }
);
