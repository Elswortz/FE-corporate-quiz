import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Avatar,
  Box,
  Divider,
  Stack,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectAcceptLoading, selectCancelLoading } from '../../store/actionsSelectors';
import { acceptInvitation, cancelInvitation } from '../../store/actionsThunks';
import { showNotification } from '../../../notifications/store/notificationsSlice';

const InvitationModal = ({ invite, onClose }) => {
  const dispatch = useDispatch();
  const acceptLoading = useSelector(selectAcceptLoading);
  const cancelLoading = useSelector(selectCancelLoading);

  const handleAccept = async () => {
    try {
      await dispatch(acceptInvitation(invite.id)).unwrap();
      dispatch(
        showNotification({
          message: `Invitation to ${invite.company.company_name} company accepted`,
          severity: 'success',
        })
      );
      onClose();
    } catch (error) {
      dispatch(showNotification({ message: error || 'Failed to accept invitation', severity: 'error' }));
    }
  };

  const handleCancel = async () => {
    try {
      await dispatch(cancelInvitation(invite.id)).unwrap();
      dispatch(
        showNotification({
          message: `Invitation to ${invite.company.company_name} canceled`,
          severity: 'info',
        })
      );
      onClose();
    } catch (error) {
      dispatch(showNotification({ message: error || 'Failed to cancel invitation', severity: 'error' }));
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Company Invitation</DialogTitle>
      <DialogContent>
        <Stack spacing={3} alignItems="center" textAlign="center">
          <Avatar src={invite.company.company_logo_url} sx={{ width: 72, height: 72 }} />
          <Typography variant="h6">{invite.company.company_name}</Typography>

          <Divider flexItem />

          <Box display="flex" alignItems="center" gap={2}>
            <Avatar src={invite.invited_by.avatar_url} />
            <Box>
              <Typography variant="subtitle1">{`${invite.invited_by.first_name} ${invite.invited_by.last_name}`}</Typography>
              <Typography variant="body2" color="text.secondary">
                Invited you
              </Typography>
            </Box>
          </Box>

          <Typography variant="caption" color="text.secondary">
            Status: <b>{invite.status}</b>
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button onClick={handleCancel} disabled={cancelLoading}>
          {cancelLoading ? 'Processing...' : 'Cancel'}
        </Button>
        <Button onClick={handleAccept} variant="contained" disabled={acceptLoading}>
          {acceptLoading ? 'Processing...' : 'Accept'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvitationModal;
