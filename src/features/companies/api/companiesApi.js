import { api } from '../../../api/apiClient';

export const createCompany = data => api.post('companies', data);

export const getMyOwnedCompanies = ({ limit, offset }) => api.get('companies/owned', { params: { limit, offset } });

export const getMyJoinedCompanies = ({ limit, offset }) => api.get('companies/joined', { params: { limit, offset } });

export const getAllCompanies = ({ limit, offset }) => api.get('companies/all', { params: { limit, offset } });

export const getCompanyById = company_id => api.get(`companies/${company_id}`);

export const updateCompany = (company_id, data) => api.put(`companies/${company_id}`, data);

export const deleteCompany = company_id => api.delete(`companies/${company_id}`);

export const changeCompanyStatus = (company_id, status) =>
  api.patch(`companies/${company_id}?company_status=${status}`);

export const changeCompanyLogo = (company_id, logoFile) =>
  api.post(`companies/${company_id}/logo`, logoFile, { headers: { 'Content-Type': 'multipart/form-data' } });

export const getCompanyMembers = company_id => api.get(`companies/${company_id}/members`);

export const removeCompanyMember = (company_id, user_id) => api.delete(`companies/${company_id}/members/${user_id}`);

export const changeCompanyMemberRole = (company_id, user_id, role) =>
  api.patch(`companies/${company_id}/members/${user_id}/role?new_role=${role}`);

export const getCompanyAdmins = company_id => api.get(`companies/${company_id}/admins`);

export const inviteUser = data => api.post('company-actions/invite', data);

export const declineInvitation = invitationId => api.post(`company-actions/decline-invitation/${invitationId}`);

export const getCompanyInvitations = companyId => api.get(`company-actions/${companyId}/company-invitations`);

export const requestMembership = companyId => api.post(`company-actions/${companyId}/membership-request`);

export const leaveCompany = companyId => api.post(`company-actions/${companyId}/membership-leave`);
