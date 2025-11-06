import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Avatar, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { acceptInvitation, declineInvitation } from '../../store/actionsThunks';
import { useState } from 'react';

const InvitationModal = ({ invite, onClose, onAccepted }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    setLoading(true);
    try {
      await dispatch(acceptInvitation(invite.id)).unwrap();
      onAccepted?.();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = async () => {
    setLoading(true);
    try {
      await dispatch(declineInvitation(invite.id)).unwrap();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Invitation</DialogTitle>
      <DialogContent>
        <Box display="flex" gap={2} alignItems="center" mb={2}>
          <Avatar src={invite.inviter?.avatar_url}>{invite.inviter?.name?.[0]}</Avatar>
          <div>
            <Typography variant="subtitle1">{invite.company_name}</Typography>
            <Typography variant="body2">Invited by {invite.inviter?.name}</Typography>
          </div>
        </Box>

        <Typography variant="body2">{invite.message || 'No message'}</Typography>
        {/* можно вывести дату, роль, дополнительные поля */}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleDecline} disabled={loading}>
          Decline
        </Button>
        <Button onClick={handleAccept} variant="contained" disabled={loading}>
          {loading ? 'Processing...' : 'Accept'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvitationModal;
