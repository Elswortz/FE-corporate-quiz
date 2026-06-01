import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, 'Old password is required'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Type your email').email('Incorrect email'),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Incorrect email'),
  password: z.string().min(1, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })

  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "The passwords don't match",
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
