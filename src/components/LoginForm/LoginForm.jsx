import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import AlterLogin from '../AlterLogin/AlterLogin';

const schema = Yup.object().shape({
  email: Yup.string().email('Некорректный e-mail').required('Введите e-mail'),
  password: Yup.string()
    .min(6, 'Пароль должен быть не менее 6 символов')
    .required('Введите пароль'),
});

const LoginForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
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

      // логика логина
    } catch (validationError) {
      const newErrors = {};
      validationError.inner.forEach(err => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
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
        {t('text.loginTitle')}
      </Typography>
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
        {t('buttons.loginBtn')}
      </Button>
      <AlterLogin />
    </Box>
  );
};

export default LoginForm;
