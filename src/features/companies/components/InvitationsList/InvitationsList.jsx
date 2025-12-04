import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchCompanyInvitations, cancelInvitation } from '../../store/companiesActionsThunks';
import { useParams } from 'react-router-dom';

import {
  selectCompanyInvitations,
  selectInvitationsLoading,
  selectInvitationsError,
} from '../../store/companiesSelectors';

import { showNotification } from '../../../notifications/store/notificationsSlice';
import InvitationsItem from '../InvitationsItem/InvitationsItem';

import { Box, CircularProgress, List, Typography, Divider, Stack } from '@mui/material';

import GroupAddIcon from '@mui/icons-material/GroupAdd';

import ConfirmModal from '../../../../components/ui/ConfirmModal/ConfirmModal';

const InvitationsList = () => {
  const [isConfirmDialogOpen, setIsConfirmDelOpen] = useState(false);
  const [selectedInvitationId, setSelectedInvitationId] = useState(null);

  const dispatch = useDispatch();
  const { companyId } = useParams();

  useEffect(() => {
    if (companyId) dispatch(fetchCompanyInvitations(companyId));
  }, [dispatch, companyId]);

  const invitations = useSelector(selectCompanyInvitations);
  const isLoading = useSelector(selectInvitationsLoading);
  const error = useSelector(selectInvitationsError);

  const handleAccept = () => {
    try {
    } catch (err) {}
  };
  // const handleReject = () => {};
  const handleCancel = async () => {
    try {
      await dispatch(cancelInvitation(selectedInvitationId)).unwrap();
      dispatch(showNotification({ message: 'Invitation successfully canceled', severity: 'info' }));
    } catch (err) {
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
