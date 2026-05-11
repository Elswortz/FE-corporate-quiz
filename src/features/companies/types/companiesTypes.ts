import type { User, UserId } from '../../users/types/userTypes';

export type CompanyId = string;
export type CompanyStatus = 'hidden' | 'visible';
export type CompanyRole = 'member' | 'admin' | 'owner';

export interface Company {
  id: CompanyId;
  company_name: string;
  company_address: string;
  company_email: string;
  company_phone: string;
  company_website: string;
  company_logo_url: string;
  company_description: string;
  company_status: CompanyStatus;
}

export type CompanyDetails = Company & {
  owner: User;
  members: User[];
};

export type Pagination = {
  limit?: number;
  offset?: number;
};

export type CreateCompanyDto = Omit<Company, 'company_id'>;

export type UpdateCompanyDto = {
  companyId: CompanyId;
  data: Partial<Omit<CreateCompanyDto, 'company_logo_url' | 'company_description' | 'company_status'>>;
};

export type ChangeCompanyStatusDto = {
  companyId: CompanyId;
  status: CompanyStatus;
};

export type ChangeCompanyLogoDto = {
  companyId: CompanyId;
  file: File;
};

export type RemoveCompanyMemberDto = {
  companyId: CompanyId;
  userId: UserId;
};

export type ChangeCompanyMemberRoleDto = {
  companyId: CompanyId;
  userId: UserId;
  role: CompanyRole;
};
