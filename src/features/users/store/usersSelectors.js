export const selectProfileData = state => state.users.profile.data;
export const selectProfileLoading = state => state.users.profile.isLoading;
export const selectProfileError = state => state.users.profile.error;

export const selectInvitations = state => state.users.profile.invitations.data;
export const selectInvitationsCount = state => state.users.profile.invitations.data.length;
export const selectInvitationsLoading = state => state.users.profile.invitations.isLoading;
export const selectInvitationsError = state => state.users.profile.invitations.error;

export const selectAcceptLoading = state => state.users.profile.invitations.operations.accept.isLoading;
export const selectAcceptError = state => state.users.profile.invitations.operations.accept.error;
export const selectCancelLoading = state => state.users.profile.invitations.operations.cancel.isLoading;
export const selectCancelError = state => state.users.profile.invitations.operations.cancel.error;

export const selectUpdateUserLoading = state => state.users.profile.operations.update.isLoading;
export const selectUpdateUserError = state => state.users.profile.operations.update.error;
export const selectRemoveUserLoading = state => state.users.profile.operations.remove.isLoading;
export const selectRemoveUserError = state => state.users.profile.operations.remove.error;
export const selectUpdateUserAvatarLoading = state => state.users.profile.operations.updateAvatar.isLoading;
export const selectUpdateUserAvatarError = state => state.users.profile.operations.updateAvatar.error;
