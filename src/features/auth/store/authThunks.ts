import * as authAPI from '../api/authApi.js';
import { jwtDecode } from 'jwt-decode';
import { fetchUserProfile } from '../../users/store/usersThunks.js';
import { setTokens } from './authSlice.js';
import { tokenService } from '../../../api/tokenService.js';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { logOut } from './authSlice.js';
import type { RootState, AppDispatch } from '../../../store/store.js';
import { LoginGto, JwtPayload } from '../types/authTypes.js';
import axios from 'axios';

type RejectValue = string;

export const logIn = createAsyncThunk<
  void,
  LoginGto,
  {
    dispatch: AppDispatch;
    rejectValue: RejectValue;
  }
>('auth/login', async (credentials, { dispatch, rejectWithValue }) => {
  try {
    const response = await authAPI.login(credentials);

    const { access_token: accessToken, refresh_token: refreshToken } = response.data;

    dispatch(setTokens({ accessToken, refreshToken }));
    tokenService.setTokens({ accessToken, refreshToken });

    await dispatch(fetchUserProfile());
  } catch (err: unknown) {
    let message = 'Login failed';
    if (axios.isAxiosError(err)) {
      message = err.response?.data?.message ?? message;
    }
    return rejectWithValue(message);
  }
});

export const checkAuth = createAsyncThunk<
  void,
  void,
  {
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: RejectValue;
  }
>('auth/checkAuth', async (_, { dispatch, rejectWithValue, getState }) => {
  try {
    const state = getState();
    const { accessToken: currentAccessToken, refreshToken: currentRefreshToken } = state.auth;

    if (!currentRefreshToken) {
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
    tokenService.clearTokens();

    let message = 'Session expired. Please login again.';

    if (axios.isAxiosError(err)) {
      message = err.response?.data?.message ?? message;
    }

    return rejectWithValue(message);
  }
});

export const logout = () => (dispatch: AppDispatch) => {
  tokenService.clearTokens();
  dispatch(logOut());
};
