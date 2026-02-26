import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ShieldCheck, ChevronRight, ArrowRight, Loader2, ShieldAlert } from 'lucide-react';
import OrbSymbol from '../components/OrbSymbol';

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const loggedInUser = await login(email, password);
            if (loggedInUser.role === 'admin') navigate('/admin');
            else if (loggedInUser.role === 'doctor') navigate('/doctor');
            else navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || "Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/5 blur-[100px] rounded-full" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Brand Logo */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-xl mb-6">
                        <OrbSymbol size="sm" />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 tracking-tight leading-none">HealthAI</h1>
                    <p className="text-slate-500 font-medium mt-2">Welcome back to your portal</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl p-10">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 tracking-tight mb-1">Sign In</h2>
                        <p className="text-slate-500 text-sm font-medium">Please enter your details to continue.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all font-semibold text-slate-900"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all font-semibold text-slate-900"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm font-bold"
                            >
                                <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                                <span>{error}</span>
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 bg-slate-950 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-3 hover:bg-indigo-600 active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>Sign In Now</span>
                                    <ChevronRight className="w-5 h-5" />
                                </>
                            )}
                        </button>

                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={() => {
                                    setEmail('admin@gmail.com');
                                    setPassword('admin123');
                                }}
                                className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors"
                            >
                                Use Demo Admin Account
                            </button>
                        </div>
                    </form>

                    <div className="mt-10 pt-8 border-t border-slate-50 flex flex-col items-center gap-4">
                        <p className="text-slate-400 text-sm font-medium">New to HealthAI?</p>
                        <Link
                            to="/signup"
                            className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors flex items-center gap-2 group"
                        >
                            Create an Account
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                <div className="mt-10 flex items-center justify-center gap-2 text-slate-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Secure & HIPAA Compliant</span>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
