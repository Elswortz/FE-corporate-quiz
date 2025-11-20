import { useEffect, useState } from 'react';
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  CircularProgress,
  Typography,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMyInvitations } from '../../store/usersActionsThunks';
import { selectInvitations, selectInvitationsCount, selectInvitationsLoading } from '../../store/usersSelectors';

import InvitationModal from '../InvitationModal/InvitationModal';

const NotificationsBell = () => {
  const dispatch = useDispatch();
  const invitations = useSelector(selectInvitations);
  const count = useSelector(selectInvitationsCount);
  const isLoading = useSelector(selectInvitationsLoading);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedInvite, setSelectedInvite] = useState(null);

  useEffect(() => {
    dispatch(fetchMyInvitations());
    const onFocus = () => dispatch(fetchMyInvitations());
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [dispatch]);

  const openMenu = e => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const handleItemClick = invite => {
    setSelectedInvite(invite);
    closeMenu();
  };

  return (
    <>
      <IconButton color="inherit" onClick={openMenu}>
        <Badge badgeContent={count} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        {isLoading ? (
          <MenuItem>
            <CircularProgress size={20} />
          </MenuItem>
        ) : invitations.length === 0 ? (
          <MenuItem disabled>No invitations</MenuItem>
        ) : (
          invitations.map(invite => (
            <MenuItem key={invite.id} onClick={() => handleItemClick(invite)}>
              <ListItemAvatar>
                <Avatar src={invite.company.company_logo_url}></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1">
                    <strong>{invite.company.company_name}</strong> company invitation
                  </Typography>
                }
                secondary={`From: ${invite.invited_by.first_name} ${invite.invited_by.last_name}`}
              />
            </MenuItem>
          ))
        )}
      </Menu>

      {selectedInvite && <InvitationModal invite={selectedInvite} onClose={() => setSelectedInvite(null)} />}
    </>
  );
};

export default NotificationsBell;
