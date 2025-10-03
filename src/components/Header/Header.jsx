import Logo from '../Logo/Logo';
import NavMenu from '../NavMenu/NavMenu';
import LangSelector from '../LangSelector/LangSelector';
import AuthNav from '../AuthNav/AuthNav';

import { AppBar, Toolbar, Box } from '@mui/material';

function Header() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Logo />
          <NavMenu />
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <LangSelector />
          <AuthNav />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
