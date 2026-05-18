import { showNotification } from '../../../notifications/store/notificationsSlice';
import { changePassword } from '@/features/auth/api/authApi';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema, ChangePasswordFormData } from '../../schemas/authSchemas';
import { useAppDispatch } from '@/store/hooks';

type Props = {
  open: boolean;
  onClose: () => void;
};

const ChangePassModal = ({ open, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setError,

    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),

    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      await changePassword({
        old_password: data.oldPassword,
        new_password: data.newPassword,
      });

      dispatch(
        showNotification({
          message: 'Password changed successfully',
          severity: 'success',
        })
      );

      reset();
      onClose();
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to change password';

      dispatch(
        showNotification({
          message,
          severity: 'error',
        })
      );

      if (error.response?.status === 400) {
        setError('oldPassword', {
          message: 'Wrong old password',
        });
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change Password</DialogTitle>

      <DialogContent>
        <TextField
          label="Old Password"
          type="password"
          fullWidth
          sx={{ mt: 1 }}
          error={!!errors.oldPassword}
          helperText={errors.oldPassword?.message}
          {...register('oldPassword')}
        />

        <TextField
          label="New Password"
          type="password"
          fullWidth
          sx={{ mt: 2 }}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
          {...register('newPassword')}
        />

        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          sx={{ mt: 2 }}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" loading={isSubmitting} onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePassModal;
