import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const Results = ({ result }) => {
    if (!result) return null;

    const { prediction, confidence, grad_cam_image } = result;
    const confidencePercent = Math.round(confidence * 100);

    const getTheme = () => {
        if (prediction === 'AD') return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100', icon: AlertTriangle };
        if (prediction === 'MCI') return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', icon: TrendingUp };
        return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', icon: CheckCircle };
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
                    <h4 className="text-slate-500 font-bold text-sm uppercase tracking-widest mb-2">Detection Result</h4>
                    <div className={`text-3xl font-black ${theme.text} mb-4`}>{prediction}</div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        {prediction === 'AD' ? 'High clinical markers for Alzheimer\'s Disease detected.' :
                            prediction === 'MCI' ? 'Mild Cognitive Impairment detected. Monitoring suggested.' :
                                'Normal neuro-physiological indicators observed.'}
                    </p>
                </div>

                <div className="mt-8">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-xs font-bold text-slate-500 uppercase">AI Confidence</span>
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

            {/* Explainability Card */}
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-lg shadow-slate-200 border border-slate-100">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h4 className="font-extrabold text-slate-900 text-lg">Attention-Based Explainability</h4>
                        <p className="text-slate-500 text-sm italic">Equivalent to Grad-CAM for Vision Transformers</p>
                    </div>
                    <div className="px-4 py-1.5 bg-slate-100 rounded-full text-xs font-bold text-slate-500 border border-slate-200 uppercase">
                        Active Layer: ViT-B/16 Block 11
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="relative group overflow-hidden rounded-3xl border-4 border-white shadow-xl">
                        <img
                            src={`/results/${grad_cam_image}`}
                            alt="Heatmap Overlay"
                            className="w-full max-w-[320px] aspect-square object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="flex-1 space-y-5">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <h5 className="font-bold text-slate-800 mb-1 text-sm uppercase tracking-wide">AI Interest Analysis</h5>
                            <p className="text-xs text-slate-600 leading-relaxed italic">
                                "The heatmap visualization highlights critical regions where the transformer's multi-head attention
                                focused. Warmer colors (red/orange) indicate high biological relevance for the final prediction."
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-2 p-3 bg-red-50 rounded-xl border border-red-100">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span className="text-xs font-bold text-red-700">Significant</span>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span className="text-xs font-bold text-blue-700">Passive</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Results;
