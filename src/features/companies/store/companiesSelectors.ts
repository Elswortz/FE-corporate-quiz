import type { RootState } from '../../../store/store';
import { CompanyId } from '../types/companiesTypes';

export const selectAllCompanies = (state: RootState) => state.companies.lists.all.data;
export const selectAllCompaniesLoading = (state: RootState) => state.companies.lists.all.isLoading;
export const selectAllCompaniesError = (state: RootState) => state.companies.lists.all.error;

export const selectJoinedCompanies = (state: RootState) => state.companies.lists.joined.data;
export const selectJoinedCompaniesLoading = (state: RootState) => state.companies.lists.joined.isLoading;
export const selectJoinedCompaniesError = (state: RootState) => state.companies.lists.joined.error;

export const selectOwnedCompanies = (state: RootState) => state.companies.lists.owned.data;
export const selectOwnedCompaniesLoading = (state: RootState) => state.companies.lists.owned.isLoading;
export const selectOwnedCompaniesError = (state: RootState) => state.companies.lists.owned.error;

export const selectSelectedCompany = (state: RootState) => state.companies.selected.data;
export const selectSelectedCompanyLoading = (state: RootState) => state.companies.selected.isLoading;
export const selectSelectedCompanyError = (state: RootState) => state.companies.selected.error;

export const selectCreateCompanyLoading = (state: RootState) => state.companies.mutations.create.isLoading;
export const selectCreateCompanyError = (state: RootState) => state.companies.mutations.create.error;

export const selectUpdateCompanyLoading = (state: RootState) => state.companies.mutations.update.isLoading;
export const selectUpdateCompanyError = (state: RootState) => state.companies.mutations.update.error;

export const selectDeleteCompanyLoading = (state: RootState) => state.companies.mutations.delete.isLoading;
export const selectDeleteCompanyError = (state: RootState) => state.companies.mutations.delete.error;

export const selectChangeStatusLoading = (state: RootState) => state.companies.mutations.changeStatus.isLoading;
export const selectChangeStatusError = (state: RootState) => state.companies.mutations.changeStatus.error;

export const selectChangeLogoLoading = (state: RootState) => state.companies.mutations.changeLogo.isLoading;
export const selectChangeLogoError = (state: RootState) => state.companies.mutations.changeLogo.error;

export const selectRemoveMemberLoading = (state: RootState) => state.companies.mutations.removeMember.isLoading;
export const selectRemoveMemberError = (state: RootState) => state.companies.mutations.removeMember.error;

export const selectLeaveCompanyLoading = (state: RootState) => state.companies.mutations.leave.isLoading;
export const selectLeaveCompanyError = (state: RootState) => state.companies.mutations.leave.error;

export const selectPendingInvitationIdByCompany = (companyId: CompanyId) => (state: RootState) => {
  if (!companyId) return null;

  return (
    state.invitations.lists.userInvitations.data.find(invitation => {
      return invitation.status === 'pending' && String(invitation.company.id) === String(companyId);
    })?.id ?? null
  );
};
