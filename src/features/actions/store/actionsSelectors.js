export const selectMyInvitations = state => state.actions.myInvitations.data;
export const selectMyInvitationsCount = state => state.actions.myInvitations.data.length;
export const selectMyInvitationsLoading = state => state.actions.myInvitations.isLoading;
export const selectMyInvitationsError = state => state.actions.myInvitations.error;
export const selectAcceptLoading = state => state.actions.operations.accept.isLoading;
export const selectAcceptError = state => state.actions.operations.accept.error;
export const selectCancelLoading = state => state.actions.operations.cancel.isLoading;
export const selectCancelError = state => state.actions.operations.cancel.error;
