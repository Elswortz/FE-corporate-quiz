import { createAsyncThunk } from '@reduxjs/toolkit';
import * as companiesActionsApi from '../api/companiesActionsApi';

export const fetchCompanyInvitations = createAsyncThunk(
  'companies/fetchInvitations',
  async (companyId, { rejectWithValue }) => {
    try {
      const res = await companiesActionsApi.getCompanyInvitations(companyId);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load invitations');
    }
  }
);

export const cancelInvitation = createAsyncThunk(
  'companies/actions/cancelInvitation',
  async (invitationId, { rejectWithValue }) => {
    try {
      await companiesActionsApi.cancelInvitation(invitationId);
      return invitationId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to cancel invitation');
    }
  }
);
