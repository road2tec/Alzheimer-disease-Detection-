import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, ArrowRight, Loader2, AlertCircle, ShieldCheck, User, Shield } from 'lucide-react';
import OrbSymbol from '../components/OrbSymbol';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await signup(formData.name, formData.email, formData.password, formData.role);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || "Registration hub error. Consult admin.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white relative overflow-hidden">
            {/* Left Panel: Immersive Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-950 relative items-center justify-center p-24 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>

                {/* Visual Focal Point: Ethereal Neural Core */}
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

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-2xl mb-8 group-hover:scale-110 transition-all duration-500"
                        >
                            <UserPlus className="text-white w-12 h-12" />
                        </motion.div>

                        <h2 className="text-4xl font-black text-white tracking-tighter mb-4">
                            CREATE<span className="text-medical-400 italic">ACCOUNT</span>
                        </h2>
                        <p className="text-slate-400 font-medium leading-relaxed max-w-xs">
                            Start your brain health journey today.
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
                                <span>INITIALIZING NODE</span>
                                <span>READY FOR DATA</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Aesthetic Floating Elements */}
                <div className="absolute bottom-12 left-12 flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-medical-400 animate-pulse"></div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Registration Status: OPEN</span>
                </div>
            </div>

            {/* Right Panel: Refined Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-24 relative overflow-y-auto">
                {/* Background Decor for Mobile */}
                <div className="lg:hidden absolute top-[-10%] right-[-10%] w-64 h-64 bg-medical-50 rounded-full blur-[100px] opacity-60"></div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-md"
                >
                    <div className="mb-10">
                        <Link to="/" className="lg:hidden inline-flex items-center gap-2 mb-8 group">
                            <OrbSymbol size="sm" />
                            <span className="text-medical-600 font-black text-xs tracking-widest uppercase">HEALTHAI</span>
                        </Link>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-3">CREATE <span className="text-medical-600 italic">ACCOUNT</span></h2>
                        <p className="text-slate-500 font-medium tracking-tight">Start your brain health journey today.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
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
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-medical-600 transition-colors">Your Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-medical-500 transition-all font-bold text-slate-900 placeholder:text-slate-300 text-sm"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2 group">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-medical-600 transition-colors">Email Address</label>
                            <input
                                type="email"
                                placeholder="name@email.com"
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-medical-500 transition-all font-bold text-slate-900 placeholder:text-slate-300 text-sm"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2 group">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-medical-600 transition-colors">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-medical-500 transition-all font-bold text-slate-900 placeholder:text-slate-300 text-sm"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>

                        {/* Role selection removed for security - users are 'user' by default */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-slate-950 text-white font-black rounded-2xl shadow-2xl shadow-slate-900/20 hover:bg-medical-700 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:bg-slate-300 text-xs tracking-widest uppercase"
                        >
                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (
                                <>CREATE ACCOUNT <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 text-center pt-8 border-t border-slate-50">
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                            Authorized Already? <Link to="/login" className="text-medical-600 ml-1 hover:underline underline-offset-4">Secure Sign In</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;
