import { sendInvitationDto, InvitationId } from '../types/invitationsTypes';
import { CompanyId } from '@/features/companies/types/companiesTypes';
import { api } from '@/api/apiClient';

// COMPANY INVITATIONS

export const getCompanyInvitations = (companyId: CompanyId) =>
  api.get(`company-actions/${companyId}/company-invitations`);

export const sendInvitation = (payload: sendInvitationDto) => api.post('company-actions/invite', payload);

export const cancelInvitation = (id: InvitationId) => api.post(`company-actions/${id}/cancel`);

export const acceptRequest = (id: InvitationId) => api.post(`company-actions/${id}/accept`);

export const rejectRequest = (id: InvitationId) => api.post(`company-actions/${id}/reject`);

// USER INVITATIONS

export const getUserInvitations = () => api.get('user-actions/invitations');

export const sendRequest = (id: CompanyId) => api.post(`user-actions/${id}/requests`);

export const cancelRequest = (id: InvitationId) => api.post(`user-actions/${id}/cancel`);

export const acceptInvitation = (id: InvitationId) => api.post(`user-actions/${id}/accept`);

export const rejectInvitation = (id: InvitationId) => api.post(`user-actions/${id}/reject`);
