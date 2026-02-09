import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Microscope,
    History,
    Settings,
    LogOut,
    UserCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import OrbSymbol from './OrbSymbol';

const Sidebar = ({ activeTab, onTabChange }) => {
    const { logout } = useAuth();

    const menuItems = [
        { id: 'analyze', label: 'Workspace', icon: Microscope },
        { id: 'history', label: 'Records', icon: History },
        { id: 'profile', label: 'Profile', icon: UserCircle },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-slate-950 shadow-[4px_0_50px_rgba(0,0,0,0.5)] border-r border-white/5 flex-col py-12 z-50 overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-medical-500/10 to-transparent pointer-events-none" />

            {/* Logo area */}
            <div className="px-10 mb-16 relative z-10">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="relative flex items-center justify-center w-10 h-10">
                        <div className="absolute inset-0 bg-medical-500/30 blur-xl rounded-full scale-150 group-hover:bg-medical-500/50 transition-all duration-700 animate-pulse" />
                        <OrbSymbol size="sm" className="relative scale-110 group-hover:rotate-12 transition-transform duration-700" />
                    </div>
                    <div className="flex flex-col -space-y-1">
                        <span className="text-xl font-black text-white tracking-tighter italic">HEALTH<span className="text-medical-500 italic">AI</span></span>
                        <span className="text-[7px] font-black text-slate-500 uppercase tracking-[0.3em] leading-none">Intelligence Hub</span>
                    </div>
                </Link>
            </div>

            {/* Navigation items */}
            <nav className="flex-grow flex flex-col gap-2 px-4 relative z-10">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className={`relative w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${activeTab === item.id
                            ? 'bg-medical-600 text-white shadow-lg shadow-medical-600/30'
                            : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                            }`}
                    >
                        <item.icon className={`w-5 h-5 transition-colors ${activeTab === item.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>

                        {/* Active Indicator Glow */}
                        {activeTab === item.id && (
                            <motion.div
                                layoutId="activeIndicator"
                                className="absolute left-0 w-1 h-6 bg-white rounded-r-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                            />
                        )}
                    </button>
                ))}
            </nav>

            {/* Bottom Actions */}
            <div className="mt-auto px-6 pb-4 relative z-10">
                <div className="h-px bg-white/10 mx-4 mb-4" />
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-4 px-6 py-4 rounded-[2rem] text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all duration-500 group border border-transparent hover:border-red-400/20"
                >
                    <div className="p-2.5 rounded-full bg-white/5 group-hover:bg-red-400/20 transition-all shadow-inner">
                        <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    </div>
                    <div className="flex flex-col items-start leading-[1.1]">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-red-400 transition-colors">Sign Out</span>
                        <span className="text-[6px] font-black text-slate-600 uppercase tracking-widest group-hover:text-red-400/60 transition-colors">Terminate Session</span>
                    </div>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
