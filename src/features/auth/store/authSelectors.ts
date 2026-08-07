import type { RootState } from '../../../store/store';

export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export const selectIsSSOAuth = (state: RootState) => state.auth.isSSOAuth;

export const selectAuthIsLoading = (state: RootState) => state.auth.isLoading;

export const selectAuthError = (state: RootState) => state.auth.error;
