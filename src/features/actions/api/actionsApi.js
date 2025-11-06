import { api } from '../../../api/api';

export const inviteUser = data => api.post('company-actions/invite', data);

export const AcceptInvitation = invitationId => api.post(`company-actions/accept-invitation/${invitationId}`);

export const DeclineInvitation = invitationId => api.post(`company-actions/decline-invitation/${invitationId}`);

export const CancelInvitation = invitationId => api.post(`company-actions/cancel-invitation/${invitationId}`);

export const getMyInvitations = () => api.get('company-actions/invitations');

export const getCompanyInvitations = companyId => api.get(`company-actions/${companyId}/company-invitations`);

export const RequestMembership = companyId => api.post(`company-actions/${companyId}/membership-request`);

export const leaveCompany = companyId => api.post(`company-actions/${companyId}/membership-leave`);
