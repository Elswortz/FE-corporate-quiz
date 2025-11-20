import { createAsyncThunk } from '@reduxjs/toolkit';
import * as usersActionsApi from '../api/usersActionsApi';

export const fetchMyInvitations = createAsyncThunk(
  'users/actions/fetchMyInvitations',
  async (_, { rejectWithValue }) => {
    try {
      const res = await usersActionsApi.getMyInvitations();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load invitations');
    }
  }
);

export const acceptInvitation = createAsyncThunk(
  'users/actions/acceptInvitation',
  async (invitationId, { rejectWithValue }) => {
    try {
      const res = await usersActionsApi.acceptInvitation(invitationId);
      return { invitationId, data: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to accept invitation');
    }
  }
);

export const rejectInvitation = createAsyncThunk(
  'users/actions/rejectInvitation',
  async (invitationId, { rejectWithValue }) => {
    try {
      const res = await usersActionsApi.rejectInvitation(invitationId);
      return { invitationId, data: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to reject invitation');
    }
  }
);

export const cancelInvitation = createAsyncThunk(
  'users/actions/cancelInvitation',
  async (invitationId, { rejectWithValue }) => {
    try {
      const res = await usersActionsApi.cancelInvitation(invitationId);
      return { invitationId, data: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to cancel invitation');
    }
  }
);

export const requestMembership = createAsyncThunk(
  'users/actions/requestMembership',
  async (companyId, { rejectWithValue }) => {
    try {
      const res = await usersActionsApi.requestMembership(companyId);
      return { companyId, data: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to request membership');
    }
  }
);

export const leaveCompany = createAsyncThunk('users/actions/leaveCompany', async (companyId, { rejectWithValue }) => {
  try {
    const res = await usersActionsApi.leaveCompany(companyId);
    return { companyId, data: res.data };
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to leave company');
  }
});
