import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Shield, Zap, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const DoctorPlans = () => {
    const { doctorId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(location.state?.doctor || null);
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/plans/?doctorId=${doctorId}`);
                setPlans(res.data);
            } catch (err) {
                console.error("Error fetching plans", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlans();
    }, [doctorId]);

    const handleSubscribe = (plan) => {
        navigate(`/subscribe/${doctorId}/${plan._id}`, { state: { doctor, plan } });
    };

    return (
        <div className="min-h-screen bg-white font-outfit">
            <Navbar />
            <main className="max-w-6xl mx-auto px-6 py-16">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-indigo-50 text-indigo-600 font-bold text-xs tracking-widest border border-indigo-100"
                    >
                        <Sparkles className="w-3 h-3" /> CHOOSE YOUR CARE LEVEL
                    </motion.div>
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight mb-4">
                        Care Plans by <span className="text-indigo-600">{doctor?.name}</span>
                    </h1>
                    <p className="text-slate-500 font-medium max-w-2xl mx-auto">
                        Select a plan that fits your needs. All plans include secure data handling and certified medical oversight.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-center">
                        {plans.map((plan, index) => (
                            <motion.div
                                key={plan._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-10 rounded-[3rem] border transition-all ${index === 1
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xl scale-105 relative z-10'
                                    : 'bg-white text-slate-900 border-slate-100 shadow-xl'
                                    }`}
                            >
                                {index === 1 && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold mb-2 tracking-tight">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-4xl font-bold">₹{plan.price}</span>
                                    <span className={`${index === 1 ? 'text-slate-400' : 'text-slate-400'} text-xs font-bold uppercase tracking-widest`}>/ {plan.duration}</span>
                                </div>

                                <div className="space-y-4 mb-10">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm font-medium">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${index === 1 ? 'bg-indigo-500' : 'bg-indigo-50'}`}>
                                                <Check className={`w-3 h-3 ${index === 1 ? 'text-white' : 'text-indigo-600'}`} />
                                            </div>
                                            <span className={index === 1 ? 'text-slate-200' : 'text-slate-600'}>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handleSubscribe(plan)}
                                    className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 ${index === 1
                                        ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-900/20 hover:bg-indigo-500'
                                        : 'bg-slate-50 text-slate-900 hover:bg-indigo-600 hover:text-white border border-slate-100 hover:border-indigo-600'
                                        }`}
                                >
                                    GET STARTED
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}

                {!loading && plans.length === 0 && (
                    <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200 p-12">
                        <div className="w-20 h-20 bg-white rounded-3xl mx-auto flex items-center justify-center text-slate-300 mb-6 shadow-sm border border-slate-100">
                            <Shield className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">No Plans Available</h3>
                        <p className="text-slate-400 font-medium">This doctor hasn't set up any subscription plans yet.</p>
                        <button onClick={() => navigate(-1)} className="mt-8 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
                            BACK TO DOCTORS
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default DoctorPlans;
