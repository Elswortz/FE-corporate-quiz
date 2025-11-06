import { createSlice } from '@reduxjs/toolkit';
import { fetchMyInvitations, acceptInvitation, declineInvitation } from './actionsThunks';
import { actionsState } from './actionsState';

const actionsSlice = createSlice({
  name: 'actions',
  initialState: actionsState,
  reducers: {
    removeInvitationLocally(state, { payload: invitationId }) {
      state.myInvitations.data = state.myInvitations.data.filter(i => i.id !== invitationId);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMyInvitations.pending, state => {
        state.myInvitations.isLoading = true;
        state.myInvitations.error = null;
      })
      .addCase(fetchMyInvitations.fulfilled, (state, { payload }) => {
        state.myInvitations.isLoading = false;
        state.myInvitations.data = payload;
        state.myInvitations.lastFetched = Date.now();
      })
      .addCase(fetchMyInvitations.rejected, (state, { payload }) => {
        state.myInvitations.isLoading = false;
        state.myInvitations.error = payload;
      })

      .addCase(acceptInvitation.pending, state => {
        state.operations.accept.isLoading = true;
        state.operations.accept.error = null;
      })
      .addCase(acceptInvitation.fulfilled, (state, { payload }) => {
        state.operations.accept.isLoading = false;
        state.myInvitations.data = state.myInvitations.data.filter(i => i.id !== payload.invitationId);
      })
      .addCase(acceptInvitation.rejected, (state, { payload }) => {
        state.operations.accept.isLoading = false;
        state.operations.accept.error = payload;
      })

      .addCase(declineInvitation.pending, state => {
        state.operations.decline.isLoading = true;
        state.operations.decline.error = null;
      })
      .addCase(declineInvitation.fulfilled, (state, { payload }) => {
        state.operations.decline.isLoading = false;
        state.myInvitations.data = state.myInvitations.data.filter(i => i.id !== payload.invitationId);
      })
      .addCase(declineInvitation.rejected, (state, { payload }) => {
        state.operations.decline.isLoading = false;
        state.operations.decline.error = payload;
      });
  },
});

export const { removeInvitationLocally } = actionsSlice.actions;
export const actionsReducer = actionsSlice.reducer;
