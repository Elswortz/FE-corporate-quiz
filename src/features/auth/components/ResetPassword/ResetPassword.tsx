import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import { confirmResetPassword } from '../../api/authApi';
import { useAppDispatch } from '@/store/hooks';
import { showNotification } from '../../../notifications/store/notificationsSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordFormData, resetPasswordSchema } from '../../schemas/authSchemas';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),

    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      if (!uid || !token) {
        throw new Error('Invalid or corrupted reset link');
      }

      await confirmResetPassword({
        uid,
        token,
        payload: {
          new_password: data.password,
        },
      });

      dispatch(
        showNotification({
          message: 'Your password has been successfully reset! You can log in',
          severity: 'success',
        })
      );

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Reset password failed';
      dispatch(
        showNotification({
          message,
          severity: 'error',
        })
      );
    }
  };

  if (!uid || !token) {
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        Invalid or corrupted reset link
      </Typography>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 400,
        margin: 'auto',
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h5" align="center">
        Password reset
      </Typography>

      <TextField
        label="Новый пароль"
        type="password"
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register('password')}
      />

      <TextField
        label="Повторите пароль"
        type="password"
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <Button type="submit" variant="contained" loading={isSubmitting}>
        Сбросить пароль
      </Button>
    </Box>
  );
};

export default ResetPassword;
