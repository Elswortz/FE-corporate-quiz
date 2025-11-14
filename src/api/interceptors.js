import { tokenService } from './tokenService';
import { store } from '../store/store';
import { logOut } from '../features/auth/store/authSlice';
import { api } from './apiClient';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(p => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

export const setupInterceptors = () => {
  api.interceptors.request.use(config => {
    const token = tokenService.getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  api.interceptors.response.use(
    res => res,
    async error => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
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

          const response = await api.post('/auth/refresh', { refresh_token: currentRefreshToken });
          const { access_token: accessToken, refresh_token: refreshToken } = response.data;

          store.dispatch(setTokens({ accessToken, refreshToken }));
          tokenService.setTokens({ accessToken, refreshToken });

          processQueue(null, accessToken);
          isRefreshing = false;

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (err) {
          processQueue(err, null);
          isRefreshing = false;
          tokenService.clearTokens();
          store.dispatch(logOut());
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
};
