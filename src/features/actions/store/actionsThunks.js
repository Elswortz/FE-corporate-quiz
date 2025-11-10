import { createAsyncThunk } from '@reduxjs/toolkit';
import * as actionsApi from '../api/actionsApi';

export const fetchMyInvitations = createAsyncThunk('actions/fetchMyInvitations', async (_, { rejectWithValue }) => {
  try {
    const res = await actionsApi.getMyInvitations();
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to load invitations');
  }
});

export const acceptInvitation = createAsyncThunk(
  'actions/acceptInvitation',
  async (invitationId, { rejectWithValue }) => {
    try {
      const res = await actionsApi.acceptInvitation(invitationId);

      //   dispatch(fetchMyInvitations());

      return { invitationId, data: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to accept invitation');
    }
  }
);

export const declineInvitation = createAsyncThunk(
  'actions/declineInvitation',
  async (invitationId, { dispatch, rejectWithValue }) => {
    try {
      const res = await actionsApi.declineInvitation(invitationId);

      // dispatch(fetchMyInvitations());

      return { invitationId, data: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to decline invitation');
    }
  }
);
