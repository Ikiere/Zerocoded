import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Input, { Textarea, Select } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import api from '@/lib/axios';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  projectType: z.string().min(1, 'Please select a project type'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

type FormData = z.infer<typeof schema>;

const PROJECT_TYPES = [
  { value: 'website-design', label: 'Website Design' },
  { value: 'web-application', label: 'Web Application' },
  { value: 'mobile-app', label: 'Mobile App' },
  { value: 'ui-ux-design', label: 'UI/UX Design' },
  { value: 'branding', label: 'Branding & Identity' },
  { value: 'e-commerce', label: 'E-Commerce' },
  { value: 'api-development', label: 'API Development' },
  { value: 'ai-integration', label: 'AI Integration' },
  { value: 'other', label: 'Other' },
];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    setErrorMessage('');
    try {
      await api.post('/api/contact', data);
      setStatus('success');
      reset();
    } catch (err: unknown) {
      setStatus('error');
      const msg =
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.';
      setErrorMessage(msg);
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        className="flex flex-col items-center text-center py-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mb-4">
          <CheckCircle size={28} className="text-success" />
        </div>
        <h3 className="text-lg font-semibold text-secondary mb-2">Message Sent!</h3>
        <p className="text-sm text-muted mb-6">
          Thanks for reaching out. We'll get back to you within 24 hours.
        </p>
        <Button variant="outline" size="sm" onClick={() => setStatus('idle')}>
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <Input
        label="Your Name"
        placeholder="John Smith"
        error={errors.name?.message}
        required
        {...register('name')}
      />

      <Input
        label="Email"
        type="email"
        placeholder="john@company.com"
        error={errors.email?.message}
        required
        {...register('email')}
      />

      <Select
        label="Project Type"
        options={PROJECT_TYPES}
        placeholder="Select project type"
        error={errors.projectType?.message}
        required
        {...register('projectType')}
      />

      <Textarea
        label="Your Message"
        placeholder="Tell us about your project..."
        rows={4}
        error={errors.message?.message}
        required
        {...register('message')}
      />

      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            className="flex items-center gap-2 p-3 rounded-xl bg-danger/5 border border-danger/20 text-sm text-danger"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <XCircle size={16} className="shrink-0" />
            {errorMessage || 'Something went wrong. Please try again.'}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        variant="primary"
        size="md"
        loading={status === 'loading'}
        className="w-full justify-center"
      >
        Send Message
      </Button>
    </form>
  );
}
