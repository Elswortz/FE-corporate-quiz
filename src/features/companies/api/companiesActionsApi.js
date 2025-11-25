import { api } from '../../../api/apiClient';

export const inviteUser = data => api.post('company-actions/invite', data);

export const acceptRequest = invitationId => api.post(`company-actions/${invitationId}/accept`);

export const rejectRequest = invitationId => api.post(`company-actions/${invitationId}/reject`);

export const cancelInvitation = invitationId => api.post(`company-actions/${invitationId}/cancel`);

export const getCompanyInvitations = companyId => api.get(`company-actions/${companyId}/company-invitations`);
