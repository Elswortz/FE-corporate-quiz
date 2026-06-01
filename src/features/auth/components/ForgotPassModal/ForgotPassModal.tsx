import { resetPassword } from '../../api/authApi';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField, Button } from '@mui/material';
import { showNotification } from '../../../notifications/store/notificationsSlice';
import { useAppDispatch } from '@/store/hooks';
import { useForm } from 'react-hook-form';
import { ForgotPasswordFormData, forgotPasswordSchema } from '../../schemas/authSchemas';
import { zodResolver } from '@hookform/resolvers/zod';

type ForgotPassModalProps = {
  open: boolean;
  onClose: () => void;
};

const ForgotPassModal = ({ open, onClose }: ForgotPassModalProps) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({ resolver: zodResolver(forgotPasswordSchema), defaultValues: { email: '' } });

  const onSubmit = async ({ email }: ForgotPasswordFormData) => {
    try {
      await resetPassword({ email });
      dispatch(
        showNotification({ message: `The reset email has been successfully sent to ${email}`, severity: 'success' })
      );
      reset();
      onClose();
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to reset password';
      dispatch(
        showNotification({
          message,
          severity: 'error',
        })
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reset your password</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Enter your email and we will send you a password reset email.
        </Typography>
        <TextField
          fullWidth
          label="E-mail"
          type="email"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email')}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit(onSubmit)} loading={isSubmitting} variant="contained">
          Отправить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPassModal;
