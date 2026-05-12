import { api } from '../../../api/apiClient';
import { InvitationId } from '../../companies/types/invitationsTypes';
import { CompanyId } from '../../companies/types/companiesTypes';

export const getMyInvitations = () => api.get('user-actions/invitations');

export const acceptInvitation = (id: InvitationId) => api.post(`user-actions/${id}/accept`);

export const rejectInvitation = (id: InvitationId) => api.post(`user-actions/${id}/reject`);

export const cancelInvitation = (id: InvitationId) => api.post(`user-actions/${id}/cancel`);

export const requestMembership = (id: CompanyId) => api.post(`user-actions/${id}/requests`);
