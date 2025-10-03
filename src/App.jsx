import { Route, Routes } from 'react-router-dom';
import { PrivateRoute, RestrictedRoute } from './utils';

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

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem('lang') || 'en');
  }, []);

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
