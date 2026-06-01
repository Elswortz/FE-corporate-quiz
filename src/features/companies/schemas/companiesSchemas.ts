import { z } from 'zod';

export const createCompanySchema = z.object({
  company_name: z.string().trim().min(1, 'Company name is required'),
  company_address: z.string().trim().min(1, 'Company adress is required'),
  company_email: z.string().trim().min(1, 'Company email is required').email('Incorrect email'),
  company_phone: z.string().trim().min(1, 'Company phone is required'),
  company_website: z.string().trim().min(1, 'Company website is required').url('Incorrect URL'),
  company_logo_url: z.string().trim().min(1, 'Company logo is required').url('Incorrect URL'),
  company_description: z.string().trim().min(1, 'Company description is required'),
  company_status: z.enum(['visible', 'hidden']),
});

export type CreateCompanyFormData = z.infer<typeof createCompanySchema>;

export const editCompanySchema = z.object({
  company_name: z.string().trim().min(1, 'Company name is required'),
  company_address: z.string().trim().min(1, 'Company adress is required'),
  company_phone: z.string().trim().min(1, 'Company phone is required'),
  company_website: z.string().trim().min(1, 'Company website is required').url('Incorrect URL'),
  company_description: z.string().trim().min(1, 'Company description is required'),
});

export type EditCompanyFormData = z.infer<typeof editCompanySchema>;
