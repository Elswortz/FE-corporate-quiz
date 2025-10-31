import { api, refreshApi } from '../../../api/api';

export const login = credentials => api.post('auth/login', credentials);

export const refresh = refresh_token => refreshApi.post('auth/refresh', { refresh_token });

export const azureLogin = () => api.get('auth/azure/login');

export const googleLogin = () => api.get('auth/google/login');

export const createUser = credentials => api.post('users', credentials);

export const getUserProfile = () => api.get('users/profile');
