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
} from './companiesThunks';

const handleSuccessUpdate = (state, { payload }) => {};

const companiesSlice = createSlice({
  name: 'companies',
  initialState: companiesState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchCompanies.pending, (state, action) => {
        const { type } = action.meta.arg;
        state[type].isLoading = true;
        state[type].error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        const { type } = action.meta.arg;
        state[type].isLoading = false;
        state[type].data = action.payload.items;
        state[type].meta = action.payload.meta;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        const { type } = action.meta.arg;
        state[type].isLoading = false;
        state[type].error = payload;
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
        state.operations.createCompany.isLoading = true;
        state.operations.createCompany.error = null;
      })
      .addCase(createCompany.fulfilled, (state, { payload }) => {
        state.operations.createCompany.isLoading = false;
        state.owned.data.push(payload);
        state.all.data.push(payload);
      })
      .addCase(createCompany.rejected, (state, { payload }) => {
        state.operations.createCompany.isLoading = false;
        state.operations.createCompany.error = payload;
      })
      .addCase(updateCompany.pending, state => {
        state.operations.updateCompany.isLoading = true;
        state.operations.updateCompany.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, { payload }) => {
        state.operations.updateCompany.isLoading = false;
        const updated = payload;
        state.owned.data = state.owned.data.map(comp => (comp.id === updated.id ? updated : comp));
        state.all.data = state.all.data.map(comp => (comp.id === updated.id ? updated : comp));
        state.joined.data = state.joined.data.map(comp => (comp.id === updated.id ? updated : comp));
        if (state.selected.data?.id === updated.id) {
          state.selected.data = updated;
        }
      })
      .addCase(updateCompany.rejected, (state, { payload }) => {
        state.operations.updateCompany.isLoading = false;
        state.operations.updateCompany.error = payload;
      })
      .addCase(deleteCompany.pending, state => {
        state.operations.deleteCompany.isLoading = true;
        state.operations.deleteCompany.error = null;
      })
      .addCase(deleteCompany.fulfilled, (state, { payload }) => {
        state.operations.deleteCompany.isLoading = false;
        const deletedId = payload;
        state.owned.data = state.owned.data.filter(comp => comp.id !== deletedId);
        state.all.data = state.all.data.filter(comp => comp.id !== deletedId);
        state.joined.data = state.joined.data.filter(comp => comp.id !== deletedId);
        if (state.selected.data?.id === deletedId) {
          state.selected.data = null;
        }
      })
      .addCase(deleteCompany.rejected, (state, { payload }) => {
        state.operations.deleteCompany.isLoading = false;
        state.operations.deleteCompany.error = payload;
      })
      .addCase(changeCompanyStatus.pending, (state, { payload }) => {
        state.operations.changeCompanyStatus.isLoading = true;
        state.operations.changeCompanyStatus.error = null;
      })
      .addCase(changeCompanyStatus.fulfilled, (state, { payload }) => {
        state.operations.changeCompanyStatus.isLoading = false;
        const updated = payload;
        state.owned.data = state.owned.data.map(comp => (comp.id === updated.id ? updated : comp));
        state.all.data = state.all.data.map(comp => (comp.id === updated.id ? updated : comp));
        state.joined.data = state.joined.data.map(comp => (comp.id === updated.id ? updated : comp));
        if (state.selected.data?.id === updated.id) {
          state.selected.data = updated;
        }
      })
      .addCase(changeCompanyStatus.rejected, (state, { payload }) => {
        state.operations.changeCompanyStatus.isLoading = false;
        state.operations.changeCompanyStatus.error = payload;
      })
      .addCase(changeCompanyLogo.pending, (state, { payload }) => {
        state.operations.changeCompanyLogo.isLoading = true;
        state.operations.changeCompanyLogo.error = null;
      })
      .addCase(changeCompanyLogo.fulfilled, (state, { payload }) => {
        state.operations.changeCompanyLogo.isLoading = false;
        const updated = payload;
        state.owned.data = state.owned.data.map(comp => (comp.id === updated.id ? updated : comp));
        state.all.data = state.all.data.map(comp => (comp.id === updated.id ? updated : comp));
        state.joined.data = state.joined.data.map(comp => (comp.id === updated.id ? updated : comp));
        if (state.selected.data?.id === updated.id) {
          state.selected.data = updated;
        }
      })
      .addCase(changeCompanyLogo.rejected, (state, { payload }) => {
        state.operations.changeCompanyLogo.isLoading = false;
        state.operations.changeCompanyLogo.error = payload;
      }),
});

export const { clearCurrentCompany, setPage } = companiesSlice.actions;
export const companiesReducer = companiesSlice.reducer;
