import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Microscope,
    History,
    Settings,
    LogOut,
    UserCircle,
    Users,
    Activity,
    ShieldCheck,
    MessageSquareQuote,
    ClipboardList,
    Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import OrbSymbol from './OrbSymbol';

const Sidebar = ({ activeTab, onTabChange }) => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const menuItems = [
        // Admin
        { id: 'admin-hub', label: 'User Hub', icon: Users, roles: ['admin'] },
        { id: 'insights', label: 'System Overview', icon: LayoutDashboard, roles: ['admin'] },
        { id: 'admin-reviews', label: 'Moderate Reviews', icon: ShieldCheck, roles: ['admin'] },

        // Doctor
        { id: 'patients', label: 'My Patients', icon: Users, roles: ['doctor'] },
        { id: 'doctor-plans', label: 'Manage Plans', icon: ClipboardList, roles: ['doctor'] },
        { id: 'doctor-reviews', label: 'My Reviews', icon: MessageSquareQuote, roles: ['doctor'] },

        // User
        { id: 'analyze', label: 'Check Brain', icon: Microscope, roles: ['user'] },
        { id: 'history', label: 'Past Tests', icon: History, roles: ['user'] },
        { id: 'my-plans', label: 'Doctor Plans', icon: ClipboardList, roles: ['user'] },
        { id: 'feedback', label: 'Send Feedback', icon: MessageSquareQuote, roles: ['user'] },
    ];

    const filteredMenu = menuItems.filter(item => item.roles.includes(user.role));

    return (
        <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-white border-r border-slate-200 flex-col py-10 z-50">
            {/* Logo area */}
            <div className="px-8 mb-12">
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                        <OrbSymbol size="xs" color="white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-slate-900 tracking-tight leading-none">HealthAI</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Medical Platform</span>
                    </div>
                </Link>
            </div>

            {/* Navigation items */}
            <nav className="flex-grow flex flex-col gap-1.5 px-4 overflow-y-auto">
                {filteredMenu.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className={`relative w-full flex items-center gap-3.5 px-5 py-3.5 rounded-2xl transition-all group ${activeTab === item.id
                            ? 'bg-indigo-50 text-indigo-600'
                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                            }`}
                    >
                        <item.icon className={`w-5 h-5 transition-colors ${activeTab === item.id ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                        <span className="text-sm font-semibold">{item.label}</span>

                        {activeTab === item.id && (
                            <motion.div
                                layoutId="activeIndicator"
                                className="absolute right-3 w-1.5 h-1.5 bg-indigo-600 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]"
                            />
                        )}
                    </button>
                ))}
            </nav>

            {/* Bottom Actions */}
            <div className="px-4 pb-6">
                <div className="h-px bg-slate-100 mb-6 mx-4" />
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3.5 px-5 py-3.5 rounded-2xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all group"
                >
                    <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    <span className="text-sm font-semibold text-slate-600 group-hover:text-red-600 transition-colors">Log Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
