import { Route, Routes, Navigate } from 'react-router-dom';
import { PrivateRoute, RestrictedRoute } from './features/auth/components/RoutesRestriction';
import { useAppDispatch } from './store/hooks';
import { checkAuth } from './features/auth/store/authThunks';

import AppShell from './components/layouts/AppShell/AppShell';

import {
  About,
  Users,
  UserDetails,
  UserProfile,
  Companies,
  CompanyProfile,
  Registration,
  Login,
  Members,
  Quizzes,
  Invitations,
} from './pages';

import AuthSuccess from './features/auth/components/AuthSuccess/AuthSuccess';
import NotificationProvider from './features/notifications/components/NotificationProvider/NotificationProvider';
import ResetPassword from './features/auth/components/ResetPassword/ResetPassword';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem('lang') || 'en');
  }, [i18n]);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<About />} />
          <Route
            path="users"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          <Route path="users/:userId" element={<UserDetails />} />
          <Route
            path="users/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route path="companies" element={<Companies />} />
          <Route path="companies/:companyId" element={<CompanyProfile />}>
            <Route index element={<Navigate to="members" replace />} />
            <Route path="members" element={<Members />} />
            <Route path="quizzes" element={<Quizzes />} />
            <Route path="invitations" element={<Invitations />} />
          </Route>
          <Route
            path="registration"
            element={
              <RestrictedRoute>
                <Registration />
              </RestrictedRoute>
            }
          />
          <Route
            path="login"
            element={
              <RestrictedRoute>
                <Login />
              </RestrictedRoute>
            }
          />
          <Route path="login/success" element={<AuthSuccess />} />
          <Route path="confirm-reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
      <NotificationProvider />
    </>
  );
}

export default App;
