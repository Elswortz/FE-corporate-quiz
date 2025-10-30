import { api } from './api';

export const createCompany = data => api.post('companies', data);

export const getMyOwnedCompanies = ({ limit, offset }) => api.get('companies/owned', { params: { limit, offset } });

export const getMyJoinedCompanies = ({ limit, offset }) => api.get('companies/joined', { params: { limit, offset } });

export const getAllCompanies = ({ limit, offset }) => api.get('companies/all', { params: { limit, offset } });

export const getCompanyById = company_id => api.get(`companies/${company_id}`);

export const updateCompany = (company_id, data) => api.put(`companies/${company_id}`, data);

export const deleteCompany = company_id => api.delete(`companies/${company_id}`);

export const changeCompanyStatus = (company_id, status) =>
  api.patch(`companies/${company_id}?company_status=${status}`);

export const changeCompanyLogo = (company_id, logoData) =>
  api.post(`companies/${company_id}/logo`, logoData, { headers: { 'Content-Type': 'multipart/form-data' } });

export const getCompanyMembers = company_id => api.get(`companies/${company_id}/members`);

export const removeCompanyMember = (company_id, user_id) => api.delete(`companies/${company_id}/members/${user_id}`);

export const changeCompanyMemberRole = (company_id, user_id, role) =>
  api.patch(`companies/${company_id}/members/${user_id}/role?new_role=${role}`);

export const getCompanyAdmins = company_id => api.get(`companies/${company_id}/admins`);
