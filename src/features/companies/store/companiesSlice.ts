import { createSlice } from '@reduxjs/toolkit';
import companiesState from './companiesState';
import { CompaniesState } from './companiesState';
import { Company, CompanyId } from '../types/companiesTypes';
import {
  fetchAllCompanies,
  fetchJoinedCompanies,
  fetchOwnedCompanies,
  fetchCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  changeCompanyStatus,
  changeCompanyLogo,
  removeCompanyMember,
  leaveCompany,
} from './companiesThunks';
import {
  fetchCompanyInvitations,
  cancelInvitation,
  acceptRequest,
  rejectRequest,
  inviteUser,
} from './companiesActionsThunks';

const updateCompanyEverywhere = (state: CompaniesState, updated: Company) => {
  (['owned', 'joined'] as const).forEach(type => {
    state[type].data = state[type].data.map(comp => (comp.id === updated.id ? updated : comp));
  });

  if (updated.company_status === 'hidden') {
    state.all.data = state.all.data.filter(comp => comp.id !== updated.id);
  } else {
    const exists = state.all.data.some(comp => comp.id === updated.id);

    if (exists) {
      state.all.data = state.all.data.map(comp => (comp.id === updated.id ? updated : comp));
    } else {
      state.all.data.push(updated);
    }
  }

  if (state.selected.data && state.selected.data.id === updated.id) {
    state.selected.data = {
      ...state.selected.data,
      ...updated,
    };
  }
};

