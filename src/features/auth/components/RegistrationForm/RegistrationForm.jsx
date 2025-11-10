import { useState } from 'react';
import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import AlterLogin from '../AlterLogin/AlterLogin';
import { useTranslation } from 'react-i18next';
import { createUser } from '../../api/authApi';
import { registrationSchema } from '../../../../utils/schemas';
import { showNotification } from '../../../notifications/store/notificationsSlice';
import { useDispatch } from 'react-redux';

const RegistrationForm = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { t } = useTranslation('auth');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await registrationSchema.validate(form, { abortEarly: false });
      setErrors({});

      await createUser({
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        password: form.password,
      });

      dispatch(showNotification({ message: 'Registration successful', severity: 'success' }));

      setForm({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
    } catch (err) {
      if (err.name === 'ValidationError') {
        const newErrors = {};
        err.inner.forEach(err => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        dispatch(
          showNotification({ message: err.response?.data?.message || 'Registration failed', severity: 'error' })
        );
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        required
        error={!!errors.firstName}
        helperText={errors.firstName}
      />
      <TextField
        label={t('formFields.lastName')}
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        required
        error={!!errors.lastName}
        helperText={errors.lastName}
      />
      <TextField
        label={t('formFields.email')}
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label={t('formFields.password')}
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
        error={!!errors.password}
        helperText={errors.password}
      />
      <Button type="submit" variant="contained" color="primary">
        {t('buttons.registerBtn')}
      </Button>
      <AlterLogin />
    </Box>
  );
};

export default RegistrationForm;
