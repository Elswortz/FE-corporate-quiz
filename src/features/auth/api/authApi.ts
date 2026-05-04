import { api } from '../../../api/apiClient';

type LoginPayload = {
  email: string;
  password: string;
};

type RefreshPayload = {
  refresh_token: string;
};

type ChangePasswordPayload = {
  old_password: string;
  new_password: string;
};

type ResetPasswordParameters = {
  email: string;
};

type ConfirmResetPayload = {
  new_password: string;
};

type ConfirmResetParameters = {
  token: string;
  uid: string;
};

export const login = (payload: LoginPayload) => api.post('auth/login', payload);

export const refresh = (payload: RefreshPayload) => api.post('auth/refresh', payload);

export const azureLogin = () => api.get('auth/azure/login');

export const googleLogin = () => api.get('auth/google/login');

export const changePassword = (payload: ChangePasswordPayload) => api.patch('/auth/change-password', payload);

export const resetPassword = ({ email }: ResetPasswordParameters) => api.post(`auth/reset-password?email=${email}`);

export const confirmResetPassword = ({ token, uid }: ConfirmResetParameters, payload: ConfirmResetPayload) =>
  api.post(`auth/confirm-reset-password?token=${token}&uid=${uid}`, payload);
