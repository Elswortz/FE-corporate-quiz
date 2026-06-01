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

import { acceptInvitation, rejectInvitation, cancelRequest } from '../../store/invitationsThunks';
import { showNotification } from '../../../notifications/store/notificationsSlice';
import { Invitation } from '../../types/invitationsTypes';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectAcceptInvitationLoading,
  selectCancelRequestLoading,
  selectRejectInvitationLoading,
} from '../../store/invitationsSelectors';

type Props = {
  invite: Invitation;
  onClose: () => void;
};

const InvitationModal = ({ invite, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const acceptLoading = useAppSelector(selectAcceptInvitationLoading);
  const rejectLoading = useAppSelector(selectRejectInvitationLoading);
  const cancelLoading = useAppSelector(selectCancelRequestLoading);
  const {
    id,
    status,
    invitation_type: invType,
    company: { company_name: companyName, company_logo_url: companyLogoUrl },
    invited_by: { avatar_url: avatarUrl, first_name: byFirstName, last_name: byLastName },
  } = invite;

  const handleAccept = async () => {
    try {
      await dispatch(acceptInvitation(id)).unwrap();
      dispatch(
        showNotification({
          message: `Invitation to ${companyName} company accepted`,
          severity: 'success',
        })
      );
      onClose();
    } catch (error) {
      dispatch(showNotification({ message: error || 'Failed to accept invitation', severity: 'error' }));
    }
  };

  const handleReject = async () => {
    try {
      await dispatch(rejectInvitation(id)).unwrap();
      dispatch(
        showNotification({
          message: `Invitation to ${companyName} rejected`,
          severity: 'info',
        })
      );
      onClose();
    } catch (error) {
      dispatch(showNotification({ message: error || 'Failed to cancel invitation', severity: 'error' }));
    }
  };

  const handleCancel = async () => {
    try {
      await dispatch(cancelRequest(id)).unwrap();
      dispatch(
        showNotification({
          message: `Invitation succesfuly canceled`,
          severity: 'info',
        })
      );
      onClose();
    } catch (error) {
      dispatch(showNotification({ message: error || 'Failed to accept invitation', severity: 'error' }));
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{invType === 'company_invite' ? 'Company Invitation' : 'Company Request'}</DialogTitle>
      <DialogContent>
        <Stack spacing={3} alignItems="center" textAlign="center">
          <Avatar src={companyLogoUrl} sx={{ width: 72, height: 72 }} />
          <Typography variant="h6">{companyName}</Typography>

          <Divider flexItem />

          <Box display="flex" alignItems="center" gap={2}>
            <Avatar src={avatarUrl} />
            <Box>
              <Typography variant="subtitle1">{`${byFirstName} ${byLastName}`}</Typography>
              <Typography variant="body2" color="text.secondary">
                {invType === 'company_invite' ? 'Invited you' : 'You requested to join'}
              </Typography>
            </Box>
          </Box>

          <Typography variant="caption" color="text.secondary">
            Status: <b>{status}</b>
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        {invType === 'company_invite' ? (
          <>
            <Button onClick={handleAccept} variant="contained" loading={acceptLoading}>
              Accept
            </Button>
            <Button onClick={handleReject} variant="outlined" loading={rejectLoading}>
              Reject
            </Button>
          </>
        ) : (
          <Button onClick={handleCancel} variant="outlined" color="error" loading={cancelLoading}>
            Cancel
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default InvitationModal;
