import { api } from '../../../api/api';

export const getUsers = ({ limit, offset }) => api.get('users', { params: { limit, offset } });

export const getUserById = id => api.get(`users/${id}`);

export const updateUser = credentials => api.put('users', credentials);

export const deleteUser = () => api.delete('users');

export const updateAvatar = formData =>
  api.post('users/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

export const createUser = credentials => api.post('users', credentials);

export const getUserProfile = () => api.get('users/profile');

export const getMyInvitations = () => api.get('company-actions/invitations');

export const acceptInvitation = invitationId => api.post(`company-actions/accept-invitation/${invitationId}`);

export const cancelInvitation = invitationId => api.post(`company-actions/cancel-invitation/${invitationId}`);
