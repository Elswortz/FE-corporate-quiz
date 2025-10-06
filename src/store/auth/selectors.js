export const selectisAuthenticated = state => state.auth.isAuthenticated;

export const selectUser = state => state.auth.user;

export const selectisLoading = state => state.auth.isLoading;

export const selectError = state => state.auth.error;
