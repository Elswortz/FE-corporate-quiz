import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Stack,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deepPurple } from '@mui/material/colors';
import { updateUser, updateUserAvatar, removeUser } from '../store/auth/operations';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector(state => state.auth);

  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || '');
      setLastName(user.last_name || '');
    }
  }, [user]);

  const handleSave = () => {
    dispatch(updateUser({ first_name: firstName, last_name: lastName }));
  };

  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar_file', file);

    dispatch(updateUserAvatar(formData));
  };

  const handleDelete = () => {
    dispatch(removeUser());
    setIsDialogOpen(false);
  };

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        mt: 5,
        p: 4,
        boxShadow: 3,
        borderRadius: 3,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant="h4" mb={3}>
        My Profile
      </Typography>

      <Stack direction="row" alignItems="center" spacing={3}>
        <Box>
          <Avatar
            src={user?.avatar_url || ''}
            sx={{ width: 100, height: 100, bgcolor: deepPurple[500] }}
          >
            {!user?.avatar_url && (user?.first_name?.[0] || '?')}
          </Avatar>
          <Button variant="outlined" component="label" size="small" sx={{ mt: 1 }}>
            Change Avatar
            <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
          </Button>
        </Box>
        <Box flex={1}>
          <Typography variant="body1" color="text.secondary">
            ID: {user?.id}
          </Typography>
          <TextField
            label="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField label="Email" value={user?.email || ''} fullWidth sx={{ mt: 2 }} disabled />
        </Box>
      </Stack>
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={handleSave} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
        </Button>
        <Button variant="outlined" color="error" onClick={() => setIsDialogOpen(true)}>
          Delete Account
        </Button>
      </Box>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Confirm Account Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your account? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserProfile;
