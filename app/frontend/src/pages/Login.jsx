import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import OrbSymbol from '../components/OrbSymbol';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || "Neural link failed. Verify credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white relative overflow-hidden">
            {/* Left Panel: Immersive Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-950 relative items-center justify-center p-24 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>

                {/* Visual Focal Point: The New Ethereal Core */}
                <div className="relative z-10 w-full max-w-lg aspect-square scale-110">
                    {/* Ethereal background layers */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: 360,
                            borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 70%", "60% 40% 30% 70% / 50% 60% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 70%"]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-medical-500/10 blur-[80px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            rotate: -360,
                            borderRadius: ["60% 40% 30% 70% / 50% 60% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 70%", "60% 40% 30% 70% / 50% 60% 70% 40%"]
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-10 bg-indigo-500/20 blur-[60px]"
                    />

                    <div className="relative h-full w-full bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/10 flex flex-col items-center justify-center p-12 text-center group">
                        {/* Floating Particles Inside */}
                        <div className="absolute inset-0 pointer-events-none">
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        x: [Math.sin(i) * 50, Math.cos(i) * 80, Math.sin(i) * 50],
                                        y: [Math.cos(i) * 50, Math.sin(i) * 80, Math.cos(i) * 50],
                                        opacity: [0, 0.4, 0]
                                    }}
                                    transition={{ duration: 5 + i, repeat: Infinity }}
                                    className="absolute w-1 h-1 bg-white rounded-full"
                                    style={{ left: '50%', top: '50%' }}
                                />
                            ))}
                        </div>

                        <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-2xl mb-8 group-hover:scale-110 transition-all duration-500">
                            <OrbSymbol size="md" />
                        </div>

                        <h2 className="text-4xl font-black text-white tracking-tighter mb-4">
                            HEALTH<span className="text-medical-400 italic">AI</span>
                        </h2>
                        <p className="text-slate-400 font-medium leading-relaxed max-w-xs">
                            Easy brain testing for everyone.
                        </p>

                        <div className="mt-12 w-full space-y-4">
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    animate={{ width: ["0%", "100%"] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="h-full bg-medical-500/40"
                                ></motion.div>
                            </div>
                            <div className="flex justify-between text-[8px] font-black text-slate-500 tracking-[0.3em] uppercase">
                                <span>SECURE CONNECTION</span>
                                <span>ALL NODES ACTIVE</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Aesthetic Floating Elements */}
                <div className="absolute bottom-12 left-12 flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Node: 0x44FE</span>
                </div>
            </div>

            {/* Right Panel: Refined Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-24 relative">
                {/* Background Decor for Mobile */}
                <div className="lg:hidden absolute top-[-10%] right-[-10%] w-64 h-64 bg-medical-50 rounded-full blur-[100px] opacity-60"></div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-md"
                >
                    <div className="mb-12">
                        <Link to="/" className="lg:hidden inline-flex items-center gap-2 mb-8 group">
                            <OrbSymbol size="sm" />
                            <span className="text-medical-600 font-black text-xs tracking-widest uppercase">HEALTHAI</span>
                        </Link>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-3">WELCOME <span className="text-medical-600 italic">BACK</span></h2>
                        <p className="text-slate-500 font-medium tracking-tight">Sign in to check brain health.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3 text-red-600 text-[11px] font-black uppercase tracking-wide"
                            >
                                <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                            </motion.div>
                        )}

                        <div className="space-y-2 group">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-medical-600 transition-colors">Email Address</label>
                            <input
                                type="email"
                                placeholder="name@email.com"
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-medical-500 transition-all font-bold text-slate-900 placeholder:text-slate-300 text-sm"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2 group">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-medical-600 transition-colors">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-medical-500 transition-all font-bold text-slate-900 placeholder:text-slate-300 text-sm"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between px-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded-sm border-slate-200 text-medical-600 focus:ring-medical-500" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Keep Node Active</span>
                            </label>
                            <button
                                type="button"
                                onClick={() => {
                                    setEmail('admin@gmail.com');
                                    setPassword('admin123');
                                }}
                                className="text-[10px] font-black text-medical-600 uppercase tracking-widest hover:underline"
                            >
                                Login as Admin
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-slate-950 text-white font-black rounded-2xl shadow-2xl shadow-slate-900/20 hover:bg-medical-700 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:bg-slate-300 text-xs tracking-widest uppercase"
                        >
                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (
                                <>SIGN IN <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 text-center pt-8 border-t border-slate-50">
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">
                            New Researcher? <Link to="/signup" className="text-medical-600 ml-1 hover:underline underline-offset-4">Register Hub Profile</Link>
                        </p>
                        {/* Admin Default Credentials Hint */}
                        <div className="p-4 bg-medical-50/50 rounded-2xl border border-medical-100 inline-block">
                            <p className="text-[9px] font-black text-medical-600 uppercase tracking-widest mb-1">Demo Admin Node</p>
                            <p className="text-[10px] font-bold text-slate-500">admin@gmail.com / admin123</p>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col items-center gap-4 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                        <div className="flex items-center gap-6">
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em]">HIPAA COMPLIANT</span>
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em]">AES-256 SECURED</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
