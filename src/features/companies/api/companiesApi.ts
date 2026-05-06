import { api } from '../../../api/apiClient';
import {
  CreateCompanyDto,
  UpdateCompanyDto,
  ChangeCompanyStatusDto,
  RemoveCompanyMemberDto,
  ChangeCompanyLogoDto,
  ChangeCompanyMemberRoleDto,
  Pagination,
  CompanyId,
} from '../types/companiesTypes';

export const createCompany = (dto: CreateCompanyDto) => api.post('/companies', dto);

export const getMyOwnedCompanies = (params?: Pagination) => api.get('/companies/owned', { params });

export const getMyJoinedCompanies = (params?: Pagination) => api.get('companies/joined', { params });

export const getAllCompanies = (params?: Pagination) => api.get('companies/all', { params });

export const getCompanyById = (companyId: CompanyId) => api.get(`/companies/${companyId}`);

export const updateCompany = ({ companyId, data }: UpdateCompanyDto) => api.put(`/companies/${companyId}`, data);

export const deleteCompany = (companyId: CompanyId) => api.delete(`/companies/${companyId}`);

export const changeCompanyStatus = ({ companyId, status }: ChangeCompanyStatusDto) =>
  api.patch(`/companies/${companyId}`, null, {
    params: { company_status: status },
  });

export const changeCompanyLogo = ({ companyId, file }: ChangeCompanyLogoDto) => {
  const formData = new FormData();
  formData.append('logo_file', file);
  return api.post(`/companies/${companyId}/logo`, formData);
};

export const getCompanyMembers = (companyId: CompanyId) => api.get(`companies/${companyId}/members`);

export const removeCompanyMember = ({ companyId, userId }: RemoveCompanyMemberDto) =>
  api.delete(`/companies/${companyId}/members/${userId}`);

export const changeCompanyMemberRole = ({ companyId, userId, role }: ChangeCompanyMemberRoleDto) =>
  api.patch(`/companies/${companyId}/members/${userId}/role`, null, {
    params: { new_role: role },
  });

export const getCompanyAdmins = (companyId: CompanyId) => api.get(`companies/${companyId}/admins`);

export const leaveCompany = (companyId: CompanyId) => api.post(`user-actions/${companyId}/leave`);
