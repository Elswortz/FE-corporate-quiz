import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { useTranslation } from 'react-i18next';
import { logIn } from '../../store/authThunks';
import { showNotification } from '../../../notifications/store/notificationsSlice';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, loginSchema } from '../../schemas/authSchemas';

import AlterLogin from '../AlterLogin/AlterLogin';
import ForgotPassModal from '../ForgotPassModal/ForgotPassModal';

const LoginForm = () => {
  const [forgotOpen, setForgotOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('auth');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(logIn(data)).unwrap();

      dispatch(
        showNotification({
          message: 'Login successful',
          severity: 'success',
        })
      );
    } catch (error: any) {
      dispatch(
        showNotification({
          message: error,
          severity: 'error',
        })
      );
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          maxWidth: 400,
          width: '100%',
          mx: 'auto',
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          {t('text.loginTitle')}
        </Typography>

        <TextField
          label={t('formFields.email')}
          type="email"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email')}
        />

        <TextField
          label={t('formFields.password')}
          type="password"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register('password')}
        />

        <Button type="submit" variant="contained" color="primary" loading={isSubmitting}>
          {t('buttons.loginBtn')}
        </Button>

        <Link
          component="button"
          variant="body2"
          sx={{
            textAlign: 'center',
            mt: 1,
          }}
          onClick={() => setForgotOpen(true)}
        >
          Forgot your password? Reset password
        </Link>

        <AlterLogin />
      </Box>

      <ForgotPassModal open={forgotOpen} onClose={() => setForgotOpen(false)} />
    </>
  );
};

export default LoginForm;
