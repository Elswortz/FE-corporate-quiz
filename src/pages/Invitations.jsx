import { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { showNotification } from '../features/notifications/store/notificationsSlice';
import { inviteUser } from '../features/companies/api/companiesApi';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import InvitationsList from '../features/companies/components/InvitationsList/InvitationsList';

const Invitations = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const { companyId } = useParams();

  const handleOpen = () => {
    setEmail('');
    setError('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = async () => {
    setIsLoading(true);
    try {
      await inviteUser({ company_id: companyId, invite_user_email: email });
      dispatch(showNotification({ message: `User with email ${email} invited`, severity: 'success' }));
    } catch (err) {
      setError(err.response?.data?.message);
      dispatch(
        showNotification({
          message: err.response?.data?.message || `User with email ${email} not found`,
          severity: 'error',
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ maxWidth: 1100, mx: 'auto', p: { xs: 2, md: 4 } }}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Invite
        </Button>

        <InvitationsList />

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Invite member</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={!!error}
              helperText={error}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleSend}>
              {isLoading ? 'Loading...' : 'Send'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Invitations;
