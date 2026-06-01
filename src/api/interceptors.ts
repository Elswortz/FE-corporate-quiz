import { tokenService } from '@/api/tokenService';
import { store } from '@/store/store';
import { logOut, setTokens } from '@/features/auth/store/authSlice';
import { api, refreshApi } from '@/api/apiClient';
import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { AuthResponse } from '@/features/auth/types/authTypes';

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type FailedRequest = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(p => {
    if (error) {
      p.reject(error);
    } else if (token) {
      p.resolve(token);
    }
  });
  failedQueue = [];
};

export const setupInterceptors = () => {
  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = tokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    res => res,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry &&
        originalRequest.url !== '/auth/refresh'
      ) {
        if (isRefreshing) {
          return new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(token => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return api(originalRequest);
            })
            .catch(err => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const currentRefreshToken = tokenService.getRefreshToken();
          if (!currentRefreshToken) throw new Error('No refresh token');

          const response = await refreshApi.post<AuthResponse>('/auth/refresh', {
            refresh_token: currentRefreshToken,
          });

          const { access_token: accessToken, refresh_token: refreshToken } = response.data;

          const tokens: Tokens = { accessToken, refreshToken };

          tokenService.setTokens(tokens);
          store.dispatch(setTokens(tokens));
          processQueue(null, accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          return api(originalRequest);
        } catch (err) {
          processQueue(err, null);
          tokenService.clearTokens();
          store.dispatch(logOut());

          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};
