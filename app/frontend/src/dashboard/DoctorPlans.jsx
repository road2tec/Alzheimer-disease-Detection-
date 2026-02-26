import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { planApi } from '../services/api';
import { Check, Shield, Star, Wallet } from 'lucide-react';

const DoctorPlans = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await planApi.getPlans();
                setPlans(res.data);
            } catch (err) {
                console.error("Failed to fetch plans");
            } finally {
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);

    if (loading) return null;

    return (
        <section className="mt-12">
            <div className="flex items-center gap-3 mb-8">
                <Shield className="w-5 h-5 text-medical-600" />
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Clinical Care Plans</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {plans.map((plan) => (
                    <motion.div
                        key={plan._id}
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col justify-between relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                            <Star className="w-24 h-24 text-medical-600" />
                        </div>

                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex flex-col gap-2">
                                    <span className="px-4 py-1.5 bg-medical-50 text-medical-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-medical-100 self-start">
                                        {plan.name}
                                    </span>
                                    <span className="text-xs font-bold text-slate-400">by Dr. {plan.doctorName || 'Specialist'}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-2xl font-black text-slate-900">₹{plan.price}</span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">/mo</span>
                                </div>
                            </div>

                            <p className="text-slate-500 text-xs font-medium mb-6 leading-relaxed">
                                {plan.description}
                            </p>

                            <div className="space-y-3 mb-8">
                                {plan.features && plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-5 h-5 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => navigate(`/subscribe/${plan.doctorId}/${plan._id}`, { state: { plan, doctor: { name: plan.doctorName } } })}
                            className="w-full py-3.5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-medical-600 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 group"
                        >
                            <Wallet className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            Activate Plan
                        </button>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default DoctorPlans;
