import { createSlice } from '@reduxjs/toolkit';
import companiesState from './companiesState';
import {
  fetchCompanies,
  fetchCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  changeCompanyStatus,
  changeCompanyLogo,
  removeCompanyMember,
} from './companiesThunks';

const updateCompanyEverywhere = (state, updated) => {
  ['owned', 'joined'].forEach(type => {
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

  if (state.selected.data?.id === updated.id) {
    state.selected.data = updated;
  }
};

const removeCompanyEverywhere = (state, deletedId) => {
  ['owned', 'all', 'joined'].forEach(type => {
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
      // --- fetchCompanies ---
      .addCase(fetchCompanies.pending, (state, { meta }) => {
        const { type } = meta.arg;
        state[type].isLoading = true;
        state[type].error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, { meta, payload }) => {
        const { type } = meta.arg;
        state[type].isLoading = false;
        state[type].data = payload.items;
        state[type].meta = payload.meta;
      })
      .addCase(fetchCompanies.rejected, (state, { meta, payload }) => {
        const { type } = meta.arg;
        state[type].isLoading = false;
        state[type].error = payload;
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
        state.selected.error = payload;
      })
      // --- createCompany ---
      .addCase(createCompany.pending, state => {
        state.operations.createCompany.isLoading = true;
        state.operations.createCompany.error = null;
      })
      .addCase(createCompany.fulfilled, (state, { payload }) => {
        state.operations.createCompany.isLoading = false;
        state.owned.data.push(payload);
        if (payload.company_status === 'visible') state.all.data.push(payload);
      })
      .addCase(createCompany.rejected, (state, { payload }) => {
        state.operations.createCompany.isLoading = false;
        state.operations.createCompany.error = payload;
      })
      // --- updateCompany ---
      .addCase(updateCompany.pending, state => {
        state.operations.updateCompany.isLoading = true;
        state.operations.updateCompany.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, { payload }) => {
        state.operations.updateCompany.isLoading = false;
        updateCompanyEverywhere(state, payload);
      })
      .addCase(updateCompany.rejected, (state, { payload }) => {
        state.operations.updateCompany.isLoading = false;
        state.operations.updateCompany.error = payload;
      })
      // --- deleteCompany ---
      .addCase(deleteCompany.pending, state => {
        state.operations.deleteCompany.isLoading = true;
        state.operations.deleteCompany.error = null;
      })
      .addCase(deleteCompany.fulfilled, (state, { payload }) => {
        state.operations.deleteCompany.isLoading = false;
        removeCompanyEverywhere(state, payload);
      })
      .addCase(deleteCompany.rejected, (state, { payload }) => {
        state.operations.deleteCompany.isLoading = false;
        state.operations.deleteCompany.error = payload;
      })
      // --- changeCompanyStatus ---
      .addCase(changeCompanyStatus.pending, state => {
        state.operations.changeCompanyStatus.isLoading = true;
        state.operations.changeCompanyStatus.error = null;
      })
      .addCase(changeCompanyStatus.fulfilled, (state, { payload }) => {
        state.operations.changeCompanyStatus.isLoading = false;
        updateCompanyEverywhere(state, payload);
      })
      .addCase(changeCompanyStatus.rejected, (state, { payload }) => {
        state.operations.changeCompanyStatus.isLoading = false;
        state.operations.changeCompanyStatus.error = payload;
      })
      // --- changeCompanyLogo ---
      .addCase(changeCompanyLogo.pending, state => {
        state.operations.changeCompanyLogo.isLoading = true;
        state.operations.changeCompanyLogo.error = null;
      })
      .addCase(changeCompanyLogo.fulfilled, (state, { payload }) => {
        state.operations.changeCompanyLogo.isLoading = false;
        updateCompanyEverywhere(state, payload);
      })
      .addCase(changeCompanyLogo.rejected, (state, { payload }) => {
        state.operations.changeCompanyLogo.isLoading = false;
        state.operations.changeCompanyLogo.error = payload;
      })
      // --- removeCompanyMember ---
      .addCase(removeCompanyMember.pending, state => {
        state.operations.removeCompanyMember.isLoading = true;
        state.operations.removeCompanyMember.error = null;
      })
      .addCase(removeCompanyMember.fulfilled, (state, { payload }) => {
        state.operations.removeCompanyMember.isLoading = false;
        state.selected.data.members = state.selected.data.members.filter(m => m.id !== payload);
      })
      .addCase(removeCompanyMember.rejected, (state, { payload }) => {
        state.operations.removeCompanyMember.isLoading = false;
        state.operations.removeCompanyMember.error = payload;
      }),
});

export const { clearCurrentCompany } = companiesSlice.actions;
export const companiesReducer = companiesSlice.reducer;
