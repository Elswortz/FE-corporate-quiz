import { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Menu, MenuItem, Button, Typography, Box, Divider } from '@mui/material';
import { logout } from '@/features/auth/store/authThunks';
import { selectUserProfileData } from '../../store/usersSelectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

type AccountMenuProps = {
  isMobile?: boolean;
};

const AccountMenu = ({ isMobile = false }: AccountMenuProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectUserProfileData);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
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
    dispatch(logout());
    navigate(`/`);
  };

  return (
    <Box display="flex" alignItems="center">
      <Button
        onClick={handleMenuOpen}
        sx={{
          textTransform: 'none',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          borderRadius: 2,
          px: 1,
          transition: 'background-color 0.2s ease',

          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        <Avatar
          sx={{
            bgcolor: 'secondary.main',
            width: 36,
            height: 36,
          }}
          src={user?.avatar_url || undefined}
        >
          {user?.first_name?.[0] || '?'}
        </Avatar>

        {!isMobile && (
          <Typography variant="body1">
            {user ? `${user.first_name || ''} ${user.last_name || ''}` : 'Loading...'}
          </Typography>
        )}
      </Button>

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
