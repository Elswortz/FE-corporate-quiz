import Logo from '../Logo/Logo';
import NavMenu from '../NavMenu/NavMenu';
import LangSelector from '../LangSelector/LangSelector';
import AuthNav from '../AuthNav/AuthNav';
import AccountMenu from '../AccountMenu/AccountMenu';
import { useAuth } from '../../hooks/useAuth';

import { useEffect } from 'react';
import { getUsers } from '../../api/usersApi';

import { AppBar, Toolbar, Box } from '@mui/material';

function Header() {
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    getUsers()
      .then(res => console.log('Данные пользователя:', res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Logo />
          <NavMenu />
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <LangSelector />
          {isLoggedIn ? <AccountMenu /> : <AuthNav />}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
