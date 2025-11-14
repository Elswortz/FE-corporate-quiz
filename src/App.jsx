import { Route, Routes } from 'react-router-dom';
import { PrivateRoute, RestrictedRoute } from './features/auth/components/RoutesRestriction';
import { useDispatch } from 'react-redux';
import { checkAuth } from './features/auth/store/authThunks';

import AppShell from './components/layouts/AppShell/AppShell';

import About from './pages/About';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';
import UserProfile from './pages/UserProfile';
import Companies from './pages/Companies';
import CompanyProfile from './pages/CompanyProfile';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Members from './pages/Members';
import Quizzes from './pages/Quizzes';
import Invitations from './pages/Invitations';

import AuthSuccess from './features/auth/components/AuthSuccess/AuthSuccess';
import NotificationProvider from './features/notifications/components/NotificationProvider/NotificationProvider';
import ResetPassword from './features/auth/components/ResetPassword/ResetPassword';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

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
          <Route path="users" element={<PrivateRoute component={Users} />} />
          <Route path="users/:userId" element={<UserDetails />} />
          <Route path="users/profile" element={<PrivateRoute component={UserProfile} />} />
          <Route path="companies" element={<Companies />} />
          <Route path="companies/:companyId" element={<CompanyProfile />}>
            <Route path="members" element={<Members />} />
            <Route path="quizzes" element={<Quizzes />} />
            <Route path="invitations" element={<Invitations />} />
          </Route>
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
