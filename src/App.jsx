import { Route, Routes } from 'react-router-dom';
import { PrivateRoute, RestrictedRoute } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from './store/auth/operations';
import { setAuthTokens, logOut } from './store/auth/slice';

import AppShell from './layouts/AppShell';

import About from './pages/About';
import Users from './pages/Users';
import UserProfile from './pages/UserProfile';
import Companies from './pages/Companies';
import CompanyProfile from './pages/CompanyProfile';
import Registration from './pages/Registration';
import Login from './pages/Login';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector(state => state.auth);

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem('lang') || 'en');

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      dispatch(setAuthTokens({ accessToken, refreshToken }));
      dispatch(getUserProfile())
        .unwrap()
        .catch(() => {
          dispatch(logOut());
        });
    }
  }, [dispatch, i18n]);

  if (isLoading && !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<About />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:userId" element={<UserProfile />} />
          <Route path="companies" element={<Companies />} />
          <Route path="companies/:companyId" element={<CompanyProfile />} />
          <Route path="registration" element={<RestrictedRoute component={Registration} />} />
          <Route path="login" element={<RestrictedRoute component={Login} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
