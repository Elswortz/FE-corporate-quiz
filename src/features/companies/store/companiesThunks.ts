import { createAsyncThunk } from '@reduxjs/toolkit';
import * as companiesAPI from '../api/companiesApi';

import {
  Company,
  CompanyId,
  Pagination,
  CreateCompanyDto,
  UpdateCompanyDto,
  ChangeCompanyStatusDto,
  ChangeCompanyLogoDto,
  RemoveCompanyMemberDto,
} from '../types/companiesTypes';

import { UserId } from '../../users/types/userTypes';

type RejectValue = string;

export const fetchAllCompanies = createAsyncThunk<Company[], Pagination, { rejectValue: RejectValue }>(
  'companies/fetch',
  async ({ limit, offset }, { rejectWithValue }) => {
    try {
      const res = await companiesAPI.getAllCompanies({ limit, offset });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load companies');
    }
  }
);

export const fetchJoinedCompanies = createAsyncThunk<Company[], Pagination, { rejectValue: RejectValue }>(
  'companies/fetch',
  async ({ limit, offset }, { rejectWithValue }) => {
    try {
      const res = await companiesAPI.getMyJoinedCompanies({ limit, offset });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load companies');
    }
  }
);

export const fetchOwnedCompanies = createAsyncThunk<Company[], Pagination, { rejectValue: RejectValue }>(
  'companies/fetch',
  async ({ limit, offset }, { rejectWithValue }) => {
    try {
      const res = await companiesAPI.getMyOwnedCompanies({ limit, offset });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load companies');
    }
  }
);

export const fetchCompanyById = createAsyncThunk<Company, CompanyId, { rejectValue: RejectValue }>(
  'companies/fetchById',
  async (companyId, { rejectWithValue }) => {
    try {
      const res = await companiesAPI.getCompanyById(companyId);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Company not found');
    }
  }
);

export const createCompany = createAsyncThunk<Company, CreateCompanyDto, { rejectValue: RejectValue }>(
  'companies/create',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await companiesAPI.createCompany(payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create company');
    }
  }
);

export const updateCompany = createAsyncThunk<Company, UpdateCompanyDto, { rejectValue: RejectValue }>(
  'companies/update',
  async ({ companyId, data }, { rejectWithValue }) => {
    try {
      const res = await companiesAPI.updateCompany({ companyId, data });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update company');
    }
  }
);

export const deleteCompany = createAsyncThunk<CompanyId, CompanyId, { rejectValue: RejectValue }>(
  'companies/delete',
  async (companyId, { rejectWithValue }) => {
    try {
      await companiesAPI.deleteCompany(companyId);
      return companyId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete company');
    }
  }
);

export const changeCompanyStatus = createAsyncThunk<Company, ChangeCompanyStatusDto, { rejectValue: RejectValue }>(
  'companies/changeStatus',
  async ({ companyId, status }, { rejectWithValue }) => {
    try {
      const res = await companiesAPI.changeCompanyStatus({ companyId, status });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to change company status');
    }
  }
);

export const changeCompanyLogo = createAsyncThunk<Company, ChangeCompanyLogoDto, { rejectValue: RejectValue }>(
  'companies/changeLogo',
  async ({ companyId, file }, { rejectWithValue }) => {
    try {
      const res = await companiesAPI.changeCompanyLogo({ companyId, file });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update company logo');
    }
  }
);

export const removeCompanyMember = createAsyncThunk<UserId, RemoveCompanyMemberDto, { rejectValue: RejectValue }>(
  'companies/removeMember',
  async ({ companyId, userId }, { rejectWithValue }) => {
    try {
      await companiesAPI.removeCompanyMember({ companyId, userId });
      return userId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to remove member');
    }
  }
);

export const leaveCompany = createAsyncThunk<CompanyId, CompanyId, { rejectValue: RejectValue }>(
  'companies/leaveCompany',
  async (companyId, { rejectWithValue }) => {
    try {
      await companiesAPI.leaveCompany(companyId);
      return companyId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to leave company');
    }
  }
);
