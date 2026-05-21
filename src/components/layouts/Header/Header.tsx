import { Logo, NavMenu, LangSelector } from '@/components/ui';
import { AuthNav } from '@/features/auth/components';
import { AccountMenu } from '@/features/users/components';
import { NotificationBell } from '@/features/invitations/components';
import { useAuth } from '@/features/auth/hooks/useAuth';
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
          {isLoggedIn && <NotificationBell />}
          {isLoggedIn ? <AccountMenu /> : <AuthNav />}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
