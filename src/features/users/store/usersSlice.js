import { createSlice } from '@reduxjs/toolkit';
import usersState from './usersState';
import { fetchUsers, fetchUserById } from '../store/usersThunks';

const usersSlice = createSlice({
  name: 'users',
  initialState: usersState,
  reducers: {
    setPage(state, action) {
      state.pagination.page = action.payload;
    },
  },
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
        state.pagination.limit = payload.meta.limit || 1;
        state.pagination.offset = payload.meta.offset || 0;
        state.pagination.hasNext = payload.meta.has_next || false;
        state.pagination.hasPrevious = payload.meta.has_previous || false;
      })
      .addCase(fetchUsers.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(fetchUserById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.selected = payload;
      })
      .addCase(fetchUserById.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      }),
});

export const { setPage } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
