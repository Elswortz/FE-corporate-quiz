import { useEffect, useState } from 'react';
import { fetchCompanyInvitations, acceptRequest, rejectRequest, cancelInvitation } from '../../store/invitationsThunks';
import { useParams } from 'react-router-dom';

import {
  selectCompanyInvitations,
  selectCompanyInvitationsLoading,
  selectCompanyInvitationsError,
} from '../../store/invitationsSelectors';

import { showNotification } from '../../../notifications/store/notificationsSlice';
import InvitationsItem from '../../../invitations/components/InvitationsItem/InvitationsItem';

import { Box, CircularProgress, List, Typography, Divider, Stack } from '@mui/material';

import GroupAddIcon from '@mui/icons-material/GroupAdd';

import ConfirmModal from '../../../../components/ui/ConfirmModal/ConfirmModal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { InvitationId } from '../../types/invitationsTypes';

const InvitationsList = () => {
  const [isConfirmDialogOpen, setIsConfirmDelOpen] = useState(false);
  const [selectedInvitationId, setSelectedInvitationId] = useState<string | null>('');

  const dispatch = useAppDispatch();
  const { companyId } = useParams();

  useEffect(() => {
    if (companyId) dispatch(fetchCompanyInvitations(companyId));
  }, [dispatch, companyId]);

  const invitations = useAppSelector(selectCompanyInvitations);
  const isLoading = useAppSelector(selectCompanyInvitationsLoading);
  const error = useAppSelector(selectCompanyInvitationsError);

  const handleAccept = async (id: InvitationId) => {
    try {
      await dispatch(acceptRequest(id)).unwrap();
      dispatch(showNotification({ message: 'Request successfuly accepted', severity: 'success' }));
    } catch (err: any) {
      dispatch(
        showNotification({
          message: err.response?.data?.message || 'Failed to accept request',
          severity: 'error',
        })
      );
    }
  };

  const handleReject = async (id: InvitationId) => {
    try {
      await dispatch(rejectRequest(id)).unwrap();
      dispatch(showNotification({ message: 'Request successfuly rejected', severity: 'success' }));
    } catch (err: any) {
      dispatch(
        showNotification({
          message: err.response?.data?.message || 'Failed to reject request',
          severity: 'error',
        })
      );
    }
  };

  const handleCancel = async () => {
    if (!selectedInvitationId) {
      return null;
    }
    try {
      await dispatch(cancelInvitation(selectedInvitationId)).unwrap();
      dispatch(showNotification({ message: 'Invitation successfully canceled', severity: 'info' }));
    } catch (err: any) {
      dispatch(
        showNotification({
          message: err.response?.data?.message || 'Failed to cancel invitation',
          severity: 'error',
        })
      );
    } finally {
      setIsConfirmDelOpen(false);
      setSelectedInvitationId(null);
    }
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
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {invitations.map(inv => {
          return (
            <Box key={inv.id} component="div">
              <InvitationsItem
                inv={inv}
                onAccept={handleAccept}
                onReject={handleReject}
                onCancel={() => {
                  setSelectedInvitationId(inv.id);
                  setIsConfirmDelOpen(true);
                }}
              />
              <Divider component="li" />
            </Box>
          );
        })}
      </List>

      <ConfirmModal
        isOpen={isConfirmDialogOpen}
        title={'Confirm invitation cancellation'}
        description={'Are you sure you want to cancel your invitation? This action cannot be undone'}
        confirmText={'Confirm'}
        confirmColor={'primary'}
        onConfirm={handleCancel}
        onCancel={() => setIsConfirmDelOpen(false)}
      />
    </>
  );
};

export default InvitationsList;
