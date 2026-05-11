import { api } from '../../../api/apiClient';
import { LoginGto, RefreshGto, ChangePasswordGto, ResetPasswordGto, ConfirmResetGto } from '../types/authTypes';

export const login = (payload: LoginGto) => api.post('auth/login', payload);

export const refresh = (payload: RefreshGto) => api.post('auth/refresh', payload);

export const azureLogin = () => api.get('auth/azure/login');

export const googleLogin = () => api.get('auth/google/login');

export const changePassword = (payload: ChangePasswordGto) => api.patch('/auth/change-password', payload);

export const resetPassword = ({ email }: ResetPasswordGto) => api.post(`auth/reset-password?email=${email}`);

export const confirmResetPassword = ({ token, uid, payload }: ConfirmResetGto) =>
  api.post(`auth/confirm-reset-password?token=${token}&uid=${uid}`, payload);
