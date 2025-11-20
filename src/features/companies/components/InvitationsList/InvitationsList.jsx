import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCompanyInvitations } from '../../store/companiesThunks';
import { useParams } from 'react-router-dom';
import {
  selectCompanyInvitations,
  selectInvitationsLoading,
  selectInvitationsError,
} from '../../store/companiesSelectors';

import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Chip,
  Divider,
  Button,
  Stack,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const InvitationsList = () => {
  const dispatch = useDispatch();
  const { companyId } = useParams();

  useEffect(() => {
    if (companyId) dispatch(fetchCompanyInvitations(companyId));
  }, [dispatch, companyId]);

  const getInitials = (first = '', last = '') => `${first?.[0] || ''}${last?.[0] || ''}`.toUpperCase();

  const invitations = useSelector(selectCompanyInvitations);
  const isLoading = useSelector(selectInvitationsLoading);
  const error = useSelector(selectInvitationsError);

  const handleAccept = invitationId => {
    // TODO: dispatch accept invitation thunk when available
  };

  const handleDecline = invitationId => {
    // TODO: dispatch decline/cancel invitation thunk when available
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" textAlign="center" mt={3}>
        {error}
      </Typography>
    );
  }

  if (!invitations || invitations.length === 0) {
    return (
      <Box mt={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <GroupAddIcon color="action" />
          <Typography variant="body1">No invitations</Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {invitations.map(inv => {
        const user = inv.invited_user;
        const invitedBy = inv.invited_by;
        const avatarUrl = user?.avatar_url;
        const invitedByName = invitedBy ? `${invitedBy.first_name || ''} ${invitedBy.last_name || ''}`.trim() : null;
        const userName = `${user?.first_name || ''} ${user?.last_name || ''}`.trim();

        return (
          <Box key={inv.id}>
            <ListItem alignItems="flex-start" disableGutters>
              <ListItemAvatar>
                {avatarUrl ? (
                  <Avatar src={avatarUrl} alt={userName} />
                ) : (
                  <Avatar>{getInitials(user?.first_name, user?.last_name) || <PersonIcon />}</Avatar>
                )}
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                    <Typography variant="subtitle1">{userName || user?.email}</Typography>
                    <Chip label={inv.status} size="small" color={inv.status === 'pending' ? 'default' : 'primary'} />
                  </Box>
                }
                secondary={
                  <Box mt={0.5}>
                    <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                      <EmailIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {user?.email}
                      </Typography>
                    </Box>

                    {invitedByName && (
                      <Typography variant="caption" color="text.secondary">
                        Invited by: {invitedByName}
                      </Typography>
                    )}
                  </Box>
                }
              />

              <Stack direction="row" spacing={1}>
                {inv.status === 'pending' && (
                  <>
                    <Button size="small" variant="contained" onClick={() => handleAccept(inv.id)}>
                      Accept
                    </Button>

                    <Button size="small" variant="outlined" color="inherit" onClick={() => handleDecline(inv.id)}>
                      Decline
                    </Button>
                  </>
                )}
              </Stack>
            </ListItem>

            <Divider component="li" />
          </Box>
        );
      })}
    </List>
  );
};

export default InvitationsList;
