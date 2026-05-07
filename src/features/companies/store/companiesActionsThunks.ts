import { createAsyncThunk } from '@reduxjs/toolkit';
import * as companiesActionsApi from '../api/companiesActionsApi';
import { Invitation, InvitationId, InviteUserDto } from '../types/invitationsTypes';
import { CompanyId } from '../types/companiesTypes';

type RejectValue = string;

export const fetchCompanyInvitations = createAsyncThunk<Invitation[], CompanyId, { rejectValue: RejectValue }>(
  'companies/fetchInvitations',
  async (companyId, { rejectWithValue }) => {
    try {
      const res = await companiesActionsApi.getCompanyInvitations(companyId);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load invitations');
    }
  }
);

export const inviteUser = createAsyncThunk<Invitation, InviteUserDto, { rejectValue: RejectValue }>(
  'companies/actions/inviteUser',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await companiesActionsApi.inviteUser(payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to invite user');
    }
  }
);

export const cancelInvitation = createAsyncThunk<InvitationId, InvitationId, { rejectValue: RejectValue }>(
  'companies/actions/cancelInvitation',
  async (invitationId, { rejectWithValue }) => {
    try {
      await companiesActionsApi.cancelInvitation(invitationId);
      return invitationId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to cancel invitation');
    }
  }
);

export const acceptRequest = createAsyncThunk<InvitationId, InvitationId, { rejectValue: RejectValue }>(
  'companies/actions/acceptRequest',
  async (invitationId, { rejectWithValue }) => {
    try {
      await companiesActionsApi.acceptRequest(invitationId);
      return invitationId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to accept request');
    }
  }
);

export const rejectRequest = createAsyncThunk<InvitationId, InvitationId, { rejectValue: RejectValue }>(
  'companies/actions/rejectRequest',
  async (invitationId, { rejectWithValue }) => {
    try {
      await companiesActionsApi.rejectRequest(invitationId);
      return invitationId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to reject request');
    }
  }
);
