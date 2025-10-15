import { useState } from 'react';
import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import * as Yup from 'yup';
import AlterLogin from '../AlterLogin/AlterLogin';
import { useTranslation } from 'react-i18next';
import { createUser } from '../../api/usersApi';

const schema = Yup.object().shape({
  firstName: Yup.string().required('Введите имя'),
  lastName: Yup.string().required('Введите фамилию'),
  email: Yup.string().email('Некорректный e-mail').required('Введите e-mail'),
  password: Yup.string()
    .min(6, 'Пароль должен быть не менее 6 символов')
    .required('Введите пароль'),
});

const RegistrationForm = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { t } = useTranslation('auth');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await schema.validate(form, { abortEarly: false });
      setErrors({});

      await createUser({
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        password: form.password,
      });

      setSuccessMessage('Регистрация прошла успешно!');
      setOpenSnackbar(true);

      setForm({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        const newErrors = {};
        error.inner.forEach(err => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        setSuccessMessage('Ошибка при регистрации. Попробуйте снова.');
        setOpenSnackbar(true);
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        max: 'auto',
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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={successMessage.includes('ошибка') ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegistrationForm;
