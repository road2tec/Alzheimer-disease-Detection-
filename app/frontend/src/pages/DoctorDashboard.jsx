import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { doctorApi } from '../services/api';
import { Users, Activity, Loader2, Search, Filter, Stethoscope, ClipboardList } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const DoctorDashboard = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('patients');

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const res = await doctorApi.getPatients();
                setPatients(res.data);
            } catch (err) {
                console.error("Failed to fetch patients");
            } finally {
                setLoading(false);
            }
        };
        fetchPatients();
    }, []);

    if (loading) return (
        <div className="h-screen flex flex-col items-center justify-center gap-6 bg-slate-50">
            <Loader2 className="animate-spin text-medical-600 w-12 h-12" />
            <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Accessing Medical Records...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex overflow-hidden">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

            <main className="flex-grow ml-0 lg:ml-72 px-6 py-4 lg:px-12 lg:py-8 overflow-y-auto">
                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="px-3 py-1 bg-medical-100 text-medical-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-medical-200">
                            Clinical Access Level
                        </div>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter">DOCTOR <span className="text-medical-600 italic">PORTAL</span></h2>
                    <p className="text-slate-500 mt-1 text-sm font-medium">Review patient diagnostic history and AI-assisted reports.</p>
                </header>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-medical-50 text-medical-600">
                                <Users className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Patients</span>
                        </div>
                        <div className="text-2xl font-black text-slate-900">{new Set(patients.map(p => p.userEmail)).size}</div>
                    </div>
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                                <Activity className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Analyses Reviewed</span>
                        </div>
                        <div className="text-2xl font-black text-slate-900">{patients.length}</div>
                    </div>
                </div>

                <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center">
                        <h3 className="font-black text-slate-900 text-xl tracking-tight">Patient Diagnostic History</h3>
                        <div className="flex gap-3">
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
                                <Search className="w-4 h-4 text-slate-400" />
                                <input type="text" placeholder="Patient search..." className="bg-transparent border-none outline-none text-[10px] font-black uppercase" />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/30 text-slate-400 text-[9px] font-black uppercase tracking-widest border-b border-slate-100">
                                <tr>
                                    <th className="px-10 py-5">Patient Name</th>
                                    <th className="px-10 py-5">AI Result</th>
                                    <th className="px-10 py-5">Confidence</th>
                                    <th className="px-10 py-5">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {patients.map((p, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-10 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-slate-900">{p.userName}</span>
                                                <span className="text-[10px] text-slate-400 font-bold">{p.userEmail}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${p.prediction === 'AD' ? 'bg-red-50 text-red-600 border-red-100' :
                                                    p.prediction === 'MCI' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                        'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                }`}>
                                                {p.prediction}
                                            </span>
                                        </td>
                                        <td className="px-10 py-6 text-sm font-bold text-slate-700">
                                            {Math.round(p.confidence * 100)}%
                                        </td>
                                        <td className="px-10 py-6 text-xs text-slate-500 font-medium">
                                            {new Date(p.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DoctorDashboard;
