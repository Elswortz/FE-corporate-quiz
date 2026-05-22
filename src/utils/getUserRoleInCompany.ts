import { CompanyDetails } from '@/features/companies/types/companiesTypes';
import { UserId } from '@/features/users/types/userTypes';

const getUserRoleInCompany = (company: CompanyDetails, userId?: UserId) => {
  if (!company || !userId) return null;
  const member = company?.members?.find(m => m.id === userId);
  return member?.role || null;
};

export default getUserRoleInCompany;
