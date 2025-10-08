import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice.js';
import { usersReducer } from './user/slice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});
