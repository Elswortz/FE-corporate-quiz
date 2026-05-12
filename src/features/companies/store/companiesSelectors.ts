import type { RootState } from '../../../store/store';

export const selectCompanyInvitations = (state: RootState) => state.companies.invitations.data;

export const selectInvitationsLoading = (state: RootState) => state.companies.invitations.isLoading;

export const selectInvitationsError = (state: RootState) => state.companies.invitations.error;

export const selectCancelLoading = (state: RootState) => state.companies.invitations.actions.reject.isLoading;

export const selectCancelError = (state: RootState) => state.companies.invitations.actions.reject.error;

export const selectLeaveLoading = (state: RootState) => state.companies.operations.leave.isLoading;

export const selectLeaveError = (state: RootState) => state.companies.operations.leave.error;

export const selectSelectedCompany = (state: RootState) => state.companies.selected;

export const selectChangeStatusLoading = (state: RootState) => state.companies.operations.changeStatus.isLoading;
