import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { KeyRound, Mail, AlertCircle, ShoppingBag, User as UserIcon, Sparkles } from 'lucide-react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { motion } from 'framer-motion';

export const Login: React.FC = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Mode: 'login' or 'register'
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('ZenithSecureStore@2026!');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [googleClientId, setGoogleClientId] = useState<string | null>(null);

  useEffect(() => {
    const fetchGoogleClientId = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/google-client-id');
        if (response.data.clientId) {
          setGoogleClientId(response.data.clientId);
        }
      } catch (err) {
        console.warn('Failed to fetch Google Client ID from backend.');
      }
    };
    fetchGoogleClientId();
  }, []);

  const from = (location.state as any)?.from?.pathname || '/';

  // Demo Login Auto-Fill
  const handleAutoFillDemo = () => {
    setAuthMode('login');
    setEmail('user@example.com');
    setPassword('ZenithSecureStore@2026!');
    setError('');
    setSuccessMsg('Demo credentials auto-filled! Click Sign In or submit.');
  };

  const handleSimulatedGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      const mockCredential = 'mock_google_token_11223344_google-user@example.com_Google-User';
      await loginWithGoogle(mockCredential);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Simulated Google login failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    setError('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (authMode === 'register') {
      if (!fullName.trim()) {
        setError('Full Name is required for registration.');
        return false;
      }
    }

    if (!email.trim() || !emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }

    if (authMode === 'register' && password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (authMode === 'register') {
        // Register simulation
        setSuccessMsg('Account created successfully! Logging you in...');
        await login(email, password);
      } else {
        await login(email, password);
      }
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12 sm:px-6 lg:px-8 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-6 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl"
      >
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary-600 to-indigo-500 text-white shadow-md">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {authMode === 'login' ? 'Sign In to ZenithStore' : 'Create New Account'}
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {authMode === 'login'
              ? 'Welcome back! Access your profile and orders.'
              : 'Join ZenithStore to unlock exclusive member perks.'}
          </p>
        </div>

        {/* Auth Mode Toggle Tabs (Login vs Register) */}
        <div className="flex rounded-2xl bg-slate-100 dark:bg-slate-800 p-1">
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setError('');
              setSuccessMsg('');
            }}
            className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
              authMode === 'login'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Sign In (Login)
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('register');
              setError('');
              setSuccessMsg('');
            }}
            className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
              authMode === 'register'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Register (New Account)
          </button>
        </div>

        {/* Status Error & Success Banners */}
        {error && (
          <div className="flex items-center space-x-2 rounded-xl border border-rose-100 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/40 p-3.5 text-xs font-semibold text-rose-600 dark:text-rose-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="flex items-center space-x-2 rounded-xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/40 p-3.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <Sparkles className="h-4 w-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Demo User Auto-Fill Button */}
        <button
          type="button"
          onClick={handleAutoFillDemo}
          className="w-full flex items-center justify-center space-x-2 rounded-xl border border-primary-200 dark:border-primary-800 bg-primary-50/60 dark:bg-primary-950/40 px-4 py-2.5 text-xs font-bold text-primary-700 dark:text-primary-300 hover:bg-primary-100/60 transition-all"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary-500" />
          <span>Auto-Fill Demo Credentials (Instant Test)</span>
        </button>

        {/* Auth Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {/* Register Mode Full Name */}
          {authMode === 'register' && (
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <UserIcon className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>
          )}

          {/* Email Address */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <KeyRound className="h-4 w-4" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Register Mode Confirm Password */}
          {authMode === 'register' && (
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <KeyRound className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 py-3.5 text-sm font-semibold text-white shadow-md transition-all disabled:bg-slate-400"
            >
              {isSubmitting ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
              ) : (
                <span>{authMode === 'login' ? 'Sign In' : 'Create Account'}</span>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold uppercase tracking-wider">Or</span>
            <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
          </div>

          {/* Google Social Sign In Options */}
          <div className="flex flex-col space-y-3 items-center justify-center">
            {googleClientId && (
              <div className="w-full flex justify-center">
                <GoogleOAuthProvider clientId={googleClientId} locale="en">
                  <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                      if (credentialResponse.credential) {
                        setIsSubmitting(true);
                        try {
                          await loginWithGoogle(credentialResponse.credential);
                          navigate(from, { replace: true });
                        } catch (err: any) {
                          setError(err.message || 'Google Login failed.');
                        } finally {
                          setIsSubmitting(false);
                        }
                      }
                    }}
                    onError={() => {
                      setError('Google Sign-In was unsuccessful. Please check Console.');
                    }}
                    useOneTap
                  />
                </GoogleOAuthProvider>
              </div>
            )}

            {/* Simulated Google Login for Local Offline Testing */}
            <button
              type="button"
              onClick={handleSimulatedGoogleLogin}
              className="w-full flex items-center justify-center space-x-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 py-3 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm transition-all"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.19 2.7 1.24 6.645l4.026 3.12z"
                />
                <path
                  fill="#4285F4"
                  d="M20.64 12.205c0-.655-.054-1.29-.164-1.909H12v3.782h4.845a4.14 4.14 0 0 1-1.796 2.718l4.027 3.123c2.355-2.173 3.564-5.364 3.564-9.714z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.266 14.235L1.24 17.355A11.947 11.947 0 0 0 12 24c3.055 0 5.782-1.009 7.69-2.736l-4.027-3.123c-1.127.755-2.564 1.209-4.164 1.209a7.077 7.077 0 0 1-6.236-5.115z"
                />
                <path
                  fill="#34A853"
                  d="M1.24 6.645a11.876 11.876 0 0 0 0 10.71l4.026-3.12a7.077 7.077 0 0 1 0-4.47L1.24 6.645z"
                />
              </svg>
              <span>Sign In with Google (Social Login)</span>
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
};
