import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const SubscriptionPage = () => {
    const { doctorId, planId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { doctor, plan } = location.state || {};
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleConfirm = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/subscriptions/', {
                doctorId,
                planId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuccess(true);
            setTimeout(() => navigate('/user-dashboard'), 3000);
        } catch (err) {
            console.error("Subscription failed", err);
            alert("Subscription failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-6 font-outfit">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md"
                >
                    <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-100 shadow-xl shadow-emerald-50">
                        <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Success!</h1>
                    <p className="text-slate-500 font-medium mb-8">
                        You are now subscribed to <span className="text-slate-900 font-bold">{doctor?.name}'s</span> {plan?.name}.
                        Redirecting to your dashboard...
                    </p>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 3 }}
                            className="h-full bg-indigo-600"
                        />
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-outfit">
            <Navbar />
            <main className="max-w-4xl mx-auto px-6 py-16">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 font-bold hover:text-indigo-600 mb-8 transition-colors uppercase text-xs tracking-widest">
                    <ArrowLeft className="w-4 h-4" /> Go Back
                </button>

                <div className="grid lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-3">
                        <header className="mb-10">
                            <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">Complete Your <span className="text-indigo-600">Care.</span></h1>
                            <p className="text-slate-500 font-medium">Your security is our priority. Transactions are processed through our secure medical gateway.</p>
                        </header>

                        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-xl shadow-slate-200/50 mb-8">
                            <div className="flex items-center gap-4 mb-10 pb-10 border-b border-slate-50">
                                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-100">
                                    <CreditCard className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">Payment Simulation</h3>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">DEMO MODE ENABLED</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                                    For this version, real payments are disabled. Click "Confirm Subscription" to activate your plan immediately and start consulting with your specialist.
                                </p>
                                <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-4 text-amber-700">
                                    <Lock className="w-5 h-5 shrink-0 mt-0.5" />
                                    <p className="text-xs font-medium">Encryption active. Your clinical data remains private according to HIPPA guidelines.</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleConfirm}
                            disabled={loading}
                            className={`w-full py-5 rounded-2xl font-bold text-white shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-3 active:scale-95 ${loading ? 'bg-slate-400' : 'bg-indigo-600 hover:bg-indigo-700'
                                }`}
                        >
                            {loading ? 'PROCESSING...' : 'CONFIRM SUBSCRIPTION'}
                        </button>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-xl shadow-slate-200/50 sticky top-24">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Order Summary</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-slate-900 font-bold">{plan?.name}</p>
                                        <p className="text-slate-400 text-xs font-medium">With {doctor?.name}</p>
                                    </div>
                                    <p className="text-slate-900 font-bold">₹{plan?.price}</p>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                                    <p className="text-slate-500 font-bold">Total</p>
                                    <p className="text-2xl font-bold text-indigo-600">₹{plan?.price}</p>
                                </div>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Plan Highlights</span>
                                </div>
                                <ul className="space-y-2">
                                    {plan?.features.map((f, i) => (
                                        <li key={i} className="text-xs text-slate-500 font-medium flex items-center gap-2">
                                            <div className="w-1 h-1 bg-indigo-300 rounded-full" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SubscriptionPage;
