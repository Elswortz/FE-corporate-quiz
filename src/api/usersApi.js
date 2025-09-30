import api from './api';

export const getUsers = () => api.get('users');

export const updateUser = credentials => api.put('users', credentials);

export const createUser = credentials => api.post('users', credentials);

export const deleteUser = () => api.delete('users');

export const getUserProfile = () => api.get('users/profile');

export const getUserByEmail = email => api.get(`users/${email}`);

export const updateAvatar = avatarFile => api.post('users/avatar', avatarFile);
