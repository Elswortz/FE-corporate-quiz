import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../features/auth/store/authSlice.ts';
import { usersReducer } from '../features/users/store/usersSlice.ts';
import { companiesReducer } from '../features/companies/store/companiesSlice.ts';
import { invitationsReducer } from '@/features/invitations/store/invitationsSlice.ts';
import { notificationReducer } from '../features/notifications/store/notificationsSlice.ts';
import { setupInterceptors } from '../api/interceptors.ts';
import { quizzesReducer } from '@/features/quizzes/store/quizzesSlice.ts';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    companies: companiesReducer,
    invitations: invitationsReducer,
    quizzes: quizzesReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupInterceptors();
