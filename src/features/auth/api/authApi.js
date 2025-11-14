import { api } from '../../../api/apiClient';

export const login = credentials => api.post('auth/login', credentials);

export const refresh = refresh_token => refreshApi.post('auth/refresh', { refresh_token });

export const azureLogin = () => api.get('auth/azure/login');

export const googleLogin = () => api.get('auth/google/login');

export const changePassword = passwords => api.patch('/auth/change-password', passwords);

export const resetPassword = email => api.post(`auth/reset-password?email=${email}`);

export const confirmResetPassword = (token, uid, password) =>
  api.post(`auth/confirm-reset-password?token=${token}&uid=${uid}`, { new_password: password });
