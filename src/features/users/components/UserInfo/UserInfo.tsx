import { Box, Typography, TextField, Button, CircularProgress, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import { updateUser, updateUserAvatar, removeUser } from '../../store/usersThunks';
import {
  selectUserProfileData,
  selectUpdateUserLoading,
  selectUpdateUserAvatarLoading,
  selectRemoveUserLoading,
} from '../../store/usersSelectors';
import { showNotification } from '../../../notifications/store/notificationsSlice';

import PersonIcon from '@mui/icons-material/Person';

import ChangePassModal from '../../../auth/components/ChangePassModal/ChangePassModal';
import ConfirmModal from '../../../../components/ui/ConfirmModal/ConfirmModal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useNavigate } from 'react-router-dom';
import { selectIsSSOAuth } from '@/features/auth/store/authSelectors';
import ImageUploader from '@/components/ui/ImageUpload/ImageUpload';

const UserInfo = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectUserProfileData);
  const editLoading = useAppSelector(selectUpdateUserLoading);
  const removeLoading = useAppSelector(selectRemoveUserLoading);
  const changeAvatarLoading = useAppSelector(selectUpdateUserAvatarLoading);
  const isSSOAuth = useAppSelector(selectIsSSOAuth);

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

  const handleAvatarChange = async (file: File) => {
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
      navigate('/');
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
        mx: 'auto',
        p: 4,
        boxShadow: 2,
        borderRadius: 1,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant="h4" mb={3}>
        My Profile
      </Typography>

      <Stack direction="row" alignItems="center" spacing={3}>
        <Box>
          <ImageUploader
            src={user.avatar_url}
            alt={user.email}
            size={100}
            loading={changeAvatarLoading}
            fallback={<PersonIcon fontSize="large" />}
            onUpload={handleAvatarChange}
          />
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
        {!isSSOAuth && (
          <Button variant="outlined" color="secondary" onClick={() => setIsPassChangeOpen(true)}>
            Change Password
          </Button>
        )}
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
