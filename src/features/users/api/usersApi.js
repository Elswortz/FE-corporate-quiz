import { api } from '../../../api/api';

export const getUsers = ({ limit, offset }) => api.get('users', { params: { limit, offset } });

export const getUserById = id => api.get(`users/${id}`);
