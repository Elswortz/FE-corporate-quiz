import { useState } from 'react';
import { Logo, NavMenu, LangSelector } from '@/components/ui';
import { AuthNav } from '@/features/auth/components';
import { AccountMenu } from '@/features/users/components';
import { NotificationBell } from '@/features/invitations/components';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Header() {
  const { isLoggedIn } = useAuth();

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerOpen = () => {
    setMobileOpen(true);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              minHeight: { xs: 64, md: 70 },
              px: { xs: 0, sm: 0 },
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Logo />
              {!isMobile && <NavMenu />}
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              {!isTablet && <LangSelector />}
              {isMobile && (
                <IconButton color="inherit" onClick={handleDrawerOpen}>
                  <MenuIcon />
                </IconButton>
              )}
              {isLoggedIn && <NotificationBell />}
              {isLoggedIn ? <AccountMenu isMobile={isMobile} /> : <AuthNav />}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerClose}>
        <Box
          sx={{
            width: 280,
            pt: 2,
          }}
          role="presentation"
          onClick={handleDrawerClose}
        >
          <List>
            <ListItemButton component={RouterLink} to="/">
              <ListItemText primary="About" />
            </ListItemButton>

            <ListItemButton component={RouterLink} to="/users">
              <ListItemText primary="Users" />
            </ListItemButton>

            <ListItemButton component={RouterLink} to="/companies">
              <ListItemText primary="Companies" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Header;
