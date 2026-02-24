import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { adminApi } from '../services/api';
import { Users, Database, ShieldCheck, Activity, Loader2, Search, Filter, Download, ExternalLink, TrendingUp, BarChart3, PieChart as PieIcon, Zap, Trash2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('insights');

    const fetchStats = async () => {
        try {
            const res = await adminApi.getStats();
            setStats(res.data);
        } catch (err) {
            console.error("Admin check failed");
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await adminApi.getUsers();
            setUsers(res.data);
        } catch (err) {
            console.error("Failed to fetch users");
        }
    };

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            await Promise.all([fetchStats(), fetchUsers()]);
            setLoading(false);
        };
        init();
    }, []);

    const handleRoleUpdate = async (id, role) => {
        try {
            await adminApi.updateRole(id, role);
            await fetchUsers();
        } catch (err) {
            alert("Role update failed");
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm("Delete this user permanently?")) return;
        try {
            await adminApi.deleteUser(id);
            await fetchUsers();
        } catch (err) {
            alert("Delete failed");
        }
    };

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
                    <button
                        onClick={() => setActiveTab('insights')}
                        className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'insights' ? 'bg-slate-950 text-white shadow-xl' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                        Insights
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-slate-950 text-white shadow-xl' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                        Users
                    </button>
                    <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2.5 group">
                        <Download className="w-4 h-4 text-slate-400 group-hover:text-medical-600 transition-colors" /> Export
                    </button>
                </div>
            </header>

            {activeTab === 'insights' ? (
                <>
                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-4 gap-6 mb-12">
                        {[
                            { label: 'Researchers', value: stats?.totalUsers || 0, icon: Users, color: 'text-medical-600', trend: '+12%' },
                            { label: 'Inferences', value: stats?.totalPredictions || 0, icon: Activity, color: 'text-medical-500', trend: '+8.4%' },
                            { label: 'Data Processing', value: (stats?.totalUsers + stats?.totalPredictions) || 0, icon: Database, color: 'text-slate-900', trend: 'Active' },
                            { label: 'Avg Latency', value: '18ms', icon: Zap, color: 'text-amber-500', trend: '-2ms' }
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
                        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="font-black text-slate-900 text-lg tracking-tight">System Utilization</h3>
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Scan Volume (30D)</p>
                                </div>
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
                                        <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                                        <Area type="monotone" dataKey="scans" stroke="#8372ff" strokeWidth={3} fill="url(#colorScans)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="font-black text-slate-900 text-lg tracking-tight">Diagnostic Split</h3>
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Classification Ratios</p>
                                </div>
                            </div>
                            <div className="h-[240px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="value">
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
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{entry.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="px-10 py-8 border-b border-slate-50">
                            <h3 className="font-black text-slate-900 text-xl tracking-tight">Neural Link Audit Trail</h3>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Secure Transaction Stream</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/30 text-slate-400 text-[9px] font-black uppercase tracking-widest border-b border-slate-100">
                                    <tr>
                                        <th className="px-10 py-5">Researcher Node</th>
                                        <th className="px-10 py-5 text-center">Diagnostic State</th>
                                        <th className="px-10 py-5 text-right">Commit Time</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {stats?.recentPredictions.map((p) => (
                                        <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-10 py-7">
                                                <span className="font-mono text-[10px] text-slate-400 font-bold tracking-wider">{p.userId.substring(0, 16)}...</span>
                                            </td>
                                            <td className="px-10 py-7 text-center">
                                                <div className={`inline-flex px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest border ${p.prediction === 'AD' ? 'bg-red-50 text-red-600 border-red-100' :
                                                        p.prediction === 'MCI' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                            'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                    }`}>
                                                    {p.prediction}
                                                </div>
                                            </td>
                                            <td className="px-10 py-7 text-right">
                                                <span className="text-[11px] font-black text-slate-900">{new Date(p.createdAt).toLocaleDateString()}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : (
                <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
                    <div className="px-10 py-8 border-b border-slate-50">
                        <h3 className="font-black text-slate-900 text-xl tracking-tight">Access Control & Identities</h3>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Manage global user roles and system access</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/30 text-slate-400 text-[9px] font-black uppercase tracking-widest border-b border-slate-100">
                                <tr>
                                    <th className="px-10 py-5">Researcher</th>
                                    <th className="px-10 py-5">Role</th>
                                    <th className="px-10 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {users.map((u) => (
                                    <tr key={u._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-10 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-slate-900">{u.name}</span>
                                                <span className="text-[10px] text-slate-400 font-bold">{u.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <select
                                                value={u.role || 'user'}
                                                onChange={(e) => handleRoleUpdate(u._id, e.target.value)}
                                                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-medical-500/20"
                                            >
                                                <option value="user">User</option>
                                                <option value="doctor">Doctor</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <button
                                                onClick={() => handleDeleteUser(u._id)}
                                                className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
