import { CompanyDetails } from '@/features/companies/types/companiesTypes';
import { UserId } from '@/features/users/types/userTypes';

export const getUserRoleInCompany = (company: CompanyDetails, userId?: UserId) => {
  if (!company || !userId) return null;
  const member = company?.members?.find(m => m.id === userId);
  return member?.role || null;
};

export const getRoleColor = (role: string) => {
  switch (role) {
    case 'owner':
      return 'error';
    case 'admin':
      return 'warning';
    case 'member':
      return 'primary';
    default:
      return 'default';
  }
};