const removeCompanyEverywhere = (state: CompaniesState, deletedId: CompanyId) => {
  (['owned', 'all', 'joined'] as const).forEach(type => {
    state[type].data = state[type].data.filter(comp => comp.id !== deletedId);
  });
  if (state.selected.data?.id === deletedId) {
    state.selected.data = null;
  }
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState: companiesState,
  reducers: {
    clearCurrentCompany: state => {
      state.selected.data = null;
      state.selected.error = null;
      state.selected.isLoading = false;
    },
  },
  extraReducers: builder =>
    builder
      // --- fetchAllCompanies ---
      .addCase(fetchAllCompanies.pending, state => {
        state.all.isLoading = true;
        state.all.error = null;
      })
      .addCase(fetchAllCompanies.fulfilled, (state, { payload }) => {
        state.all.isLoading = false;
        state.all.data = payload;
      })
      .addCase(fetchAllCompanies.rejected, (state, { payload }) => {
        state.all.isLoading = false;
        state.all.error = payload ?? null;
      })
      // --- fetchJoinedCompanies ---
      .addCase(fetchJoinedCompanies.pending, state => {
        state.joined.isLoading = true;
        state.joined.error = null;
      })
      .addCase(fetchJoinedCompanies.fulfilled, (state, { payload }) => {
        state.joined.isLoading = false;
        state.joined.data = payload;
      })
      .addCase(fetchJoinedCompanies.rejected, (state, { payload }) => {
        state.joined.isLoading = false;
        state.joined.error = payload ?? null;
      })
      // --- fetchOwnedCompanies ---
      .addCase(fetchOwnedCompanies.pending, state => {
        state.owned.isLoading = true;
        state.owned.error = null;
      })
      .addCase(fetchOwnedCompanies.fulfilled, (state, { payload }) => {
        state.owned.isLoading = false;
        state.owned.data = payload;
      })
      .addCase(fetchOwnedCompanies.rejected, (state, { payload }) => {
        state.owned.isLoading = false;
        state.owned.error = payload ?? null;
      })
      // --- fetchCompaniesById ---
      .addCase(fetchCompanyById.pending, state => {
        state.selected.isLoading = true;
        state.selected.error = null;
      })
      .addCase(fetchCompanyById.fulfilled, (state, { payload }) => {
        state.selected.isLoading = false;
        state.selected.data = payload;
      })
      .addCase(fetchCompanyById.rejected, (state, { payload }) => {
        state.selected.isLoading = false;
        state.selected.error = payload ?? null;
      })
      // --- createCompany ---
      .addCase(createCompany.pending, state => {
        state.operations.create.isLoading = true;
        state.operations.create.error = null;
      })
      .addCase(createCompany.fulfilled, (state, { payload }) => {
        state.operations.create.isLoading = false;
        state.owned.data.push(payload);
        if (payload.company_status === 'visible') state.all.data.push(payload);
      })
      .addCase(createCompany.rejected, (state, { payload }) => {
        state.operations.create.isLoading = false;
        state.operations.create.error = payload ?? null;
      })
      // --- updateCompany ---
      .addCase(updateCompany.pending, state => {
        state.operations.update.isLoading = true;
        state.operations.update.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, { payload }) => {
        state.operations.update.isLoading = false;
        updateCompanyEverywhere(state, payload);
      })
      .addCase(updateCompany.rejected, (state, { payload }) => {
        state.operations.update.isLoading = false;
        state.operations.update.error = payload ?? null;
      })
      // --- deleteCompany ---
      .addCase(deleteCompany.pending, state => {
        state.operations.delete.isLoading = true;
        state.operations.delete.error = null;
      })
      .addCase(deleteCompany.fulfilled, (state, { payload }) => {
        state.operations.delete.isLoading = false;
        removeCompanyEverywhere(state, payload);
      })
      .addCase(deleteCompany.rejected, (state, { payload }) => {
        state.operations.delete.isLoading = false;
        state.operations.delete.error = payload ?? null;
      })
      // --- changeCompanyStatus ---
      .addCase(changeCompanyStatus.pending, state => {
        state.operations.changeStatus.isLoading = true;
        state.operations.changeStatus.error = null;
      })
      .addCase(changeCompanyStatus.fulfilled, (state, { payload }) => {
        state.operations.changeStatus.isLoading = false;
        updateCompanyEverywhere(state, payload);
      })
      .addCase(changeCompanyStatus.rejected, (state, { payload }) => {
        state.operations.changeStatus.isLoading = false;
        state.operations.changeStatus.error = payload ?? null;
      })
      // --- changeCompanyLogo ---
      .addCase(changeCompanyLogo.pending, state => {
        state.operations.changeLogo.isLoading = true;
        state.operations.changeLogo.error = null;
      })
      .addCase(changeCompanyLogo.fulfilled, (state, { payload }) => {
        state.operations.changeLogo.isLoading = false;
        updateCompanyEverywhere(state, payload);
      })
      .addCase(changeCompanyLogo.rejected, (state, { payload }) => {
        state.operations.changeLogo.isLoading = false;
        state.operations.changeLogo.error = payload ?? null;
      })
      // --- removeCompanyMember ---
      .addCase(removeCompanyMember.pending, state => {
        state.operations.removeMember.isLoading = true;
        state.operations.removeMember.error = null;
      })
      .addCase(removeCompanyMember.fulfilled, (state, { payload }) => {
        state.operations.removeMember.isLoading = false;
        if (state.selected.data) {
          state.selected.data.members = state.selected.data.members.filter(m => m.id !== payload);
        }
      })
      .addCase(removeCompanyMember.rejected, (state, { payload }) => {
        state.operations.removeMember.isLoading = false;
        state.operations.removeMember.error = payload ?? null;
      })
      // --- fetchCompanyInvitations ---
      .addCase(fetchCompanyInvitations.pending, state => {
        state.invitations.isLoading = true;
        state.invitations.error = null;
      })
      .addCase(fetchCompanyInvitations.fulfilled, (state, { payload }) => {
        state.invitations.data = payload.filter(i => i.status === 'pending');
        state.invitations.isLoading = false;
      })
      .addCase(fetchCompanyInvitations.rejected, (state, { payload }) => {
        state.invitations.error = payload ?? null;
        state.invitations.isLoading = false;
      })
      // --- inviteUser ---
      .addCase(inviteUser.pending, state => {
        state.invitations.actions.invite.error = null;
        state.invitations.actions.invite.isLoading = true;
      })
      .addCase(inviteUser.fulfilled, (state, { payload }) => {
        state.invitations.data.push(payload);
        state.invitations.actions.invite.isLoading = false;
      })
      .addCase(inviteUser.rejected, (state, { payload }) => {
        state.invitations.actions.invite.error = payload ?? null;
        state.invitations.actions.invite.isLoading = false;
      })
      // --- acceptRequest ---
      .addCase(acceptRequest.pending, state => {
        state.invitations.actions.accept.isLoading = true;
        state.invitations.actions.accept.error = null;
      })
      .addCase(acceptRequest.fulfilled, (state, { payload }) => {
        state.invitations.data = state.invitations.data.filter(i => i.id !== payload);
        state.invitations.actions.accept.isLoading = false;
      })
      .addCase(acceptRequest.rejected, (state, { payload }) => {
        state.invitations.actions.accept.isLoading = false;
        state.invitations.actions.accept.error = payload ?? null;
      })
      // --- rejectRequest ---
      .addCase(rejectRequest.pending, state => {
        state.invitations.actions.reject.isLoading = true;
        state.invitations.actions.reject.error = null;
      })
      .addCase(rejectRequest.fulfilled, (state, { payload }) => {
        state.invitations.data = state.invitations.data.filter(i => i.id !== payload);
        state.invitations.actions.reject.isLoading = false;
      })
      .addCase(rejectRequest.rejected, (state, { payload }) => {
        state.invitations.actions.reject.isLoading = false;
        state.invitations.actions.reject.error = payload ?? null;
      })
      // --- cancelInvitation ---
      .addCase(cancelInvitation.pending, state => {
        state.invitations.actions.cancel.isLoading = true;
        state.invitations.actions.cancel.error = null;
      })
      .addCase(cancelInvitation.fulfilled, (state, { payload }) => {
        state.invitations.data = state.invitations.data.filter(i => i.id !== payload);
        state.invitations.isLoading = false;
      })
      .addCase(cancelInvitation.rejected, (state, { payload }) => {
        state.invitations.actions.cancel.error = payload ?? null;
        state.invitations.actions.cancel.isLoading = false;
      })
      // --- leaveCompany ---
      .addCase(leaveCompany.pending, state => {
        state.operations.leave.isLoading = true;
        state.operations.leave.error = null;
      })
      .addCase(leaveCompany.fulfilled, (state, { payload }) => {
        state.joined.data = state.joined.data.filter(c => c.id !== payload);
        state.operations.leave.isLoading = false;
      })
      .addCase(leaveCompany.rejected, (state, { payload }) => {
        state.operations.leave.error = payload ?? null;
        state.operations.leave.isLoading = false;
      }),
});

export const { clearCurrentCompany } = companiesSlice.actions;
export const companiesReducer = companiesSlice.reducer;
