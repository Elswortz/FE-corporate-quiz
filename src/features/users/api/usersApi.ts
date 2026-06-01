import { api } from '../../../api/apiClient';
import { UserId, UpdateUserGto, CreateUserGto, Pagination, UpdateAvatarGto } from '../types/userTypes';

export const getUsers = (params?: Pagination) => api.get('users', { params });

export const getUserById = (id: UserId) => api.get(`users/${id}`);

export const updateUser = (payload: UpdateUserGto) => api.put('users', payload);

export const deleteUser = () => api.delete('users');

export const updateAvatar = (formData: UpdateAvatarGto) => api.post(`users/avatar`, formData);

export const createUser = (payload: CreateUserGto) => api.post('users', payload);

export const getUserProfile = () => api.get('users/profile');
