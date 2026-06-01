import { RootState } from '@/store/store';

export const selectCompanyInvitations = (state: RootState) => state.invitations.lists.companyInvitations.data;
export const selectCompanyInvitationsLoading = (state: RootState) =>
  state.invitations.lists.companyInvitations.isLoading;
export const selectCompanyInvitationsError = (state: RootState) => state.invitations.lists.companyInvitations.error;

export const selectSendInvitationLoading = (state: RootState) =>
  state.invitations.actions.company.sendInvitation.isLoading;
export const selectSendInvitationError = (state: RootState) => state.invitations.actions.company.sendInvitation.error;
export const selectCancelInvitationLoading = (state: RootState) =>
  state.invitations.actions.company.cancelInvitation.isLoading;
export const selectCancelInvitationError = (state: RootState) =>
  state.invitations.actions.company.cancelInvitation.error;
export const selectAcceptRequestLoading = (state: RootState) =>
  state.invitations.actions.company.acceptRequest.isLoading;
export const selectAcceptRequestError = (state: RootState) => state.invitations.actions.company.acceptRequest.error;
export const selectRejectRequestLoading = (state: RootState) =>
  state.invitations.actions.company.rejectRequest.isLoading;
export const selectRejectRequestError = (state: RootState) => state.invitations.actions.company.rejectRequest.error;

export const selectUserInvitations = (state: RootState) => state.invitations.lists.userInvitations.data;
export const selectUserInvitationsLoading = (state: RootState) => state.invitations.lists.userInvitations.isLoading;
export const selectUserInvitationsError = (state: RootState) => state.invitations.lists.userInvitations.error;

export const selectSendRequestLoading = (state: RootState) => state.invitations.actions.user.sendRequest.isLoading;
export const selectSendRequestError = (state: RootState) => state.invitations.actions.user.sendRequest.error;
export const selectCancelRequestLoading = (state: RootState) => state.invitations.actions.user.cancelRequest.isLoading;
export const selectCancelRequestError = (state: RootState) => state.invitations.actions.user.cancelRequest.error;
export const selectAcceptInvitationLoading = (state: RootState) =>
  state.invitations.actions.user.acceptInvitation.isLoading;
export const selectAcceptInvitationError = (state: RootState) => state.invitations.actions.user.acceptInvitation.error;
export const selectRejectInvitationLoading = (state: RootState) =>
  state.invitations.actions.user.rejectInvitation.isLoading;
export const selectRejectInvitationError = (state: RootState) => state.invitations.actions.user.rejectInvitation.error;
