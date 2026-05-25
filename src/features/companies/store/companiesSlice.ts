import { createSlice } from '@reduxjs/toolkit';
import companiesState from './companiesState';
import { CompaniesState } from '../types/companiesStateTypes';
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

const updateCompanyEverywhere = (state: CompaniesState, updated: Company) => {
  (['owned', 'joined'] as const).forEach(type => {
    state.lists[type].data = state.lists[type].data.map(comp => (comp.id === updated.id ? updated : comp));
  });

  if (updated.company_status === 'hidden') {
    state.lists.all.data = state.lists.all.data.filter(comp => comp.id !== updated.id);
  } else {
    const exists = state.lists.all.data.some(comp => comp.id === updated.id);

    if (exists) {
      state.lists.all.data = state.lists.all.data.map(comp => (comp.id === updated.id ? updated : comp));
    } else {
      state.lists.all.data.push(updated);
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
    state.lists[type].data = state.lists[type].data.filter(comp => comp.id !== deletedId);
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
        state.lists.all.isLoading = true;
        state.lists.all.error = null;
      })
      .addCase(fetchAllCompanies.fulfilled, (state, { payload }) => {
        state.lists.all.isLoading = false;
        state.lists.all.data = payload.items;
        state.lists.all.meta = payload.meta;
      })
      .addCase(fetchAllCompanies.rejected, (state, { payload }) => {
        state.lists.all.isLoading = false;
        state.lists.all.error = payload ?? null;
      })
      // --- fetchJoinedCompanies ---
      .addCase(fetchJoinedCompanies.pending, state => {
        state.lists.joined.isLoading = true;
        state.lists.joined.error = null;
      })
      .addCase(fetchJoinedCompanies.fulfilled, (state, { payload }) => {
        state.lists.joined.isLoading = false;
        state.lists.joined.data = payload.items;
        state.lists.joined.meta = payload.meta;
      })
      .addCase(fetchJoinedCompanies.rejected, (state, { payload }) => {
        state.lists.joined.isLoading = false;
        state.lists.joined.error = payload ?? null;
      })
      // --- fetchOwnedCompanies ---
      .addCase(fetchOwnedCompanies.pending, state => {
        state.lists.owned.isLoading = true;
        state.lists.owned.error = null;
      })
      .addCase(fetchOwnedCompanies.fulfilled, (state, { payload }) => {
        state.lists.owned.isLoading = false;
        state.lists.owned.data = payload.items;
        state.lists.owned.meta = payload.meta;
      })
      .addCase(fetchOwnedCompanies.rejected, (state, { payload }) => {
        state.lists.owned.isLoading = false;
        state.lists.owned.error = payload ?? null;
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
        state.mutations.create.isLoading = true;
        state.mutations.create.error = null;
      })
      .addCase(createCompany.fulfilled, (state, { payload }) => {
        state.mutations.create.isLoading = false;
        state.lists.owned.data.push(payload);
        if (payload.company_status === 'visible') state.lists.all.data.push(payload);
      })
      .addCase(createCompany.rejected, (state, { payload }) => {
        state.mutations.create.isLoading = false;
        state.mutations.create.error = payload ?? null;
      })
      // --- updateCompany ---
      .addCase(updateCompany.pending, state => {
        state.mutations.update.isLoading = true;
        state.mutations.update.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, { payload }) => {
        state.mutations.update.isLoading = false;
        updateCompanyEverywhere(state, payload);
      })
      .addCase(updateCompany.rejected, (state, { payload }) => {
        state.mutations.update.isLoading = false;
        state.mutations.update.error = payload ?? null;
      })
      // --- deleteCompany ---
      .addCase(deleteCompany.pending, state => {
        state.mutations.delete.isLoading = true;
        state.mutations.delete.error = null;
      })
      .addCase(deleteCompany.fulfilled, (state, { payload }) => {
        state.mutations.delete.isLoading = false;
        removeCompanyEverywhere(state, payload);
      })
      .addCase(deleteCompany.rejected, (state, { payload }) => {
        state.mutations.delete.isLoading = false;
        state.mutations.delete.error = payload ?? null;
      })
      // --- changeCompanyStatus ---
      .addCase(changeCompanyStatus.pending, state => {
        state.mutations.changeStatus.isLoading = true;
        state.mutations.changeStatus.error = null;
      })
      .addCase(changeCompanyStatus.fulfilled, (state, { payload }) => {
        state.mutations.changeStatus.isLoading = false;
        updateCompanyEverywhere(state, payload);
      })
      .addCase(changeCompanyStatus.rejected, (state, { payload }) => {
        state.mutations.changeStatus.isLoading = false;
        state.mutations.changeStatus.error = payload ?? null;
      })
      // --- changeCompanyLogo ---
      .addCase(changeCompanyLogo.pending, state => {
        state.mutations.changeLogo.isLoading = true;
        state.mutations.changeLogo.error = null;
      })
      .addCase(changeCompanyLogo.fulfilled, (state, { payload }) => {
        state.mutations.changeLogo.isLoading = false;
        updateCompanyEverywhere(state, payload);
      })
      .addCase(changeCompanyLogo.rejected, (state, { payload }) => {
        state.mutations.changeLogo.isLoading = false;
        state.mutations.changeLogo.error = payload ?? null;
      })
      // --- removeCompanyMember ---
      .addCase(removeCompanyMember.pending, state => {
        state.mutations.removeMember.isLoading = true;
        state.mutations.removeMember.error = null;
      })
      .addCase(removeCompanyMember.fulfilled, (state, { payload }) => {
        state.mutations.removeMember.isLoading = false;
        if (state.selected.data) {
          state.selected.data.members = state.selected.data.members.filter(m => m.id !== payload);
        }
      })
      .addCase(removeCompanyMember.rejected, (state, { payload }) => {
        state.mutations.removeMember.isLoading = false;
        state.mutations.removeMember.error = payload ?? null;
      })

      // --- leaveCompany ---
      .addCase(leaveCompany.pending, state => {
        state.mutations.leave.isLoading = true;
        state.mutations.leave.error = null;
      })
      .addCase(leaveCompany.fulfilled, (state, { payload }) => {
        state.lists.joined.data = state.lists.joined.data.filter(c => c.id !== payload);
        state.mutations.leave.isLoading = false;
      })
      .addCase(leaveCompany.rejected, (state, { payload }) => {
        state.mutations.leave.error = payload ?? null;
        state.mutations.leave.isLoading = false;
      }),
});

export const { clearCurrentCompany } = companiesSlice.actions;
export const companiesReducer = companiesSlice.reducer;
