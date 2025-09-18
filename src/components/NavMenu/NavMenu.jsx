import { Toolbar, AppBar, Button } from '@mui/material';

import { NavLink } from 'react-router-dom';

function NavMenu() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button component={NavLink} to="/" color="inherit">
          About
        </Button>
        <Button component={NavLink} to="/users" color="inherit">
          Users
        </Button>
        <Button component={NavLink} to="/companies" color="inherit">
          Companies
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavMenu;
