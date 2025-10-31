import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';

function AppShell() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default AppShell;
