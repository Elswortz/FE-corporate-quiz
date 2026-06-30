import { showNotification } from '../../../notifications/store/notificationsSlice';
import { changePassword } from '@/features/auth/api/authApi';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema, ChangePasswordFormData } from '../../schemas/authSchemas';
import { useAppDispatch } from '@/store/hooks';
import { useTranslation } from 'react-i18next';

type Props = {
  open: boolean;
  onClose: () => void;
};

const ChangePassModal = ({ open, onClose }: Props) => {
  const { t } = useTranslation('profile');
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
      <DialogTitle>{t('changePassModal.title')}</DialogTitle>

      <DialogContent>
        <TextField
          label={t('changePassModal.oldPass')}
          type="password"
          fullWidth
          sx={{ mt: 1 }}
          error={!!errors.oldPassword}
          helperText={errors.oldPassword?.message}
          {...register('oldPassword')}
        />

        <TextField
          label={t('changePassModal.newPass')}
          type="password"
          fullWidth
          sx={{ mt: 2 }}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
          {...register('newPassword')}
        />

        <TextField
          label={t('changePassModal.confirmPass')}
          type="password"
          fullWidth
          sx={{ mt: 2 }}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>{t('changePassModal.cancelBtn')}</Button>

        <Button variant="contained" loading={isSubmitting} onClick={handleSubmit(onSubmit)}>
          {t('changePassModal.saveBtn')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePassModal;
