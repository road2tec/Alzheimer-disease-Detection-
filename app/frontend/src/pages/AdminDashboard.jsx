import React, { useState, useEffect } from 'react';
import { adminApi, reviewApi, feedbackApi } from '../services/api';
import { motion } from 'framer-motion';
import {
    Users,
    ShieldCheck,
    BarChart3,
    Settings,
    Trash2,
    Loader2,
    Download,
    UserPlus,
    X,
    CheckCircle,
    Plus,
    Mail,
    Lock,
    Zap,
    Cpu,
    Globe,
    Server,
    Shield,
    MessageSquareQuote,
    Star
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Sidebar from '../components/Sidebar';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('insights');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newDoctor, setNewDoctor] = useState({ name: '', email: '', password: '', specialization: '' });

    const fetchStats = async () => {
        try {
            const res = await adminApi.getStats();
            setStats(res.data);
        } catch (err) {
            console.error("Admin stats fetch failed");
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

    const fetchReviews = async () => {
        try {
            const res = await feedbackApi.getAll();
            setReviews(res.data);
        } catch (err) {
            console.error("Failed to fetch reviews");
        }
    };

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            await Promise.all([fetchStats(), fetchUsers(), fetchReviews()]);
            setLoading(false);
        };
        init();
    }, []);

    const handleAddDoctor = async (e) => {
        e.preventDefault();
        try {
            await adminApi.createDoctor({ ...newDoctor, rating: 5.0, experience: "10+ Years" });
            setNewDoctor({ name: '', email: '', password: '', specialization: '' });
            setShowAddModal(false);
            fetchUsers();
            alert("Doctor added successfully!");
        } catch (err) {
            alert(err.response?.data?.error || "Failed to add doctor");
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Delete this user permanently?")) return;
        try {
            await adminApi.deleteUser(id);
            await fetchUsers();
        } catch (err) {
            alert("Delete failed");
        }
    };

    const deleteReview = async (id) => {
        if (!window.confirm("Delete this review?")) return;
        try {
            await reviewApi.deleteReview(id);
            setReviews(reviews.filter(r => r._id !== id));
        } catch (err) {
            alert("Failed to delete review");
        }
    };

    if (loading) return (
        <div className="h-screen flex flex-col items-center justify-center gap-6 bg-slate-50 font-outfit">
            <div className="relative">
                <Loader2 className="animate-spin text-indigo-600 w-12 h-12" />
                <div className="absolute inset-0 bg-indigo-500/10 blur-xl rounded-full animate-pulse"></div>
            </div>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading System...</p>
        </div>
    );

    const COLORS = ['#4f46e5', '#818cf8', '#6366f1'];
    const pieData = stats?.distribution ? Object.entries(stats.distribution).map(([name, value]) => ({ name, value })) : [];

    return (
        <div className="min-h-screen bg-slate-50 flex overflow-hidden font-outfit">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

            <main className="flex-grow ml-0 lg:ml-72 px-6 py-8 lg:px-12 lg:py-10 overflow-y-auto">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-indigo-600 text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md">System Admin</span>
                            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> All Services Online
                            </div>
                        </div>
                        <h2 className="text-5xl font-bold text-slate-900 tracking-tight leading-none">
                            Admin Dashboard
                        </h2>
                        <p className="text-slate-500 font-medium text-lg mt-1">
                            {activeTab === 'insights' ? 'Manage users and monitor system performance.' :
                                activeTab === 'admin-hub' ? 'System user control and role management.' :
                                    'Moderate patient reviews and feedback.'}
                        </p>
                    </div>
                </header>

                {activeTab === 'insights' && (
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { label: 'Total Users', value: stats.totalUsers || 0, icon: Globe, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                                { label: 'Scans Done', value: stats.totalPredictions || 0, icon: Server, color: 'text-blue-600', bg: 'bg-blue-50' },
                                { label: 'System Health', value: '99.9%', icon: Shield, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                                { label: 'API Status', value: 'Steady', icon: Cpu, color: 'text-amber-600', bg: 'bg-amber-50' }
                            ].map((s, i) => (
                                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`p-2.5 rounded-xl ${s.bg} ${s.color}`}>
                                            <s.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{s.label}</span>
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900 tracking-tight">{s.value}</div>
                                </div>
                            ))}
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                                <div className="mb-8">
                                    <h3 className="font-bold text-slate-900 text-xl tracking-tight leading-none mb-1">System Usage</h3>
                                    <p className="text-slate-400 text-xs font-semibold">Total scans performed over the last 30 days.</p>
                                </div>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={stats?.dailyActivity}>
                                            <defs>
                                                <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                                                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="date" hide />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 700 }} />
                                            <Area type="monotone" dataKey="scans" stroke="#4f46e5" strokeWidth={3} fill="url(#colorScans)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                                <div className="mb-8 text-center">
                                    <h3 className="font-bold text-slate-900 text-xl tracking-tight leading-none mb-1">Results Split</h3>
                                    <p className="text-slate-400 text-xs font-semibold">Diagnosis classification ratios.</p>
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
                                <div className="mt-6 flex flex-wrap justify-center gap-3">
                                    {pieData.map((entry, i) => (
                                        <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{entry.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-8 py-6 border-b border-slate-100">
                                <h3 className="font-bold text-slate-900 text-xl tracking-tight">Recent Scans</h3>
                                <p className="text-slate-400 text-xs font-semibold mt-1">Latest ML Model analysis results from the platform.</p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100">
                                        <tr>
                                            <th className="px-8 py-4">User Reference</th>
                                            <th className="px-8 py-4 text-center">ML Model Result</th>
                                            <th className="px-8 py-4 text-right">Done At</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {stats?.recentPredictions.map((p) => (
                                            <tr key={p._id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-8 py-5">
                                                    <span className="font-mono text-xs text-slate-400 font-semibold">{p.userId.substring(0, 16)}...</span>
                                                </td>
                                                <td className="px-8 py-5 text-center">
                                                    <div className={`inline-flex px-3 py-1 rounded-lg font-bold text-[10px] uppercase tracking-widest border shadow-sm ${p.prediction === 'AD' ? 'bg-red-50 text-red-600 border-red-100' :
                                                        p.prediction === 'MCI' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                            'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                        }`}>
                                                        {p.prediction === 'AD' ? "ALZHEIMER'S RISK" : p.prediction === 'MCI' ? "EARLY CHANGES" : "HEALTHY SCAN"}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <span className="text-xs font-bold text-slate-700">{new Date(p.createdAt).toLocaleDateString()}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'admin-hub' && (
                    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500 min-h-[60vh]">
                        <div className="px-8 py-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6">
                            <div>
                                <h3 className="font-bold text-slate-900 text-2xl tracking-tight leading-none mb-2">User Management</h3>
                                <p className="text-slate-500 font-medium">Manage active users, doctors, and platform administrators.</p>
                            </div>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="px-6 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm tracking-tight flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 shadow-indigo-200/50 active:scale-95"
                            >
                                <UserPlus className="w-5 h-5" /> Add Doctor
                            </button>
                        </div>

                        {showAddModal && (
                            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/20 backdrop-blur-sm">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    className="bg-white rounded-[2.5rem] p-10 w-full max-w-lg shadow-2xl border border-slate-100 relative"
                                >
                                    <button
                                        onClick={() => setShowAddModal(false)}
                                        className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors"
                                    >
                                        <X className="w-6 h-6 border rounded-xl" />
                                    </button>

                                    <div className="text-center mb-10">
                                        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-100">
                                            <UserPlus className="w-8 h-8" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Add New Doctor</h2>
                                        <p className="text-slate-500 font-medium leading-none">Create a professional medical account.</p>
                                    </div>

                                    <form onSubmit={handleAddDoctor} className="space-y-6">
                                        <div className="space-y-2 group">
                                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                placeholder="Dr. John Smith"
                                                required
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-indigo-500 transition-all font-semibold text-slate-900"
                                                value={newDoctor.name}
                                                onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2 group">
                                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                placeholder="doctor@healthai.com"
                                                required
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-indigo-500 transition-all font-semibold text-slate-900"
                                                value={newDoctor.email}
                                                onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2 group">
                                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Specialization</label>
                                            <input
                                                type="text"
                                                placeholder="Neurologist"
                                                required
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-indigo-500 transition-all font-semibold text-slate-900"
                                                value={newDoctor.specialization}
                                                onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2 group">
                                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Temporary Password</label>
                                            <input
                                                type="password"
                                                placeholder="••••••••"
                                                required
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-indigo-500 transition-all font-semibold text-slate-900"
                                                value={newDoctor.password}
                                                onChange={(e) => setNewDoctor({ ...newDoctor, password: e.target.value })}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full py-5 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 active:scale-[0.98] mt-4 uppercase tracking-widest text-xs"
                                        >
                                            Create Profile <CheckCircle className="w-5 h-5 text-emerald-400" />
                                        </button>
                                    </form>
                                </motion.div>
                            </div>
                        )}

                        <div className="px-2 pb-10">
                            {[
                                { role: 'doctor', label: '🩺 Doctors', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
                                { role: 'user', label: '👤 Patients / Users', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
                                { role: 'admin', label: '🛡️ Admins', color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-100' },
                            ].map(({ role, label, color, bg, border }) => {
                                const group = users.filter(u => u.role === role);
                                if (group.length === 0) return null;
                                return (
                                    <div key={role} className="mb-6 mx-6 border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                                        <div className={`px-8 py-4 ${bg} flex items-center justify-between border-b ${border}`}>
                                            <span className={`text-[11px] font-bold uppercase tracking-widest ${color}`}>{label}</span>
                                            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${bg} border ${border} ${color} opacity-80`}>{group.length} total</span>
                                        </div>
                                        <table className="w-full text-left">
                                            <tbody className="divide-y divide-slate-50">
                                                {group.map((u) => (
                                                    <tr key={u._id} className="group hover:bg-slate-50/50 transition-all">
                                                        <td className="px-8 py-4">
                                                            <div className="flex items-center gap-4">
                                                                <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center ${color} font-bold text-sm border ${border}`}>
                                                                    {u.name.charAt(0).toUpperCase()}
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-sm font-bold text-slate-900 leading-none mb-1">{u.name}</span>
                                                                    <span className="text-[11px] text-slate-400 font-medium">{u.email}</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-4 text-right">
                                                            <button
                                                                onClick={() => deleteUser(u._id)}
                                                                className="p-2.5 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm border border-red-100"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {activeTab === 'admin-reviews' && (
                    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500 min-h-[60vh] p-8">
                        <div className="mb-10">
                            <h3 className="font-bold text-slate-900 text-2xl tracking-tight leading-none mb-2">User Feedback</h3>
                            <p className="text-slate-500 font-medium">Monitor and manage platform feedback from patients.</p>
                        </div>

                        <div className="space-y-6">
                            {reviews.length === 0 ? (
                                <div className="text-center py-20 text-slate-400">No feedback to moderate.</div>
                            ) : reviews.map((r) => (
                                <div key={r._id} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex gap-6 group hover:bg-white hover:border-indigo-100 transition-all">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 font-bold shadow-sm border border-slate-100">
                                        {r.userName?.charAt(0) || 'U'}
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-bold text-slate-900">{r.userName || 'Anonymous'} <span className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.2em] ml-2">{r.userEmail || ''}</span></h4>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date(r.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1 text-amber-400 bg-white px-2 py-1 rounded-lg border border-slate-100 text-xs font-bold">
                                                    <Star className="w-3 h-3 fill-current" /> {r.rating}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-slate-500 font-medium text-sm leading-relaxed">"{r.content || r.comment}"</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
