import { api } from '../../../api/apiClient';

export const getUsers = ({ limit, offset }) => api.get('users', { params: { limit, offset } });

export const getUserById = id => api.get(`users/${id}`);

export const updateUser = credentials => api.put('users', credentials);

export const deleteUser = () => api.delete('users');

export const updateAvatar = formData =>
  api.post('users/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

export const createUser = credentials => api.post('users', credentials);

export const getUserProfile = () => api.get('users/profile');
