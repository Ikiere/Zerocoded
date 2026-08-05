import { useState } from 'react';
import { z } from 'zod';
import { ArrowRight, CheckCircle } from 'lucide-react';
import api from '@/lib/axios';
import { cn } from '@/utils/cn';

interface NewsletterFormProps {
  compact?: boolean;
}

export default function NewsletterForm({ compact = false }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = z.string().email().safeParse(email);
    if (!parsed.success) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    try {
      await api.post('/api/newsletter', { email });
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-success">
        <CheckCircle size={16} />
        <span className="text-sm font-medium">Subscribed successfully!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className={cn('flex gap-2', compact ? 'flex-row' : 'flex-col sm:flex-row')}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={cn(
            'flex-1 px-4 py-2.5 rounded-xl border border-border bg-white text-sm text-text',
            'placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
            'transition-all duration-200'
          )}
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={cn(
            'flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold',
            'hover:bg-primary-600 transition-colors duration-200 disabled:opacity-60 shrink-0'
          )}
          aria-label="Subscribe to newsletter"
        >
          {status === 'loading' ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <ArrowRight size={16} />
          )}
        </button>
      </div>
      {errorMsg && <p className="text-xs text-danger">{errorMsg}</p>}
    </form>
  );
}
