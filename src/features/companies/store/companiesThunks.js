import { createAsyncThunk } from '@reduxjs/toolkit';
import * as companiesAPI from '../api/companiesApi';
import { showNotification } from '../../notifications/store/notificationsSlice';

export const fetchCompanies = createAsyncThunk(
  'companies/fetch',
  async ({ type = 'all', page = 1, limit = 20 } = {}, { rejectWithValue }) => {
    try {
      const offset = (page - 1) * limit;

      let res;
      switch (type) {
        case 'owned':
          res = await companiesAPI.getMyOwnedCompanies({ limit, offset });
          break;
        case 'joined':
          res = await companiesAPI.getMyJoinedCompanies({ limit, offset });
          break;
        default:
          res = await companiesAPI.getAllCompanies({ limit, offset });
          break;
      }

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load companies');
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

export const changeCompanyStatus = createAsyncThunk(
  'companies/changeStatus',
  async ({ companyId, status }, { rejectWithValue, dispatch }) => {
    try {
      const res = await companiesAPI.changeCompanyStatus(companyId, status);
      dispatch(showNotification({ type: 'info', message: `Your company status is ${res.data.company_status} now` }));
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to change company status');
    }
  }
);

export const changeCompanyLogo = createAsyncThunk(
  'companies/changeLogo',
  async ({ companyId, logoFile }, { dispatch, rejectWithValue }) => {
    try {
      const res = await companiesAPI.changeCompanyLogo(companyId, logoFile);
      dispatch(showNotification({ message: 'Company logo updated successfully', severity: 'success' }));
      return res.data;
    } catch (err) {
      dispatch(
        showNotification({ message: err.response?.data?.message || 'Failed to update company logo', severity: 'error' })
      );
      return rejectWithValue(err.response?.data?.message || 'Failed to update company logo');
    }
  }
);

export const removeCompanyMember = createAsyncThunk(
  'companies/removeMember',
  async ({ companyId, userId }, { rejectWithValue }) => {
    try {
      await companiesAPI.removeCompanyMember(companyId, userId);
      return userId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to remove member');
    }
  }
);
