"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('suraksha_admin_auth') === 'true') {
      router.replace('/');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise(r => setTimeout(r, 900)); // Simulate network

    if (email === 'admin@suraksha.ai' && password === 'suraksha@2026') {
      localStorage.setItem('suraksha_admin_auth', 'true');
      router.replace('/');
    } else {
      setError('Invalid credentials. Use admin@suraksha.ai / suraksha@2026');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center relative overflow-hidden bg-slate-100">
      {/* Animated background blobs */}
      <div className="bg-mesh">
        <div className="bg-blob w-[500px] h-[500px] bg-indigo-200/60 top-[-100px] left-[-150px]" style={{ animationDelay: '0s' }} />
        <div className="bg-blob w-[400px] h-[400px] bg-violet-200/50 top-[40%] right-[-100px]" style={{ animationDelay: '-7s' }} />
        <div className="bg-blob w-[350px] h-[350px] bg-sky-200/40 bottom-[-80px] left-[30%]" style={{ animationDelay: '-13s' }} />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="glass-card p-10">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-4">
              <Shield size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">SurakshaAI</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Admin Command Center</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@suraksha.ai"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/80 text-slate-900 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white transition-all shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/80 text-slate-900 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white transition-all shadow-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
                <p className="text-xs font-semibold text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-600/30 transition-all text-sm mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Verifying...
                </span>
              ) : (
                <>
                  <LogIn size={16} />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 p-4 rounded-xl bg-indigo-50/80 border border-indigo-100">
            <p className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider mb-1.5">Demo Credentials</p>
            <p className="text-xs text-indigo-600 font-medium">📧 admin@suraksha.ai</p>
            <p className="text-xs text-indigo-600 font-medium mt-0.5">🔑 suraksha@2026</p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 font-medium mt-6">
          SurakshaAI © 2026 · Guidewire DEVTrails · Secure Admin Portal
        </p>
      </div>
    </div>
  );
}
