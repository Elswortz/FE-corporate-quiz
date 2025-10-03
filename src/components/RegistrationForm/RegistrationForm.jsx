import { useState } from 'react';
import { Box, TextField, Button, Typography, Divider } from '@mui/material';
import * as Yup from 'yup';

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

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleGoogleLogin = () => {};

  const handleAzureLogin = () => {};

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await schema.validate(form, { abortEarly: false });
      setErrors({});

      // логика регистрации
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
        Registration
      </Typography>
      <TextField
        label="First name"
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        required
        error={!!errors.firstName}
        helperText={errors.firstName}
      />
      <TextField
        label="Last name"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        required
        error={!!errors.lastName}
        helperText={errors.lastName}
      />
      <TextField
        label="E-mail"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
        error={!!errors.password}
        helperText={errors.password}
      />
      <Button type="submit" variant="contained" color="primary">
        Register
      </Button>
      <Divider sx={{ my: 2 }}>OR</Divider>
      <Button variant="outlined" color="primary" onClick={handleGoogleLogin}>
        Войти с помощью Google
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleAzureLogin}>
        Войти с помощью Azure
      </Button>
    </Box>
  );
};

export default RegistrationForm;
