import { api } from '../../../api/apiClient';

export const getMyInvitations = () => api.get('user-actions/invitations');

export const acceptInvitation = invitationId => api.post(`user-actions/${invitationId}/accept`);

export const rejectInvitation = invitationId => api.post(`user-actions/${invitationId}/reject`);

export const cancelInvitation = invitationId => api.post(`user-actions/${invitationId}/cancel`);

export const requestMembership = companyId => api.post(`user-actions/${companyId}/requests`);

export const leaveCompany = companyId => api.post(`user-actions/${companyId}/leave`);
