import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, Menu, MenuItem, IconButton, Typography, Box, Divider } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';

import { logOut } from '../../store/auth/slice';

const AccountMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate(`/users/profile`);
  };

  const handleLogout = () => {
    handleMenuClose();
    dispatch(logOut());
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 2 }}>
        <Avatar
          sx={{ bgcolor: 'secondary.main', width: 36, height: 36 }}
          src={user?.avatar_url || undefined}
        >
          {user?.first_name?.[0] || '?'}
        </Avatar>
      </IconButton>

      <Typography variant="body1" sx={{ ml: 1, color: 'white' }}>
        {user ? `${user.first_name || ''} ${user.last_name || ''}` : 'Loading...'}
      </Typography>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 150,
            borderRadius: 2,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfile}>My profile</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
          Log out
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AccountMenu;
