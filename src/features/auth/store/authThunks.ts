import * as authAPI from '../api/authApi.js';
import { jwtDecode } from 'jwt-decode';
import { fetchUserProfile } from '../../users/store/usersThunks.js';
import { logOut, setTokens } from './authSlice.js';
import { tokenService } from '../../../api/tokenService.js';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../../../store/store.js';

type LoginCredentials = {
  email: string;
  password: string;
};

type AuthError = string;

type JwtPayload = {
  exp: number;
};

export const logIn = createAsyncThunk<
  void,
  LoginCredentials,
  {
    dispatch: AppDispatch;
    rejectValue: AuthError;
  }
>('auth/login', async (credentials, { dispatch, rejectWithValue }) => {
  try {
    const response = await authAPI.login(credentials);

    const { access_token: accessToken, refresh_token: refreshToken } = response.data;

    dispatch(setTokens({ accessToken, refreshToken }));
    tokenService.setTokens({ accessToken, refreshToken });

    await dispatch(fetchUserProfile());
  } catch (err: unknown) {
    const message = (err as any)?.response?.data?.message || 'Login failed';

    return rejectWithValue(message);
  }
});

export const checkAuth = createAsyncThunk<
  void,
  void,
  {
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: AuthError;
  }
>('auth/checkAuth', async (_, { dispatch, rejectWithValue, getState }) => {
  try {
    const state = getState();
    const { accessToken: currentAccessToken, refreshToken: currentRefreshToken } = state.auth;

    if (!currentRefreshToken) {
      dispatch(logOut());
      return rejectWithValue('No refresh token available');
    }

    if (currentAccessToken) {
      const decoded = jwtDecode<JwtPayload>(currentAccessToken);

      const now = Date.now() / 1000;

      if (decoded.exp > now + 10) {
        await dispatch(fetchUserProfile());
        return;
      }
    }

    const response = await authAPI.refresh({
      refresh_token: currentRefreshToken,
    });

    const { access_token: accessToken, refresh_token: refreshToken } = response.data;

    dispatch(setTokens({ accessToken, refreshToken }));
    tokenService.setTokens({ accessToken, refreshToken });

    await dispatch(fetchUserProfile());
  } catch (err: unknown) {
    dispatch(logOut());

    const message = (err as any)?.response?.data?.message || 'Session expired. Please login again.';

    return rejectWithValue(message);
  }
});
