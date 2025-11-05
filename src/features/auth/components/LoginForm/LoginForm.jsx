import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logIn } from '../../store/authThunks';
import { resetPassword } from '../../api/profileApi';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import * as Yup from 'yup';
import AlterLogin from '../AlterLogin/AlterLogin';

const schema = Yup.object().shape({
  email: Yup.string().email('Некорректный e-mail').required('Введите e-mail'),
  password: Yup.string().min(6, 'Пароль должен быть не менее 6 символов').required('Введите пароль'),
});

const forgotSchema = Yup.object().shape({
  email: Yup.string().email('Некорректный e-mail').required('Введите e-mail'),
});

const LoginForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  const dispatch = useDispatch();
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

      const body = {
        email: form.email,
        password: form.password,
      };

      dispatch(logIn(body));
    } catch (validationError) {
      const newErrors = {};
      validationError.inner.forEach(err => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  const handleForgotSubmit = async e => {
    e.preventDefault();
    try {
      await forgotSchema.validate({ email: forgotEmail });
      setForgotError('');
      setForgotSuccess('');

      await resetPassword(forgotEmail);

      setForgotSuccess('Письмо для сброса отправлено на вашу почту.');
    } catch (err) {
      setForgotError(err.message);
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
          Забыли пароль? Сбросить пароль
        </Link>
        <AlterLogin />
      </Box>
      <Dialog open={forgotOpen} onClose={() => setForgotOpen(false)}>
        <DialogTitle>Сброс пароля</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Введите ваш e-mail, и мы отправим письмо для сброса пароля.
          </Typography>
          <TextField
            fullWidth
            label="E-mail"
            type="email"
            value={forgotEmail}
            onChange={e => setForgotEmail(e.target.value)}
            error={!!forgotError}
            helperText={forgotError}
          />
          {forgotSuccess && (
            <Typography color="success.main" sx={{ mt: 1 }}>
              {forgotSuccess}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setForgotOpen(false)}>Отмена</Button>
          <Button onClick={handleForgotSubmit} variant="contained">
            Отправить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoginForm;
