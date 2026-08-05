import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Helmet } from 'react-helmet-async';
import { Lock, User, AlertCircle } from 'lucide-react';
import api from '@/lib/axios';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setLoading(true);
      setError('');
      
      const response = await api.post('/api/admin/login', data);
      
      if (response.data?.success && response.data?.token) {
        localStorage.setItem('zc_token', response.data.token);
        navigate('/admin/dashboard');
      } else {
        setError('Authentication failed. Check your credentials.');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message || 'Login failed. Please verify credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login — Zerocoded</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-slate-950 px-4">
        <div className="w-full max-w-md">
          {/* Brand header */}
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Control Center</span>
            <h1 className="text-3xl font-extrabold text-secondary dark:text-white mt-1">zerocoded</h1>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-8 shadow-soft">
            <h2 className="text-lg font-bold text-secondary dark:text-white mb-6 flex items-center gap-2">
              <Lock size={18} className="text-primary" />
              Sign in to Dashboard
            </h2>

            {error && (
              <div className="mb-5 flex items-start gap-2 p-3 rounded-lg bg-danger/5 border border-danger/15 text-danger text-xs leading-relaxed">
                <AlertCircle size={15} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-secondary dark:text-white mb-1.5">Username</label>
                <div className="relative">
                  <Input
                    {...register('username')}
                    type="text"
                    placeholder="Enter admin username"
                    className="pl-9"
                    error={errors.username?.message}
                  />
                  <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary dark:text-white mb-1.5">Password</label>
                <div className="relative">
                  <Input
                    {...register('password')}
                    type="password"
                    placeholder="Enter password"
                    className="pl-9"
                    error={errors.password?.message}
                  />
                  <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full justify-center mt-2 shadow-primary"
                loading={loading}
              >
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
