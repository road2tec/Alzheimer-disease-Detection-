import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UploadMRI from '../dashboard/UploadMRI';
import Results from '../dashboard/Results';
import History from '../dashboard/History';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Activity, ShieldCheck, Clock, Download, Share2, MoreHorizontal, UserCircle, Settings } from 'lucide-react';

const UserDashboard = () => {
    const { user } = useAuth();
    const [lastResult, setLastResult] = useState(null);
    const [activeTab, setActiveTab] = useState('analyze');
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const stats = [
        { label: 'Analyses Run', value: '12', icon: Activity, color: 'text-indigo-500' },
        { label: 'Model Confidence', value: '98.4%', icon: ShieldCheck, color: 'text-medical-500' },
        { label: 'Cloud Status', value: 'Optimal', icon: Sparkles, color: 'text-amber-500' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex overflow-hidden">
            {/* Sidebar Navigation */}
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Main Content Area */}
            <main className="flex-grow ml-0 lg:ml-72 px-6 py-4 lg:px-12 lg:py-8 relative overflow-y-auto">
                {/* Ethereal Background Element */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-medical-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Immersive Header */}
                    <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3 mb-4"
                            >
                                <div className="bg-medical-100 text-medical-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-medical-200">
                                    Secure Workspace
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                    <Clock className="w-3 h-3" />
                                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                </div>
                            </motion.div>
                            <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-2">
                                Hello, {user.name.split(' ')[0]}<span className="text-medical-600">.</span>
                            </h1>
                            <p className="text-slate-500 font-medium">Your Health Intelligence Workspace is active and synchronized.</p>
                        </div>

                        {/* Top-Right Profile & Stats Area */}
                        <div className="flex flex-col items-end gap-6">
                            {/* Profile Badge */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm"
                            >
                                <div className="flex flex-col items-end">
                                    <span className="text-xs font-black text-slate-900 leading-none">{user.name}</span>
                                    <span className="text-[8px] font-black text-medical-500 uppercase tracking-widest mt-1">{user.role}</span>
                                </div>
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 text-slate-400">
                                    <UserCircle className="w-6 h-6" />
                                </div>
                            </motion.div>

                            {/* Stats Grid */}
                            <div className="flex gap-4">
                                {stats.map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                        className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm min-w-[180px]"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className={`p-2 rounded-xl bg-slate-50 ${stat.color}`}>
                                                <stat.icon className="w-4 h-4" />
                                            </div>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                                        </div>
                                        <div className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </header>

                    {/* Content Section */}
                    <AnimatePresence mode="wait">
                        <motion.section
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white p-12 shadow-2xl shadow-slate-200/50 min-h-[60vh]"
                        >
                            {activeTab === 'analyze' && (
                                <div className="max-w-4xl mx-auto">
                                    <UploadMRI onResult={(res) => setLastResult(res)} />

                                    {lastResult && (
                                        <div className="mt-16 pt-16 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
                                            <div className="flex items-center justify-between mb-8 px-4 text-center mx-auto">
                                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Diagnostic Summary</h3>
                                                <div className="flex gap-2">
                                                    <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-medical-600 transition-all"><Download className="w-5 h-5" /></button>
                                                    <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-medical-600 transition-all"><Share2 className="w-5 h-5" /></button>
                                                </div>
                                            </div>
                                            <Results result={lastResult} />
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'history' && <History />}

                            {activeTab === 'profile' && (
                                <div className="flex flex-col items-center justify-center h-full text-center p-12">
                                    <div className="w-24 h-24 bg-medical-100 text-medical-600 rounded-full flex items-center justify-center mb-6">
                                        <UserCircle className="w-12 h-12" />
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{user.name}</h2>
                                    <p className="text-slate-500 font-medium mb-8">{user.email}</p>
                                    <div className="px-4 py-2 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full">Explorer Tier</div>
                                </div>
                            )}

                            {activeTab === 'settings' && (
                                <div className="flex flex-col items-center justify-center h-full text-center p-12 opacity-50">
                                    <Settings className="w-12 h-12 text-slate-300 mb-4" />
                                    <p className="text-slate-400 font-black uppercase tracking-widest">Configuration module syncing...</p>
                                </div>
                            )}
                        </motion.section>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;
