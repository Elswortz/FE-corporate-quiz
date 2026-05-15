import { createSlice } from '@reduxjs/toolkit';
import invitationsState from './invitationsState';
import {
  fetchCompanyInvitations,
  sendInvitation,
  acceptRequest,
  rejectRequest,
  cancelInvitation,
  fetchUserInvitations,
  acceptInvitation,
  rejectInvitation,
  sendRequest,
  cancelRequest,
} from './invitationsThunks';

const invitationsSlice = createSlice({
  name: 'invitations',
  initialState: invitationsState,
  reducers: {},
  extraReducers: builder =>
    builder
      // COMPANY INVITATIONS
      .addCase(fetchCompanyInvitations.pending, state => {
        state.lists.companyInvitations.isLoading = true;
        state.lists.companyInvitations.error = null;
      })
      .addCase(fetchCompanyInvitations.fulfilled, (state, { payload }) => {
        state.lists.companyInvitations.data = payload.filter(i => i.status === 'pending');
        state.lists.companyInvitations.isLoading = false;
      })
      .addCase(fetchCompanyInvitations.rejected, (state, { payload }) => {
        state.lists.companyInvitations.error = payload ?? null;
        state.lists.companyInvitations.isLoading = false;
      })
      .addCase(sendInvitation.pending, state => {
        state.actions.company.sendInvitation.error = null;
        state.actions.company.sendInvitation.isLoading = true;
      })
      .addCase(sendInvitation.fulfilled, (state, { payload }) => {
        state.lists.companyInvitations.data.push(payload);
        state.actions.company.sendInvitation.isLoading = false;
      })
      .addCase(sendInvitation.rejected, (state, { payload }) => {
        state.actions.company.sendInvitation.error = payload ?? null;
        state.actions.company.sendInvitation.isLoading = false;
      })
      .addCase(acceptRequest.pending, state => {
        state.actions.company.acceptRequest.isLoading = true;
        state.actions.company.acceptRequest.error = null;
      })
      .addCase(acceptRequest.fulfilled, (state, { payload }) => {
        state.lists.companyInvitations.data = state.lists.companyInvitations.data.filter(i => i.id !== payload);
        state.actions.company.acceptRequest.isLoading = false;
      })
      .addCase(acceptRequest.rejected, (state, { payload }) => {
        state.actions.company.acceptRequest.isLoading = false;
        state.actions.company.acceptRequest.error = payload ?? null;
      })
      .addCase(rejectRequest.pending, state => {
        state.actions.company.rejectRequest.isLoading = true;
        state.actions.company.rejectRequest.error = null;
      })
      .addCase(rejectRequest.fulfilled, (state, { payload }) => {
        state.lists.companyInvitations.data = state.lists.companyInvitations.data.filter(i => i.id !== payload);
        state.actions.company.rejectRequest.isLoading = false;
      })
      .addCase(rejectRequest.rejected, (state, { payload }) => {
        state.actions.company.rejectRequest.isLoading = false;
        state.actions.company.rejectRequest.error = payload ?? null;
      })
      .addCase(cancelInvitation.pending, state => {
        state.actions.company.cancelInvitation.isLoading = true;
        state.actions.company.cancelInvitation.error = null;
      })
      .addCase(cancelInvitation.fulfilled, (state, { payload }) => {
        state.lists.companyInvitations.data = state.lists.companyInvitations.data.filter(i => i.id !== payload);
        state.actions.company.cancelInvitation.isLoading = false;
      })
      .addCase(cancelInvitation.rejected, (state, { payload }) => {
        state.actions.company.cancelInvitation.error = payload ?? null;
        state.actions.company.cancelInvitation.isLoading = false;
      })
      // USER INVITATIONS
      .addCase(fetchUserInvitations.pending, state => {
        state.lists.userInvitations.isLoading = true;
        state.lists.userInvitations.error = null;
      })
      .addCase(fetchUserInvitations.fulfilled, (state, { payload }) => {
        state.lists.userInvitations.isLoading = false;
        state.lists.userInvitations.data = payload.filter(i => i.status === 'pending');
      })
      .addCase(fetchUserInvitations.rejected, (state, { payload }) => {
        state.lists.userInvitations.error = payload ?? null;
        state.lists.userInvitations.isLoading = false;
      })
      .addCase(acceptInvitation.pending, state => {
        state.actions.user.acceptInvitation.isLoading = true;
        state.actions.user.acceptInvitation.error = null;
      })
      .addCase(acceptInvitation.fulfilled, (state, { payload }) => {
        state.actions.user.acceptInvitation.isLoading = false;
        state.lists.userInvitations.data = state.lists.userInvitations.data.filter(i => i.id !== payload);
      })
      .addCase(acceptInvitation.rejected, (state, { payload }) => {
        state.actions.user.acceptInvitation.isLoading = false;
        state.actions.user.acceptInvitation.error = payload ?? null;
      })
      .addCase(rejectInvitation.pending, state => {
        state.actions.user.rejectInvitation.isLoading = true;
        state.actions.user.rejectInvitation.error = null;
      })
      .addCase(rejectInvitation.fulfilled, (state, { payload }) => {
        state.actions.user.rejectInvitation.isLoading = false;
        state.lists.userInvitations.data = state.lists.userInvitations.data.filter(i => i.id !== payload);
      })
      .addCase(rejectInvitation.rejected, (state, { payload }) => {
        state.actions.user.rejectInvitation.isLoading = false;
        state.actions.user.rejectInvitation.error = payload ?? null;
      })
      .addCase(sendRequest.pending, state => {
        state.actions.user.sendRequest.isLoading = true;
        state.actions.user.sendRequest.error = null;
      })
      .addCase(sendRequest.fulfilled, (state, { payload }) => {
        state.actions.user.sendRequest.isLoading = false;
        state.lists.userInvitations.data.push(payload);
      })
      .addCase(sendRequest.rejected, (state, { payload }) => {
        state.actions.user.sendRequest.isLoading = false;
        state.actions.user.sendRequest.error = payload ?? null;
      })
      .addCase(cancelRequest.pending, state => {
        state.actions.user.cancelRequest.isLoading = true;
        state.actions.user.cancelRequest.error = null;
      })
      .addCase(cancelRequest.fulfilled, (state, { payload }) => {
        state.actions.user.cancelRequest.isLoading = false;
        state.lists.userInvitations.data = state.lists.userInvitations.data.filter(i => i.id !== payload);
      })
      .addCase(cancelRequest.rejected, (state, { payload }) => {
        state.actions.user.cancelRequest.isLoading = false;
        state.actions.user.cancelRequest.error = payload ?? null;
      }),
});

export const invitationsReducer = invitationsSlice.reducer;
// export const { clearCurrentCompany } = companiesSlice.actions;
