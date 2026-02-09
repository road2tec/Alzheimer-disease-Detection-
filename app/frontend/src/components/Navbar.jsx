import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, ShieldCheck, Menu, X, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import OrbSymbol from './OrbSymbol';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (location.pathname === '/dashboard') return null;

    return (
        <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-white/70 backdrop-blur-2xl border-b border-slate-200/50 py-3' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center text-nowrap">
                {/* Logo Section */}
                {location.pathname !== '/dashboard' && (
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                            <OrbSymbol size="sm" />
                        </div>
                        <div className="flex flex-col -space-y-1 invisible sm:visible">
                            <span className="text-lg font-black text-slate-900 tracking-tighter">HEALTH<span className="text-medical-600 italic">AI</span></span>
                            <div className="flex items-center gap-1">
                                <Zap className="w-2 h-2 text-medical-500 fill-medical-500" />
                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">Easy Brain Testing</span>
                            </div>
                        </div>
                    </Link>
                )}

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {location.pathname !== '/dashboard' && (
                        <div className="flex items-center gap-6">
                            {[
                                { name: 'Features', path: '/features' },
                                { name: 'Steps', path: '/how-it-works' },
                                { name: 'Why Us', path: '/why-us' },
                                { name: 'About', path: '/about' }
                            ].map((item) => (
                                <Link key={item.name} to={item.path} className="text-[10px] font-black text-slate-400 hover:text-medical-600 transition-colors uppercase tracking-widest">
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    )}

                    {location.pathname !== '/dashboard' && <div className="h-5 w-px bg-slate-100"></div>}

                    {user ? (
                        <div className="flex items-center gap-5">
                            {location.pathname !== '/dashboard' && (
                                <Link to="/dashboard" className="flex items-center gap-2 px-5 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all bg-slate-50 text-slate-500 hover:bg-slate-100">
                                    <OrbSymbol size="6" className="w-4 h-4 scale-75" /> WORKSPACE
                                </Link>
                            )}

                            {user.role === 'admin' && (
                                <Link to="/admin" className="p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all shadow-md">
                                    <ShieldCheck className="w-4 h-4" />
                                </Link>
                            )}

                            <div className="flex items-center gap-2.5 pl-2 group/user cursor-pointer">
                                <div className="flex flex-col items-end">
                                    <span className="text-[11px] font-black text-slate-900 leading-none group-hover/user:text-medical-600 transition-colors">{user.name}</span>
                                    <span className="text-[8px] font-black text-medical-500 uppercase leading-tight tracking-[0.1em] mt-0.5">{user.role}</span>
                                </div>
                                <div className="w-8 h-8 bg-gradient-to-tr from-slate-100 to-slate-50 rounded-lg flex items-center justify-center border border-slate-100 group-hover/user:border-medical-200 transition-all">
                                    <User className="w-4 h-4 text-slate-400" />
                                </div>
                                <button
                                    onClick={logout}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-6">
                            <Link to="/login" className="text-[10px] font-black text-slate-900 hover:text-medical-600 transition-colors uppercase tracking-[0.2em]">
                                Sign In
                            </Link>
                            <Link
                                to="/signup"
                                className="px-6 py-3.5 bg-slate-950 text-white text-[10px] font-black rounded-xl hover:bg-medical-600 transition-all duration-300 shadow-xl shadow-slate-950/10 flex items-center gap-2.5 active:scale-95 translate-y-[-1px]"
                            >
                                CREATE ACCOUNT
                                <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Trigger */}
                <button className="md:hidden p-3 bg-slate-50 rounded-2xl text-slate-900" onClick={() => setMobileMenu(!mobileMenu)}>
                    {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-3xl border-t border-slate-100 shadow-2xl p-8 space-y-6 overflow-hidden"
                    >
                        {!user ? (
                            <div className="space-y-4">
                                <Link to="/login" className="block py-4 text-center font-black text-slate-900 border border-slate-200 rounded-2xl" onClick={() => setMobileMenu(false)}>SIGN IN</Link>
                                <Link to="/signup" className="block py-5 px-6 bg-medical-600 text-white rounded-2xl text-center font-black shadow-xl" onClick={() => setMobileMenu(false)}>INITIALIZE ACCOUNT</Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <Link to="/dashboard" className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl font-black text-slate-900 shadow-sm" onClick={() => setMobileMenu(false)}>
                                    WORKSPACE <OrbSymbol size="sm" className="scale-75" />
                                </Link>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl font-black text-slate-900 shadow-sm" onClick={() => setMobileMenu(false)}>
                                        ADMIN PANEL <ShieldCheck className="w-5 h-5 text-medical-600" />
                                    </Link>
                                )}
                                <div className="h-px bg-slate-100"></div>
                                <button onClick={logout} className="w-full p-5 font-black text-red-500 bg-red-50 rounded-2xl flex items-center justify-center gap-2">
                                    <LogOut className="w-5 h-5" /> SECURE LOGOUT
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
