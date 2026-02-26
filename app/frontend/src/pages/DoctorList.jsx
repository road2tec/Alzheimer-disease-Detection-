import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Star, ShieldCheck, Award, Clock, ArrowRight, User, Stethoscope } from 'lucide-react';
import Navbar from '../components/Navbar';

const DoctorList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState(location.state?.suggestedDoctors || []);
    const predictionResult = location.state?.prediction;

    return (
        <div className="min-h-screen bg-slate-50 font-outfit">
            <Navbar />
            <main className="max-w-7xl mx-auto px-6 py-12">
                <header className="mb-12">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-indigo-100">
                            Specialist Matching
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                        Recommended <span className="text-indigo-600">Doctors.</span>
                    </h1>
                    <p className="text-slate-500 font-medium mt-4">
                        Based on your <span className="text-slate-900 font-bold">{predictionResult}</span> result, we've matched you with the most qualified specialists.
                    </p>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {doctors.map((doctor, index) => (
                        <motion.div
                            key={doctor._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all group p-8"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                    <Stethoscope className="w-8 h-8" />
                                </div>
                                <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-full border border-amber-100 text-xs font-bold">
                                    <Star className="w-3 h-3 fill-current" />
                                    {doctor.rating}
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 mb-1">{doctor.name}</h3>
                            <p className="text-indigo-600 font-bold text-sm mb-4 uppercase tracking-widest">{doctor.specialization}</p>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                                    <Award className="w-4 h-4 text-slate-400" />
                                    {doctor.experience} Experience
                                </div>
                                <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                                    <ShieldCheck className="w-4 h-4 text-slate-400" />
                                    Verified Professional
                                </div>
                                <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                                    <Clock className="w-4 h-4 text-slate-400" />
                                    Next Available: Today
                                </div>
                            </div>

                            <button
                                onClick={() => navigate(`/plans/${doctor._id}`, { state: { doctor } })}
                                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg shadow-slate-100 group-hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 active:scale-95"
                            >
                                VIEW CARE PLANS
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {doctors.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
                        <p className="text-slate-400 font-medium text-lg">No specialists found in this category yet.</p>
                        <Link to="/user-dashboard" className="text-indigo-600 font-bold mt-4 inline-block hover:underline">Back to Dashboard</Link>
                    </div>
                )}
            </main>
        </div>
    );
};

export default DoctorList;
