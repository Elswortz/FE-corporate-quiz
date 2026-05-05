import { Box, Avatar, Typography, TextField, Button, CircularProgress, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, updateUserAvatar, removeUser } from '../../store/usersThunks';
import {
  selectProfileData,
  selectUpdateUserLoading,
  selectUpdateUserAvatarLoading,
  selectRemoveUserLoading,
} from '../../store/usersSelectors';
import { showNotification } from '../../../notifications/store/notificationsSlice';

import PersonIcon from '@mui/icons-material/Person';

import ChangePassModal from '../../../auth/components/ChangePassModal/ChangePassModal';
import ConfirmModal from '../../../../components/ui/ConfirmModal/ConfirmModal';

const UserInfo = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectProfileData);
  const editLoading = useSelector(selectUpdateUserLoading);
  const removeLoading = useSelector(selectRemoveUserLoading);
  const changeAvatarLoading = useSelector(selectUpdateUserAvatarLoading);

  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');

  const [isConfirmDelOpen, setIsConfirmDelOpen] = useState(false);
  const [isPassChangeOpen, setIsPassChangeOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || '');
      setLastName(user.last_name || '');
    }
  }, [user]);

  const handleSave = async () => {
    try {
      await dispatch(updateUser({ first_name: firstName, last_name: lastName })).unwrap();
      dispatch(showNotification({ message: 'User information has been updated successfully', severity: 'success' }));
    } catch (error) {
      dispatch(
        showNotification({
          message: error || 'Failed to update user information',
          severity: 'error',
        })
      );
    }
  };

  const handleAvatarChange = async e => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar_file', file);

    try {
      await dispatch(updateUserAvatar(formData)).unwrap();
      dispatch(showNotification({ message: 'Avatar successfully updated', severity: 'success' }));
    } catch (error) {
      dispatch(
        showNotification({
          message: error || 'Failed to update user avatar',
          severity: 'error',
        })
      );
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(removeUser()).unwrap();
      dispatch(showNotification({ message: 'The account has been successfully deleted.', severity: 'info' }));
      setIsConfirmDelOpen(false);
    } catch (error) {
      dispatch(
        showNotification({
          message: error || 'Failed to delete account',
          severity: 'error',
        })
      );
    }
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
        maxWidth: 1000,
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
          <Box sx={{ position: 'relative', width: 100, height: 100 }}>
            <Avatar src={user?.avatar_url || ''} sx={{ width: 100, height: 100 }}>
              {!user?.avatar_url && !changeAvatarLoading && <PersonIcon fontSize={'large'} />}
            </Avatar>
            {changeAvatarLoading && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: '50%',
                  zIndex: 1,
                }}
              />
            )}
            {changeAvatarLoading && (
              <CircularProgress
                size={36}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-18px',
                  marginLeft: '-18px',
                  zIndex: 2,
                  color: 'primary.main',
                }}
              />
            )}
          </Box>
          <Button variant="outlined" component="label" size="small" sx={{ mt: 1 }}>
            Upload
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
        <Button variant="contained" color="primary" onClick={handleSave} loading={editLoading}>
          Save Changes
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => setIsPassChangeOpen(true)}>
          Change Password
        </Button>
        <Button variant="outlined" color="error" onClick={() => setIsConfirmDelOpen(true)}>
          Delete Account
        </Button>
      </Box>

      <ConfirmModal
        isOpen={isConfirmDelOpen}
        title={'Confirm Account Deletion'}
        description={'Are you sure you want to delete your account? This action cannot be undone.'}
        confirmText={'Delete'}
        confirmColor={'error'}
        onConfirm={handleDelete}
        onCancel={() => setIsConfirmDelOpen(false)}
        isLoading={removeLoading}
      />

      <ChangePassModal open={isPassChangeOpen} onClose={() => setIsPassChangeOpen(false)} />
    </Box>
  );
};

export default UserInfo;
