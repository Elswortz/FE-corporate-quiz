import { api } from '../../../api/api';

export const changePassword = passwords => api.patch('/auth/change-password', passwords);

export const resetPassword = email => api.post(`auth/reset-password?email=${email}`);

export const confirmResetPassword = (token, uid, password) =>
  api.post(`auth/confirm-reset-password?token=${token}&uid=${uid}`, { new_password: password });

export const updateUser = credentials => api.put('users', credentials);

export const deleteUser = () => api.delete('users');

export const updateAvatar = formData =>
  api.post('users/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
