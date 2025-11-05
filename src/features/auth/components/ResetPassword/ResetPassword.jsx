import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import { confirmResetPassword } from '../../api/profileApi';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  password: Yup.string().min(6, 'Пароль должен быть не менее 6 символов').required('Введите новый пароль'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
    .required('Подтвердите пароль'),
});

const ResetPassword = () => {
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await schema.validate(form, { abortEarly: false });
      setErrors({});

      await confirmResetPassword(token, uid, form.password);

      setSuccess('Пароль успешно сброшен! Можете войти.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (validationError) {
      const newErrors = {};
      validationError.inner?.forEach(err => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  if (!uid || !token) {
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        Недействительная или повреждённая ссылка сброса.
      </Typography>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
        Сброс пароля
      </Typography>

      <TextField
        label="Новый пароль"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
      />

      <TextField
        label="Повторите пароль"
        name="confirmPassword"
        type="password"
        value={form.confirmPassword}
        onChange={handleChange}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
      />

      <Button type="submit" variant="contained">
        Сбросить пароль
      </Button>

      {success && (
        <Typography color="success.main" align="center">
          {success}
        </Typography>
      )}
    </Box>
  );
};

export default ResetPassword;
