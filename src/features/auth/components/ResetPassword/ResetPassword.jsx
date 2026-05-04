import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import { confirmResetPassword } from '../../api/authApi';
import { resetPasswordSchema } from '../../../../utils/schemas';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../notifications/store/notificationsSlice';

const ResetPassword = () => {
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await resetPasswordSchema.validate(form, { abortEarly: false });
      setErrors({});

      await confirmResetPassword(token, uid, form.password);

      dispatch(
        showNotification({ message: 'Your password has been successfully reset! You can log in', severity: 'success' })
      );

      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      if (err.name === 'ValidationError' && err.inner) {
        const newErrors = {};
        err.inner?.forEach(err => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        dispatch(
          showNotification({ message: err.response?.data?.message || 'Reset password failed', severity: 'error' })
        );
      }
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
        Password reset
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
    </Box>
  );
};

export default ResetPassword;
