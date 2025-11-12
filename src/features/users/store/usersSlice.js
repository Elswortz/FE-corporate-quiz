import { createSlice } from '@reduxjs/toolkit';
import usersState from './usersState';
import {
  fetchUsers,
  fetchUserById,
  fetchUserProfile,
  updateUser,
  updateUserAvatar,
  removeUser,
  fetchMyInvitations,
  acceptInvitation,
  cancelInvitation,
} from '../store/usersThunks';
import { logOut } from '../../auth/store/authSlice';

const resetUserProfile = state => {
  state.profile.data = null;
  state.profile.isLoading = false;
  state.profile.error = null;
  state.profile.invitations.data = [];
  state.profile.invitations.isLoading = false;
  state.profile.invitations.error = null;
  state.profile.invitations.operations.accept.isLoading = false;
  state.profile.invitations.operations.accept.error = null;
  state.profile.invitations.operations.cancel.isLoading = false;
  state.profile.invitations.operations.cancel.error = null;
  state.profile.operations.update.isLoading = false;
  state.profile.operations.update.error = null;
  state.profile.operations.updateAvatar.isLoading = false;
  state.profile.operations.updateAvatar.error = null;
  state.profile.operations.remove.isLoading = false;
  state.profile.operations.remove.error = null;
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
      })
      .addCase(fetchUserProfile.pending, (state, action) => {
        state.profile.isLoading = true;
        state.profile.error = false;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile.data = action.payload;
        state.profile.isLoading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.profile.error = action.payload;
        state.profile.isLoading = false;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.profile.operations.update.isLoading = true;
        state.profile.operations.update.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.profile.data = action.payload;
        state.profile.operations.update.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.profile.operations.update.error = action.payload;
        state.profile.operations.update.isLoading = false;
      })
      .addCase(removeUser.pending, (state, action) => {
        state.profile.operations.remove.isLoading = true;
        state.profile.operations.remove.error = null;
      })
      .addCase(removeUser.fulfilled, resetUserProfile)
      .addCase(removeUser.rejected, (state, action) => {
        state.profile.operations.remove.isLoading = false;
        state.profile.operations.remove.error = action.payload;
      })
      .addCase(updateUserAvatar.pending, (state, action) => {
        state.profile.operations.updateAvatar.isLoading = true;
        state.profile.operations.updateAvatar.error = null;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.profile.data = action.payload;
        state.profile.operations.updateAvatar.isLoading = false;
      })
      .addCase(updateUserAvatar.rejected, (state, action) => {
        state.profile.operations.updateAvatar.isLoading = false;
        state.profile.operations.updateAvatar.error = action.payload;
      })
      .addCase(logOut, resetUserProfile)
      .addCase(fetchMyInvitations.pending, state => {
        state.profile.invitations.isLoading = true;
        state.profile.invitations.error = null;
      })
      .addCase(fetchMyInvitations.fulfilled, (state, { payload }) => {
        state.profile.invitations.isLoading = false;
        state.profile.invitations.data = payload.filter(i => i.status === 'pending');
      })
      .addCase(fetchMyInvitations.rejected, (state, { payload }) => {
        state.profile.invitations.isLoading = false;
        state.profile.invitations.error = payload;
      })
      .addCase(acceptInvitation.pending, state => {
        state.profile.invitations.operations.accept.isLoading = true;
        state.profile.invitations.operations.accept.error = null;
      })
      .addCase(acceptInvitation.fulfilled, (state, { payload }) => {
        state.profile.invitations.operations.accept.isLoading = false;
        state.profile.invitations.data = state.profile.invitations.data.filter(i => i.id !== payload.invitationId);
      })
      .addCase(acceptInvitation.rejected, (state, { payload }) => {
        state.profile.invitations.operations.accept.isLoading = false;
        state.profile.invitations.operations.accept.error = payload;
      })
      .addCase(cancelInvitation.pending, state => {
        state.profile.invitations.operations.cancel.isLoading = true;
        state.profile.invitations.operations.cancel.error = null;
      })
      .addCase(cancelInvitation.fulfilled, (state, { payload }) => {
        state.profile.invitations.operations.cancel.isLoading = false;
        state.profile.invitations.data = state.profile.invitations.data.filter(i => i.id !== payload.invitationId);
      })
      .addCase(cancelInvitation.rejected, (state, { payload }) => {
        state.profile.invitations.operations.cancel.isLoading = false;
        state.profile.invitations.operations.cancel.error = payload;
      }),
});

export const { resetProfile } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
