import { api } from '../../../api/apiClient';

export const inviteUser = data => api.post('company-actions/invite', data);

export const declineInvitation = invitationId => api.post(`company-actions/decline-invitation/${invitationId}`);

export const getCompanyInvitations = companyId => api.get(`company-actions/${companyId}/company-invitations`);

export const requestMembership = companyId => api.post(`company-actions/${companyId}/membership-request`);

export const leaveCompany = companyId => api.post(`company-actions/${companyId}/membership-leave`);