import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, XCircle, Upload, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Input, { Textarea, Select } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import api from '@/lib/axios';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  company: z.string().min(1, 'Company name is required').max(200),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^\+?[\d\s\-().]{7,20}$/, 'Please enter a valid phone number'),
  budget: z.string().min(1, 'Please select a budget range'),
  projectType: z.string().min(1, 'Please select a project type'),
  timeline: z.string().min(1, 'Please select a timeline'),
  description: z.string().min(20, 'Please provide more detail (at least 20 characters)').max(5000),
  consentGiven: z.boolean().refine((v) => v === true, 'You must accept the privacy policy'),
});

type FormData = z.infer<typeof schema>;

const BUDGET_OPTIONS = [
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5k-10k', label: '$5,000 – $10,000' },
  { value: '10k-25k', label: '$10,000 – $25,000' },
  { value: '25k-50k', label: '$25,000 – $50,000' },
  { value: '50k-100k', label: '$50,000 – $100,000' },
  { value: 'over-100k', label: 'Over $100,000' },
];

const PROJECT_TYPES = [
  { value: 'website-design', label: 'Website Design' },
  { value: 'web-application', label: 'Web Application' },
  { value: 'mobile-app', label: 'Mobile App' },
  { value: 'ui-ux-design', label: 'UI/UX Design' },
  { value: 'branding', label: 'Branding & Identity' },
  { value: 'e-commerce', label: 'E-Commerce' },
  { value: 'api-development', label: 'API Development' },
  { value: 'ai-integration', label: 'AI Integration' },
  { value: 'custom-software', label: 'Custom Software' },
  { value: 'other', label: 'Other' },
];

const TIMELINE_OPTIONS = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1-month', label: 'Within 1 month' },
  { value: '1-3-months', label: '1–3 months' },
  { value: '3-6-months', label: '3–6 months' },
  { value: '6-months-plus', label: '6+ months' },
  { value: 'flexible', label: "I'm flexible" },
];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert('File must be under 10MB');
      return;
    }
    setAttachment(file);
  };

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    setErrorMessage('');
    try {
      await api.post('/api/quote', data);
      setStatus('success');
      reset();
      setAttachment(null);
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        className="flex flex-col items-center text-center py-12"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
          <CheckCircle size={32} className="text-success" />
        </div>
        <h3 className="text-xl font-bold text-secondary mb-2">Quote Request Received!</h3>
        <p className="text-muted max-w-sm mb-6">
          Thank you for reaching out. Our team will review your project details and get back to you within 24 hours.
        </p>
        <Button variant="outline" size="sm" onClick={() => setStatus('idle')}>
          Submit Another Request
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Full Name"
          placeholder="John Smith"
          error={errors.name?.message}
          required
          {...register('name')}
        />
        <Input
          label="Company"
          placeholder="Your Company"
          error={errors.company?.message}
          required
          {...register('company')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Email"
          type="email"
          placeholder="john@company.com"
          error={errors.email?.message}
          required
          {...register('email')}
        />
        <Input
          label="Phone"
          type="tel"
          placeholder="+1 234 567 8900"
          error={errors.phone?.message}
          required
          {...register('phone')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Select
          label="Budget Range"
          options={BUDGET_OPTIONS}
          placeholder="Select budget"
          error={errors.budget?.message}
          required
          {...register('budget')}
        />
        <Select
          label="Project Type"
          options={PROJECT_TYPES}
          placeholder="Select type"
          error={errors.projectType?.message}
          required
          {...register('projectType')}
        />
      </div>

      <Select
        label="Timeline"
        options={TIMELINE_OPTIONS}
        placeholder="Select timeline"
        error={errors.timeline?.message}
        required
        {...register('timeline')}
      />

      <Textarea
        label="Project Description"
        placeholder="Tell us about your project, goals, and any specific requirements..."
        rows={5}
        error={errors.description?.message}
        required
        {...register('description')}
      />

      {/* File upload */}
      <div>
        <label className="text-sm font-medium text-text block mb-1.5">
          Attachment <span className="text-muted font-normal">(optional, max 10MB)</span>
        </label>
        <div className="relative">
          {attachment ? (
            <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-surface">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Upload size={14} className="text-primary" />
              </div>
              <span className="text-sm text-secondary flex-1 truncate">{attachment.name}</span>
              <button
                type="button"
                onClick={() => setAttachment(null)}
                className="text-muted hover:text-danger transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-border bg-surface hover:border-primary/40 hover:bg-primary/2 transition-all cursor-pointer">
              <Upload size={20} className="text-muted mb-2" />
              <span className="text-sm text-muted">Click to upload or drag & drop</span>
              <span className="text-xs text-muted/60 mt-1">PDF, DOC, ZIP up to 10MB</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.zip,.png,.jpg,.jpeg"
                onChange={handleFile}
              />
            </label>
          )}
        </div>
      </div>

      {/* Consent checkbox */}
      <div className="flex items-start gap-3">
        <input
          id="consent"
          type="checkbox"
          className="mt-0.5 w-4 h-4 accent-primary cursor-pointer"
          {...register('consentGiven')}
        />
        <label htmlFor="consent" className="text-sm text-muted cursor-pointer leading-relaxed">
          I agree to the{' '}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>{' '}
          and consent to Zerocoded processing my data for this request.
        </label>
      </div>
      {errors.consentGiven && (
        <p className="text-xs text-danger -mt-3">{errors.consentGiven.message}</p>
      )}

      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            className="flex items-center gap-2 p-3 rounded-xl bg-danger/5 border border-danger/20 text-sm text-danger"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <XCircle size={16} className="shrink-0" />
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={status === 'loading'}
        className="w-full justify-center"
      >
        Submit Quote Request
      </Button>
    </form>
  );
}
