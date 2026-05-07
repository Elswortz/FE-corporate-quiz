import { api } from '../../../api/apiClient';
import { InviteUserDto, InvitationId } from '../types/invitationsTypes';
import { CompanyId } from '../types/companiesTypes';

export const inviteUser = (payload: InviteUserDto) => api.post('company-actions/invite', payload);

export const acceptRequest = (invitationId: InvitationId) => api.post(`company-actions/${invitationId}/accept`);

export const rejectRequest = (invitationId: InvitationId) => api.post(`company-actions/${invitationId}/reject`);

export const cancelInvitation = (invitationId: InvitationId) => api.post(`company-actions/${invitationId}/cancel`);

export const getCompanyInvitations = (companyId: CompanyId) =>
  api.get(`company-actions/${companyId}/company-invitations`);
