export const selectCompanyInvitations = state => state.companies.selected.invitations.data;
export const selectInvitationsLoading = state => state.companies.selected.invitations.isLoading;
export const selectInvitationsError = state => state.companies.selected.invitations.error;
