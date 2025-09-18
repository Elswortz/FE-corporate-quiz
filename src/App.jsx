import { Route, Routes } from 'react-router-dom';

import AppShell from './layouts/AppShell';

import About from './pages/About';
import Users from './pages/Users';
import UserProfile from './pages/UserProfile';
import Companies from './pages/Companies';
import CompanyProfile from './pages/CompanyProfile';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<About />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:userId" element={<UserProfile />} />
          <Route path="companies" element={<Companies />} />
          <Route path="companies/:companyId" element={<CompanyProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
