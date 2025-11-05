import Logo from '../../ui/Logo/Logo';
import NavMenu from '../../ui/NavMenu/NavMenu';
import LangSelector from '../../ui/LangSelector/LangSelector';
import AuthNav from '../../../features/auth/components/AuthNav/AuthNav';
import AccountMenu from '../../../features/auth/components/AccountMenu/AccountMenu';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import { AppBar, Toolbar, Box } from '@mui/material';

function Header() {
  const { isLoggedIn } = useAuth();

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
