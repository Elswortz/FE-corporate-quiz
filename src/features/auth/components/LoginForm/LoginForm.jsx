import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logIn } from '../../store/authThunks';
import { loginSchema } from '../../../../utils/schemas';
import { showNotification } from '../../../notifications/store/notificationsSlice';
import { Box, TextField, Button, Typography, Link } from '@mui/material';

import AlterLogin from '../AlterLogin/AlterLogin';
import ForgotPassModal from '../ForgotPassModal/ForgotPassModal';

const LoginForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [forgotOpen, setForgotOpen] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation('auth');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = form;
    try {
      await loginSchema.validate(form, { abortEarly: false });
      setErrors({});
      await dispatch(logIn({ email, password })).unwrap();
      dispatch(showNotification({ message: 'Login successful', severity: 'success' }));
    } catch (err) {
      if (err.name === 'ValidationError' && err.inner) {
        const newErrors = {};
        err.inner.forEach(err => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        dispatch(showNotification({ message: err, severity: 'error' }));
      }
    }
  };

  return (
    <>
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
        <Link
          component="button"
          variant="body2"
          sx={{ textAlign: 'center', mt: 1 }}
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
