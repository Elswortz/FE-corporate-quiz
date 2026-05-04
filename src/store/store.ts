import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../features/auth/store/authSlice.js';
import { usersReducer } from '../features/users/store/usersSlice.js';
import { companiesReducer } from '../features/companies/store/companiesSlice.js';
import { notificationReducer } from '../features/notifications/store/notificationsSlice.js';
import { setupInterceptors } from '../api/interceptors.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    companies: companiesReducer,
    notification: notificationReducer,
  },
});

setupInterceptors();
