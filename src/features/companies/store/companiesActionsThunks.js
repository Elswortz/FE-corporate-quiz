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

export const inviteUser = createAsyncThunk('companies/actions/inviteUser', async (data, { rejectWithValue }) => {
  try {
    const res = await companiesActionsApi.inviteUser(data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to invite user');
  }
});

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

export const acceptRequest = createAsyncThunk(
  'companies/actions/acceptRequest',
  async (requestId, { rejectWithValue }) => {
    try {
      await companiesActionsApi.acceptRequest(requestId);
      return requestId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to accept request');
    }
  }
);

export const rejectRequest = createAsyncThunk(
  'companies/actions/rejectRequest',
  async (requestId, { rejectWithValue }) => {
    try {
      await companiesActionsApi.rejectRequest(requestId);
      return requestId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to reject request');
    }
  }
);
