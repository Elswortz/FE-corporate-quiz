import { createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';
import {
  fetchMyCompanies,
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
  },
  extraReducers: builder =>
    builder
      .addCase(fetchMyCompanies.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyCompanies.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.myCompanies = payload.items;
      })
      .addCase(fetchMyCompanies.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(fetchAllCompanies.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCompanies.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.allCompanies = payload.items;
      })
      .addCase(fetchAllCompanies.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(fetchCompanyById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCompanyById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.selectedCompany = payload;
      })
      .addCase(fetchCompanyById.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(createCompany.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCompany.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.myCompanies.push(payload);
      })
      .addCase(createCompany.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(updateCompany.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const updated = payload;
        state.myCompanies = state.myCompanies.map(comp => (comp.id === updated.id ? updated : comp));
        if (state.selectedCompany?.id === updated.id) {
          state.selectedCompany = updated;
        }
      })
      .addCase(updateCompany.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(deleteCompany.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCompany.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const deletedId = payload;
        state.myCompanies = state.myCompanies.filter(comp => comp.id !== deletedId);
        if (state.currentCompany?.id === deletedId) {
          state.currentCompany = null;
        }
      })
      .addCase(deleteCompany.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      }),
});

export const { clearCurrentCompany } = companiesSlice.actions;
export const companiesReducer = companiesSlice.reducer;
