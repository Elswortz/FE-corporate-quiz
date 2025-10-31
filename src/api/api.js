import axios from 'axios';
import { store } from '../store/store';
import { refresh } from '../features/auth/api/authApi';
import { setAuthTokens, logOut } from '../features/auth/store/authSlice';

export const api = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const refreshApi = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(config => {
  const token = store.getState().auth.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

let isLoggedOut = false;
const logout = () => {
  isLoggedOut = true;
  store.dispatch(logOut());
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config || {};

    if (originalRequest.url.includes('/auth/refresh')) {
      logout();
      return Promise.reject(error);
    }

    if (error?.response?.status === 401 && !originalRequest._isRetry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            if (isLoggedOut) return Promise.reject(error);
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api.request(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._isRetry = true;
      isRefreshing = true;

      try {
        const currentRefreshToken = store.getState().auth.refreshToken;

        if (!currentRefreshToken) {
          logout();
          return Promise.reject(error);
        }

        const res = await refresh(currentRefreshToken);
        const { access_token: accessToken, refresh_token: refreshToken } = res.data;

        if (!isLoggedOut) {
          store.dispatch(setAuthTokens({ accessToken, refreshToken }));
        }

        processQueue(null, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api.request(originalRequest);
      } catch (err) {
        processQueue(err, null);
        logout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
