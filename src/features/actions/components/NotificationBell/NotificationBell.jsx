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
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMyInvitations } from '../../store/actionsThunks';
import {
  selectMyInvitations,
  selectMyInvitationsCount,
  selectMyInvitationsLoading,
} from '../../store/actionsSelectors';

import InvitationModal from '../InvitationModal/InvitationModal';

const NotificationsBell = () => {
  const dispatch = useDispatch();
  const invitations = useSelector(selectMyInvitations);
  const count = useSelector(selectMyInvitationsCount);
  const isLoading = useSelector(selectMyInvitationsLoading);

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
                <Avatar src={invite.inviter?.avatar_url}>{invite.inviter?.name?.[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={invite.company_name} secondary={`From: ${invite.inviter?.name}`} />
            </MenuItem>
          ))
        )}
      </Menu>

      {selectedInvite && (
        <InvitationModal
          invite={selectedInvite}
          onClose={() => setSelectedInvite(null)}
          onAccepted={() => {
            // можно показать нотификацию, и/или обновить companies
            dispatch(fetchMyInvitations());
          }}
        />
      )}
    </>
  );
};

export default NotificationsBell;
