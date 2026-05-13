import { Invitation, InvitationId, sendInvitationDto } from '../types/invitationsTypes';
import { CompanyId } from '@/features/companies/types/companiesTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as invitationsAPI from '@/features/invitations/api/invitationsApi';
import { RejectValue } from '@/shared/types/globalTypes';

// COMPANIES THUNKS

export const fetchCompanyInvitations = createAsyncThunk<Invitation[], CompanyId, { rejectValue: RejectValue }>(
  'invitations/fetchCompanyInvitations',
  async (companyId, { rejectWithValue }) => {
    try {
      const res = await invitationsAPI.getCompanyInvitations(companyId);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load invitations');
    }
  }
);

export const sendInvitation = createAsyncThunk<Invitation, sendInvitationDto, { rejectValue: RejectValue }>(
  'invitations/sendInvitation',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await invitationsAPI.sendInvitation(payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to invite user');
    }
  }
);

export const cancelInvitation = createAsyncThunk<InvitationId, InvitationId, { rejectValue: RejectValue }>(
  'invitations/cancelInvitation',
  async (invitationId, { rejectWithValue }) => {
    try {
      await invitationsAPI.cancelInvitation(invitationId);
      return invitationId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to cancel invitation');
    }
  }
);

export const acceptRequest = createAsyncThunk<InvitationId, InvitationId, { rejectValue: RejectValue }>(
  'invitations/acceptRequest',
  async (invitationId, { rejectWithValue }) => {
    try {
      await invitationsAPI.acceptRequest(invitationId);
      return invitationId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to accept request');
    }
  }
);

export const rejectRequest = createAsyncThunk<InvitationId, InvitationId, { rejectValue: RejectValue }>(
  'invitations/rejectRequest',
  async (invitationId, { rejectWithValue }) => {
    try {
      await invitationsAPI.rejectRequest(invitationId);
      return invitationId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to reject request');
    }
  }
);

// USER THUNKS

export const fetchUserInvitations = createAsyncThunk<Invitation[]>(
  'invitations/fetchUserInvitations',
  async (_, { rejectWithValue }) => {
    try {
      const res = await invitationsAPI.getUserInvitations();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load invitations');
    }
  }
);

export const acceptInvitation = createAsyncThunk<InvitationId, InvitationId, { rejectValue: RejectValue }>(
  'invitations/acceptInvitation',
  async (invitationId, { rejectWithValue }) => {
    try {
      await invitationsAPI.acceptInvitation(invitationId);
      return invitationId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to accept invitation');
    }
  }
);

export const rejectInvitation = createAsyncThunk<InvitationId, InvitationId, { rejectValue: RejectValue }>(
  'invitations/rejectInvitation',
  async (invitationId, { rejectWithValue }) => {
    try {
      await invitationsAPI.rejectInvitation(invitationId);
      return invitationId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to reject invitation');
    }
  }
);

export const cancelRequest = createAsyncThunk<InvitationId, InvitationId, { rejectValue: RejectValue }>(
  'invitations/cancelRequest',
  async (invitationId, { rejectWithValue }) => {
    try {
      await invitationsAPI.cancelRequest(invitationId);
      return invitationId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to cancel invitation');
    }
  }
);

export const sendRequest = createAsyncThunk<Invitation[], CompanyId, { rejectValue: RejectValue }>(
  'invitations/sendRequest',
  async (companyId, { rejectWithValue }) => {
    try {
      const res = await invitationsAPI.sendRequest(companyId);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to request membership');
    }
  }
);
