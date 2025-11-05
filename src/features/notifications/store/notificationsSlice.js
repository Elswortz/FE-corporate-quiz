import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  message: '',
  severity: 'info', // 'success' | 'error' | 'warning' | 'info'
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
