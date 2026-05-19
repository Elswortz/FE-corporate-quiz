import { Box, TextField, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlterLogin } from '@/features/auth/components';
import { createUser } from '../../api/usersApi';
import { createUserSchema, CreateUserFormData } from '../../schemas/usersSchemas';
import { showNotification } from '@/features/notifications/store/notificationsSlice';
import { useAppDispatch } from '@/store/hooks';

const defaultValues: CreateUserFormData = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
};

const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('auth');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues,
  });

  const onSubmit = async ({ first_name, last_name, email, password }: CreateUserFormData) => {
    try {
      await createUser({
        first_name,
        last_name,
        email,
        password,
      });

      dispatch(
        showNotification({
          message: 'Registration successful',
          severity: 'success',
        })
      );

      reset();
    } catch (err: any) {
      dispatch(
        showNotification({
          message: err.response?.data?.message || 'Registration failed',
          severity: 'error',
        })
      );
    }
  };

  return (
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
        {t('text.registerTitle')}
      </Typography>

      <TextField
        label={t('formFields.firstName')}
        error={!!errors.first_name}
        helperText={errors.first_name?.message}
        {...register('first_name')}
      />

      <TextField
        label={t('formFields.lastName')}
        error={!!errors.last_name}
        helperText={errors.last_name?.message}
        {...register('last_name')}
      />

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
        {t('buttons.registerBtn')}
      </Button>

      <AlterLogin />
    </Box>
  );
};

export default RegistrationForm;
