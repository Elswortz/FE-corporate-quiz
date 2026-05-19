import { ListItem, ListItemAvatar, ListItemText, Box, Typography, Chip, Stack, Button, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import { Invitation, InvitationId } from '../../types/invitationsTypes';

type Props = {
  inv: Invitation;
  onAccept: (id: InvitationId) => void;
  onReject: (id: InvitationId) => void;
  onCancel: () => void;
};

const InvitationsItem = ({ inv, onAccept, onReject, onCancel }: Props) => {
  const user = inv.invited_user;
  const invitedBy = inv.invited_by;
  const avatarUrl = user?.avatar_url;
  const invitedByName = invitedBy ? `${invitedBy.first_name || ''} ${invitedBy.last_name || ''}`.trim() : null;
  const userName = `${user?.first_name || ''} ${user?.last_name || ''}`.trim();

  const getInitials = (first = '', last = '') => `${first?.[0] || ''}${last?.[0] || ''}`.toUpperCase();

  return (
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
          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap" component="span">
            <Typography variant="subtitle1" component="span">
              {userName || user?.email}
            </Typography>

            <Chip
              label={inv.invitation_type === 'company_invite' ? 'Invite' : 'Request'}
              size="small"
              color={inv.invitation_type === 'company_invite' ? 'secondary' : 'success'}
            />
          </Box>
        }
        secondary={
          <Box mt={0.5} component="span">
            <Box display="flex" alignItems="center" gap={1} mb={0.5} component="span">
              <EmailIcon fontSize="small" color="action" />
              <Typography variant="body2" component="span" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>

            {inv.invitation_type === 'company_invite' && (
              <Typography variant="caption" component="span" color="text.secondary">
                Invited by: {invitedByName}
              </Typography>
            )}
          </Box>
        }
      />
      <Stack direction="row" spacing={1} component="span">
        <>
          {inv.invitation_type === 'company_invite' && (
            <Button variant="outlined" color="error" size="small" onClick={onCancel}>
              Cancel
            </Button>
          )}
          {inv.invitation_type === 'user_request' && (
            <>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                  onAccept(inv.id);
                }}
              >
                Accept
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  onReject(inv.id);
                }}
              >
                Reject
              </Button>
            </>
          )}
        </>
      </Stack>
    </ListItem>
  );
};

export default InvitationsItem;
