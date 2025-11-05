import { createSlice } from '@reduxjs/toolkit';
import usersState from './usersState';
import { fetchUsers, fetchUserById } from '../store/usersThunks';

const usersSlice = createSlice({
  name: 'users',
  initialState: usersState,
  reducers: {
    // setPage(state, action) {
    //   state.pagination.page = action.payload;
    // },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchUsers.pending, state => {
        state.all.isLoading = true;
        state.all.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.all.isLoading = false;
        state.all.data = payload.items;
        state.all.meta = payload.meta;
      })
      .addCase(fetchUsers.rejected, (state, { payload }) => {
        state.all.isLoading = false;
        state.all.error = payload;
      })
      .addCase(fetchUserById.pending, state => {
        state.selected.isLoading = true;
        state.selected.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, { payload }) => {
        state.selected.isLoading = false;
        state.selected.data = payload;
      })
      .addCase(fetchUserById.rejected, (state, { payload }) => {
        state.selected.isLoading = false;
        state.selected.error = payload;
      }),
});

export const { setPage } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
