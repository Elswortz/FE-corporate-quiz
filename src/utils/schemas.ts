import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Некорректный e-mail').required('Введите e-mail'),
  password: Yup.string().min(6, 'Пароль должен быть не менее 6 символов').required('Введите пароль'),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Некорректный e-mail').required('Введите e-mail'),
});

export const registrationSchema = Yup.object().shape({
  firstName: Yup.string().required('Введите имя'),
  lastName: Yup.string().required('Введите фамилию'),
  email: Yup.string().email('Некорректный e-mail').required('Введите e-mail'),
  password: Yup.string().min(6, 'Пароль должен быть не менее 6 символов').required('Введите пароль'),
});

export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string().min(6, 'Пароль должен быть не менее 6 символов').required('Введите новый пароль'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
    .required('Подтвердите пароль'),
});

export const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Введите старый пароль'),
  newPassword: Yup.string().min(6, 'Новый пароль должен быть не менее 6 символов').required('Введите новый пароль'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Пароли должны совпадать')
    .required('Подтвердите новый пароль'),
});
