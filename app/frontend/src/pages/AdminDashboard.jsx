import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { adminApi } from '../services/api';
import { Users, Database, ShieldCheck, Activity, Loader2, Search, Filter, Download, ExternalLink, TrendingUp, BarChart3, PieChart as PieIcon, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await adminApi.getStats();
                setStats(res.data);
            } catch (err) {
                console.error("Admin check failed");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return (
        <div className="h-screen flex flex-col items-center justify-center gap-6">
            <div className="relative">
                <Loader2 className="animate-spin text-medical-600 w-12 h-12" />
                <div className="absolute inset-0 bg-medical-500/20 blur-xl rounded-full animate-pulse"></div>
            </div>
            <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">Synching Neural Node...</p>
        </div>
    );

    const COLORS = ['#8372ff', '#a295ff', '#6b2cf5'];
    const pieData = stats?.distribution ? Object.entries(stats.distribution).map(([name, value]) => ({ name, value })) : [];

    return (
        <div className="container mx-auto px-6 lg:px-12 py-12">
            <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="px-3 py-1 bg-medical-600 text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg shadow-medical-500/30">
                            Root Verified
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest leading-none">Global Monitoring: ACTIVE</span>
                        </div>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter">INTELLIGENCE <span className="text-medical-600 italic">HUB</span></h2>
                    <p className="text-slate-500 mt-1 text-sm font-medium">Real-time infrastructure monitoring and diagnostic audit trails.</p>
                </div>

                <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2.5 group hover:border-slate-300">
                        <Download className="w-4 h-4 text-slate-400 group-hover:text-medical-600 transition-colors" /> Export Metrics
                    </button>
                    <button className="px-6 py-3 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-medical-700 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2.5 active:scale-95 group">
                        <ShieldCheck className="w-4 h-4 group-hover:rotate-12 transition-transform" /> System Audit
                    </button>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
                {[
                    { label: 'Network Researchers', value: stats?.totalUsers || 0, icon: Users, color: 'text-medical-600', trend: '+12%' },
                    { label: 'Neural Inferences', value: stats?.totalPredictions || 0, icon: Activity, color: 'text-medical-500', trend: '+8.4%' },
                    { label: 'Data Processing Unit', value: (stats?.totalUsers + stats?.totalPredictions) || 0, icon: Database, color: 'text-slate-900', trend: 'Active' },
                    { label: 'Avg System Latency', value: '18ms', icon: Zap, color: 'text-amber-500', trend: '-2ms' }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${stat.color}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <div className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg uppercase tracking-wider">
                                {stat.trend}
                            </div>
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</div>
                            <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
                {/* Main Activity Chart */}
                <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="flex justify-between items-center mb-8 relative z-10">
                        <div>
                            <h3 className="font-black text-slate-900 text-lg tracking-tight">System Utilization</h3>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Daily Scan Volume (Last 30 Days)</p>
                        </div>
                        <BarChart3 className="text-medical-600 w-6 h-6 opacity-20 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats?.dailyActivity}>
                                <defs>
                                    <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8372ff" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#8372ff" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="date" hide />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                                />
                                <Area type="monotone" dataKey="scans" stroke="#8372ff" strokeWidth={3} fillOpacity={1} fill="url(#colorScans)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Distribution Chart */}
                <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm group">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="font-black text-slate-900 text-lg tracking-tight">Diagnostic Split</h3>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Classification Ratios</p>
                        </div>
                        <PieIcon className="text-medical-600 w-6 h-6 opacity-20 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="h-[240px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        {pieData.map((entry, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{entry.name}: {entry.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Expanded Activity Table */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-10 py-8 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div>
                        <h3 className="font-black text-slate-900 text-xl tracking-tight">Neural Link Audit Trail</h3>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Secure Transaction Stream</p>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 w-full sm:w-auto">
                        <div className="flex items-center gap-2 px-4 py-2 flex-grow sm:flex-grow-0">
                            <Search className="w-4 h-4 text-slate-400" />
                            <input type="text" placeholder="Filter node ID..." className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest placeholder:text-slate-300 w-32" />
                        </div>
                        <button className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors"><Filter className="w-4 h-4 text-slate-500" /></button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/30 text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                            <tr>
                                <th className="px-10 py-5">Researcher Node</th>
                                <th className="px-10 py-5 text-center">Diagnostic State</th>
                                <th className="px-10 py-5">Model Accuracy</th>
                                <th className="px-10 py-5 text-right">Commit Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {stats?.recentPredictions.map((p) => (
                                <tr key={p._id} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="px-10 py-7">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-medical-50 text-medical-600 rounded-lg flex items-center justify-center text-[10px] font-black border border-medical-100 group-hover:bg-medical-600 group-hover:text-white transition-all">0x</div>
                                            <span className="font-mono text-[10px] text-slate-400 font-bold tracking-wider">{p.userId.substring(0, 16)}...</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-7 text-center">
                                        <div className={`inline-flex px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-[0.15em] border ${p.prediction === 'AD' ? 'bg-red-50 text-red-600 border-red-100' :
                                            p.prediction === 'MCI' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                'bg-emerald-50 text-emerald-600 border-emerald-100'
                                            }`}>
                                            {p.prediction === 'CN' ? 'NORMAL' : p.prediction}
                                        </div>
                                    </td>
                                    <td className="px-10 py-7 text-nowrap">
                                        <div className="flex items-center gap-4">
                                            <div className="flex-grow h-1 bg-slate-100 rounded-full overflow-hidden w-24">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${p.confidence * 100}%` }}
                                                    className={`h-full ${p.confidence > 0.8 ? 'bg-medical-500 shadow-[0_0_10px_rgba(131,114,255,0.4)]' : 'bg-amber-400'}`}
                                                ></motion.div>
                                            </div>
                                            <span className="text-[11px] font-black text-slate-900">{Math.round(p.confidence * 100)}%</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-7 text-right">
                                        <div className="flex flex-col items-end">
                                            <span className="text-[11px] font-black text-slate-900">{new Date(p.createdAt).toLocaleDateString()}</span>
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{new Date(p.createdAt).toLocaleTimeString()}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 bg-slate-900 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-medical-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-all flex items-center gap-3 mx-auto relative z-10">
                        Query Universal Ledger <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
