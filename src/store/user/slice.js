import { createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';
import {
  fetchUsers,
  fetchUserByEmail,
  fetchCurrentUser,
  createUser,
  updateUser,
  removeUser,
  updateAvatar,
} from './operations';

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchUsers.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.list = payload.items;
        state.pagination.total = payload.meta.total || 0;
        state.pagination.limit = payload.meta.limit || 10;
        state.pagination.offset = payload.meta.offset || 0;
        state.pagination.hasNext = payload.meta.has_next || false;
        state.pagination.hasPrevious = payload.meta.has_previous || false;
      })
      .addCase(fetchUsers.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(fetchCurrentUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.current = payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.current = { ...state.current, ...payload };
      })
      .addCase(updateAvatar.fulfilled, (state, { payload }) => {
        if (state.current) {
          state.current.avatar_url = payload.avatar_url;
        }
      })
      .addCase(removeUser.fulfilled, state => {
        state.current = null;
      })
      .addCase(fetchUserByEmail.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserByEmail.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.selected = payload;
      })
      .addCase(fetchUserByEmail.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      }),
});

export const usersReducer = usersSlice.reducer;
