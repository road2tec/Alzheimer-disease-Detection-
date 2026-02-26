import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { predictApi } from '../services/api';
import { History as HistoryIcon, Calendar, Info, Loader2 } from 'lucide-react';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await predictApi.history();
                setHistory(res.data);
            } catch (err) {
                console.error("Failed to fetch history");
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-medical-600" /></div>;

    return (
        <section className="mt-12">
            <div className="flex items-center gap-2 mb-4">
                <HistoryIcon className="w-4 h-4 text-slate-400" />
                <h3 className="font-bold text-slate-800 text-base">Patient Analysis History</h3>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-5 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">Date</th>
                            <th className="px-5 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">Clinical Context</th>
                            <th className="px-5 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">MRI Stage</th>
                            <th className="px-5 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">Conf.</th>
                            <th className="px-5 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Details</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {history.length === 0 ? (
                            <tr><td colSpan="5" className="text-center py-10 text-slate-400">No diagnostic records found.</td></tr>
                        ) : (
                            history.map((record) => (
                                <tr key={record._id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-2 text-slate-900 font-semibold">
                                            <Calendar className="w-4 h-4 text-slate-400" />
                                            {new Date(record.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex gap-2">
                                            <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-600">AGE: {record.age}</span>
                                            <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-600">MMSE: {record.mmse}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wide uppercase ${record.prediction === 'AD' ? 'bg-red-100 text-red-700' :
                                            record.prediction === 'MCI' ? 'bg-amber-100 text-amber-700' :
                                                'bg-emerald-100 text-emerald-700'
                                            }`}>
                                            {record.prediction === 'AD' ? "Alzheimer's Risk" : record.prediction === 'MCI' ? "Early Changes" : "Healthy Scan"}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3">
                                        <span className="text-[11px] font-bold text-slate-500">{Math.round(record.confidence * 100)}%</span>
                                    </td>
                                    <td className="px-5 py-3 text-right">
                                        <button className="text-medical-600 opacity-0 group-hover:opacity-100 transition-opacity font-bold text-[10px] uppercase underline">View Report</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section >
    );
};

export default History;
