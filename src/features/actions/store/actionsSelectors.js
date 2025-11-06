export const selectMyInvitations = state => state.actions.myInvitations.data;
export const selectMyInvitationsCount = state => state.actions.myInvitations.data.length;
export const selectMyInvitationsLoading = state => state.actions.myInvitations.isLoading;
