import { createSlice } from '@reduxjs/toolkit';
import usersState from './usersState';
import { fetchUsers, fetchUserById, fetchUserProfile, updateUser, updateUserAvatar, removeUser } from './usersThunks';
import { logOut } from '../../auth/store/authSlice';
import { UsersState } from '../types/usersStateTypes';

const resetUserProfile = (state: UsersState) => {
  state.profile.data = null;
  state.profile.isLoading = false;
  state.profile.error = null;
  state.mutations.update.isLoading = false;
  state.mutations.update.error = null;
  state.mutations.updateAvatar.isLoading = false;
  state.mutations.updateAvatar.error = null;
  state.mutations.remove.isLoading = false;
  state.mutations.remove.error = null;
};

const usersSlice = createSlice({
  name: 'users',
  initialState: usersState,
  reducers: {
    resetProfile: resetUserProfile,
  },
  extraReducers: builder =>
    builder
      .addCase(fetchUsers.pending, state => {
        state.list.isLoading = true;
        state.list.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.list.isLoading = false;
        state.list.data = payload;
      })
      .addCase(fetchUsers.rejected, (state, { payload }) => {
        state.list.isLoading = false;
        state.list.error = payload ?? null;
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
        state.selected.error = payload ?? null;
      })
      .addCase(fetchUserProfile.pending, state => {
        state.profile.isLoading = true;
        state.profile.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
        state.profile.data = payload;
        state.profile.isLoading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, { payload }) => {
        state.profile.error = payload ?? null;
        state.profile.isLoading = false;
      })
      .addCase(updateUser.pending, state => {
        state.mutations.update.isLoading = true;
        state.mutations.update.error = null;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.profile.data = payload;
        state.mutations.update.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.mutations.update.error = payload ?? null;
        state.mutations.update.isLoading = false;
      })
      .addCase(removeUser.pending, state => {
        state.mutations.remove.isLoading = true;
        state.mutations.remove.error = null;
      })
      .addCase(removeUser.fulfilled, resetUserProfile)
      .addCase(removeUser.rejected, (state, { payload }) => {
        state.mutations.remove.isLoading = false;
        state.mutations.remove.error = payload ?? null;
      })
      .addCase(updateUserAvatar.pending, state => {
        state.mutations.updateAvatar.isLoading = true;
        state.mutations.updateAvatar.error = null;
      })
      .addCase(updateUserAvatar.fulfilled, (state, { payload }) => {
        state.profile.data = payload;
        state.mutations.updateAvatar.isLoading = false;
      })
      .addCase(updateUserAvatar.rejected, (state, { payload }) => {
        state.mutations.updateAvatar.isLoading = false;
        state.mutations.updateAvatar.error = payload ?? null;
      })
      .addCase(logOut, resetUserProfile),
});

export const { resetProfile } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
