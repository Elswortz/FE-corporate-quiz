import { Route, Routes } from 'react-router-dom';
import { PrivateRoute, RestrictedRoute } from './utils';
import { useDispatch } from 'react-redux';
import { setAuthTokens } from './store/auth/slice';
import { fetchUserProfile, checkAuth } from './store/auth/operations';

import AppShell from './layouts/AppShell';

import About from './pages/About';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';
import UserProfile from './pages/UserProfile';
import Companies from './pages/Companies';
import CompanyProfile from './pages/CompanyProfile';
import Registration from './pages/Registration';
import Login from './pages/Login';
import AuthSuccess from './components/AuthSuccess/AuthSuccess';
import NotificationProvider from './components/NotificationProvider/NotificationProvider';
import ResetPassword from './components/ResetPassword/ResetPassword';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem('lang') || 'en');
  }, [i18n]);

  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (accessToken && refreshToken) {
        dispatch(setAuthTokens({ accessToken, refreshToken }));
        try {
          await dispatch(checkAuth()).unwrap();
          await dispatch(fetchUserProfile()).unwrap();
        } catch {
          console.log('Session expired, logging out');
        }
      }
    })();
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<About />} />
          <Route path="users" element={<PrivateRoute component={Users} />} />
          <Route path="users/:userId" element={<UserDetails />} />
          <Route path="users/profile" element={<PrivateRoute component={UserProfile} />} />
          <Route path="companies" element={<Companies />} />
          <Route path="companies/:companyId" element={<CompanyProfile />} />
          <Route path="registration" element={<RestrictedRoute component={Registration} />} />
          <Route path="login" element={<RestrictedRoute component={Login} />} />
          <Route path="login/success" element={<AuthSuccess />} />
          <Route path="confirm-reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
      <NotificationProvider />
    </>
  );
}

export default App;
