import { api } from '../../../api/apiClient';

export const inviteUser = data => api.post('company-actions/invite', data);

export const acceptRequest = requestId => api.post(`company-actions/${requestId}/accept`);

export const rejectRequest = requestId => api.post(`company-actions/${requestId}/reject`);

export const cancelInvitation = invitationId => api.post(`company-actions/${invitationId}/cancel`);

export const getCompanyInvitations = companyId => api.get(`company-actions/${companyId}/company-invitations`);
