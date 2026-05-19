import { createSlice } from '@reduxjs/toolkit';
import type { AlertColor } from '@mui/material';

type NotificationState = {
  open: boolean;
  message: string;
  severity: AlertColor;
};

const initialState: NotificationState = {
  open: false,
  message: '',
  severity: 'info',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      const { message, severity = 'info' } = action.payload;
      state.open = true;
      state.message = message;
      state.severity = severity;
    },
    closeNotification: state => {
      state.open = false;
    },
  },
});

export const { showNotification, closeNotification } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
