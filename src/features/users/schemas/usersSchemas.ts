import { z } from 'zod';

export const createUserSchema = z.object({
  first_name: z.string().trim().min(1, 'Company name is required'),
  last_name: z.string().trim().min(1, 'Company adress is required'),
  email: z.string().trim().min(1, 'Company email is required').email('Incorrect email'),
  password: z.string().trim().min(1, 'Company phone is required'),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;
