import { createSlice } from '@reduxjs/toolkit';
import invitationsState from './invitationsState';

const invitationsSlice = createSlice({
  name: 'invitations',
  initialState: invitationsState,
  reducers: {},
});

export const invitationsReducer = invitationsSlice.reducer;
// export const { clearCurrentCompany } = companiesSlice.actions;
