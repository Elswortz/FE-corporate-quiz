import { useEffect, useState, MouseEvent } from 'react';
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

import { fetchUserInvitations } from '../../store/invitationsThunks';
import { selectUserInvitations, selectUserInvitationsLoading } from '../../store/invitationsSelectors';

import InvitationModal from '../InvitationModal/InvitationModal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Invitation } from '../../types/invitationsTypes';
import { useTranslation } from 'react-i18next';

const NotificationsBell = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('header');
  const invitations = useAppSelector(selectUserInvitations);
  const count = invitations.length;
  const isLoading = useAppSelector(selectUserInvitationsLoading);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedInvite, setSelectedInvite] = useState<Invitation | null>(null);

  useEffect(() => {
    dispatch(fetchUserInvitations());
    const onFocus = () => dispatch(fetchUserInvitations());
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [dispatch]);

  const openMenu = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const handleItemClick = (invite: Invitation) => {
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
          <MenuItem disabled>{t('notificationBell.noInvitations')}</MenuItem>
        ) : (
          invitations.map(invite => (
            <MenuItem key={invite.id} onClick={() => handleItemClick(invite)}>
              <ListItemAvatar>
                <Avatar src={invite.company.company_logo_url}></Avatar>
              </ListItemAvatar>
              {invite.invitation_type === 'company_invite' ? (
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">
                      <strong>{invite.company.company_name}</strong> {t('notificationBell.companyInvitation')}
                    </Typography>
                  }
                  secondary={`${t('notificationBell.from')} ${invite.invited_by.first_name} ${invite.invited_by.last_name}`}
                />
              ) : (
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">
                      {t('notificationBell.requested')} <strong>{invite.company.company_name}</strong>
                    </Typography>
                  }
                  secondary={t('notificationBell.awaitingResponse')}
                />
              )}
            </MenuItem>
          ))
        )}
      </Menu>

      {selectedInvite && <InvitationModal invite={selectedInvite} onClose={() => setSelectedInvite(null)} />}
    </>
  );
};

export default NotificationsBell;
