import api from './api';

export const login = credentials => api.post('auth/login', credentials);

export const refresh = token => api.post('auth/refresh', { refresh_token: token });

export const changePassword = passwords => api.patch('/auth/change-password', passwords);

export const resetPassword = email => api.post(`auth/reset-password?email=${email}`);

export const confirmResetPassword = (token, uid) =>
  api.post(`auth/confirm-reset-password?token=${token}&uid=${uid}`);

export const azureLogin = () => api.get('auth/azure/login');

export const googleLogin = () => api.get('auth/google/login');
