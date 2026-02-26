import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const Results = ({ result }) => {
    if (!result) return null;

    const { prediction, confidence, grad_cam_image } = result;
    const confidencePercent = Math.round(confidence * 100);

    const getTheme = () => {
        if (prediction === 'AD') return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100', icon: AlertTriangle, label: "Alzheimer's Risk Detected", desc: "The ML Model has found patterns in your brain scan that suggest a high risk for Alzheimer's. Please share this report with a doctor for a proper medical checkup and plan." };
        if (prediction === 'MCI') return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', icon: TrendingUp, label: "Early Memory Changes Detected", desc: "The ML Model has found some early changes in your brain that might be related to memory issues. It is a good idea to talk to a doctor early to keep your brain healthy." };
        return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', icon: CheckCircle, label: "Healthy Brain Scan", desc: "Great news! The ML Model did not find any signs of memory-related diseases. Your brain scan appears completely normal and healthy." };
    };

    const theme = getTheme();
    const ThemeIcon = theme.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-3 gap-8 mt-10"
        >
            {/* Primary Result Card */}
            <div className={`p-6 rounded-3xl border ${theme.bg} ${theme.border} lg:col-span-1 shadow-sm flex flex-col justify-between`}>
                <div>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-6 bg-white/50 border ${theme.border}`}>
                        <ThemeIcon className={`w-5 h-5 ${theme.text}`} />
                    </div>
                    <h4 className="text-slate-500 font-bold text-sm uppercase tracking-widest mb-2">Health Report</h4>
                    <div className={`text-2xl font-black ${theme.text} mb-4 uppercase leading-tight`}>{theme.label}</div>
                    <p className="text-slate-600 text-sm leading-relaxed font-medium">
                        {theme.desc}
                    </p>
                </div>

                <div className="mt-8">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-xs font-bold text-slate-500 uppercase">ML Model Score</span>
                        <span className={`text-lg font-black ${theme.text}`}>{confidencePercent}%</span>
                    </div>
                    <div className="h-4 w-full bg-white/50 rounded-full overflow-hidden border border-white/20">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${confidencePercent}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full ${theme.bg.replace('50', '500')}`}
                        ></motion.div>
                    </div>
                </div>
            </div>

            {/* ML Model Visual Proof Card */}
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-lg shadow-slate-200 border border-slate-100">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h4 className="font-extrabold text-slate-900 text-lg">Where the ML Model Looked</h4>
                        <p className="text-slate-500 text-sm">Showing the main focus areas of the checkup</p>
                    </div>
                    <div className="px-4 py-1.5 bg-slate-100 rounded-full text-xs font-bold text-slate-500 border border-slate-200 uppercase">
                        ML Model Analysis Mode
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="relative group overflow-hidden rounded-3xl border-4 border-white shadow-xl">
                        <img
                            src={`/results/${grad_cam_image}`}
                            alt="Brain Focus Map"
                            className="w-full max-w-[280px] aspect-square object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="flex-1 space-y-5">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h5 className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wide">ML Model Map Analysis</h5>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                "The colored map shows where the ML Model looked most. The warmer colors (red/orange) show the parts of the brain that the ML Model found most important for your result."
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-2 p-3 bg-red-50 rounded-xl border border-red-100">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span className="text-xs font-bold text-red-700">Important Area</span>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span className="text-xs font-bold text-blue-700">Normal Area</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Results;
