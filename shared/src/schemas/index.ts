import { z } from 'zod';

// Contact form schema
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(254, 'Email must not exceed 254 characters'),
  projectType: z
    .string()
    .min(1, 'Please select a project type')
    .max(100, 'Project type is too long'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must not exceed 2000 characters'),
});

// Quote form schema
export const quoteSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters'),
  company: z
    .string()
    .min(1, 'Company name is required')
    .max(200, 'Company name must not exceed 200 characters'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(254, 'Email must not exceed 254 characters'),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-().]{7,20}$/, 'Please enter a valid phone number'),
  budget: z.enum([
    'under-5k',
    '5k-10k',
    '10k-25k',
    '25k-50k',
    '50k-100k',
    'over-100k',
  ], { errorMap: () => ({ message: 'Please select a budget range' }) }),
  projectType: z.enum([
    'website-design',
    'web-application',
    'mobile-app',
    'ui-ux-design',
    'branding',
    'e-commerce',
    'api-development',
    'ai-integration',
    'custom-software',
    'other',
  ], { errorMap: () => ({ message: 'Please select a project type' }) }),
  timeline: z.enum([
    'asap',
    '1-month',
    '1-3-months',
    '3-6-months',
    '6-months-plus',
    'flexible',
  ], { errorMap: () => ({ message: 'Please select a timeline' }) }),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(5000, 'Description must not exceed 5000 characters'),
  consentGiven: z
    .boolean()
    .refine((val: boolean) => val === true, 'You must consent to our privacy policy'),
});

// Newsletter schema
export const newsletterSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(254, 'Email must not exceed 254 characters'),
});

// Inferred types
export type ContactSchema = z.infer<typeof contactSchema>;
export type QuoteSchema = z.infer<typeof quoteSchema>;
export type NewsletterSchema = z.infer<typeof newsletterSchema>;
