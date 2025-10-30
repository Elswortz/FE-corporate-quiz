import { createAsyncThunk } from '@reduxjs/toolkit';
import * as companiesAPI from '../../api/companiesApi';
import { showNotification } from '../notification/slice';

export const fetchOwnedCompanies = createAsyncThunk(
  'companies/owned',
  async ({ page = 1, limit = 20 } = {}, { rejectWithValue }) => {
    try {
      const offset = (page - 1) * limit;
      const res = await companiesAPI.getMyOwnedCompanies({ limit, offset });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to load companies');
    }
  }
);

export const fetchJoinedCompanies = createAsyncThunk(
  'companies/joined',
  async ({ page = 1, limit = 20 } = {}, { rejectWithValue }) => {
    try {
      const offset = (page - 1) * limit;
      const res = await companiesAPI.getMyJoinedCompanies({ limit, offset });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to load companies');
    }
  }
);

export const fetchAllCompanies = createAsyncThunk(
  'companies/all',
  async ({ limit, offset } = {}, { rejectWithValue }) => {
    try {
      const res = await companiesAPI.getAllCompanies({ limit, offset });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to load all companies');
    }
  }
);

export const fetchCompanyById = createAsyncThunk('companies/fetchById', async (companyId, { rejectWithValue }) => {
  try {
    const res = await companiesAPI.getCompanyById(companyId);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || 'Company not found');
  }
});

export const createCompany = createAsyncThunk('companies/create', async (payload, { rejectWithValue, dispatch }) => {
  try {
    const res = await companiesAPI.createCompany(payload);
    dispatch(showNotification({ type: 'success', message: 'Company created successfully!' }));
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || 'Failed to create company');
  }
});

export const updateCompany = createAsyncThunk(
  'companies/update',
  async ({ companyId, data }, { rejectWithValue, dispatch }) => {
    try {
      const res = await companiesAPI.updateCompany(companyId, data);
      dispatch(showNotification({ type: 'success', message: 'Company updated successfully!' }));
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to update company');
    }
  }
);

export const deleteCompany = createAsyncThunk('companies/delete', async (companyId, { rejectWithValue, dispatch }) => {
  try {
    await companiesAPI.deleteCompany(companyId);
    dispatch(showNotification({ type: 'info', message: 'Company deleted.' }));
    return companyId;
  } catch (err) {
    return rejectWithValue(err.response?.data || 'Failed to delete company');
  }
});
