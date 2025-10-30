import { createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';
import {
  fetchOwnedCompanies,
  fetchJoinedCompanies,
  fetchAllCompanies,
  fetchCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} from './operations';

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    clearSelectedCompany(state) {
      state.selectedCompany = null;
    },
    setPage(state, action) {
      state.pagination.page = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchOwnedCompanies.pending, state => {
        state.owned.isLoading = true;
        state.owned.error = null;
      })
      .addCase(fetchOwnedCompanies.fulfilled, (state, { payload }) => {
        state.owned.isLoading = false;
        state.owned.data = payload.items;
        state.owned.meta = payload.meta;
      })
      .addCase(fetchOwnedCompanies.rejected, (state, { payload }) => {
        state.owned.isLoading = false;
        state.owned.error = payload;
      })
      .addCase(fetchJoinedCompanies.pending, state => {
        state.joined.isLoading = true;
        state.joined.error = null;
      })
      .addCase(fetchJoinedCompanies.fulfilled, (state, { payload }) => {
        state.joined.isLoading = false;
        state.joined.data = payload.items;
        state.joined.meta = payload.meta;
      })
      .addCase(fetchJoinedCompanies.rejected, (state, { payload }) => {
        state.joined.isLoading = false;
        state.joined.error = payload;
      })
      .addCase(fetchAllCompanies.pending, state => {
        state.all.isLoading = true;
        state.all.error = null;
      })
      .addCase(fetchAllCompanies.fulfilled, (state, { payload }) => {
        state.all.isLoading = false;
        state.all.data = payload.items;
        state.all.meta = payload.meta;
      })
      .addCase(fetchAllCompanies.rejected, (state, { payload }) => {
        state.all.isLoading = false;
        state.all.error = payload;
      })
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
      .addCase(createCompany.pending, state => {
        state.create.isLoading = true;
        state.create.error = null;
      })
      .addCase(createCompany.fulfilled, (state, { payload }) => {
        state.create.isLoading = false;
        state.owned.data.push(payload);
        state.all.data.push(payload);
      })
      .addCase(createCompany.rejected, (state, { payload }) => {
        state.create.isLoading = false;
        state.create.error = payload;
      })
      .addCase(updateCompany.pending, state => {
        state.update.isLoading = true;
        state.update.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, { payload }) => {
        state.update.isLoading = false;
        const updated = payload;
        state.owned.data = state.owned.data.map(comp => (comp.id === updated.id ? updated : comp));
        state.all.data = state.all.data.map(comp => (comp.id === updated.id ? updated : comp));
        if (state.selected.data?.id === updated.id) {
          state.selected.data = updated;
        }
      })
      .addCase(updateCompany.rejected, (state, { payload }) => {
        state.update.isLoading = false;
        state.update.error = payload;
      })
      .addCase(deleteCompany.pending, state => {
        state.delete.isLoading = true;
        state.delete.error = null;
      })
      .addCase(deleteCompany.fulfilled, (state, { payload }) => {
        state.delete.isLoading = false;
        const deletedId = payload;
        state.owned.data = state.owned.data.filter(comp => comp.id !== deletedId);
        state.all.data = state.all.data.filter(comp => comp.id !== deletedId);
        if (state.selected.data?.id === deletedId) {
          state.selected.data = null;
        }
      })
      .addCase(deleteCompany.rejected, (state, { payload }) => {
        state.delete.isLoading = false;
        state.delete.error = payload;
      }),
});

export const { clearCurrentCompany, setPage } = companiesSlice.actions;
export const companiesReducer = companiesSlice.reducer;
