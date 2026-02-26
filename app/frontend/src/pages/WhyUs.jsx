import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, HeartPulse, Microscope, Binary, TrendingUp, Sparkles } from 'lucide-react';
import OrbSymbol from '../components/OrbSymbol';

const Card = ({ title, desc, icon: Icon, theme }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all"
    >
        <div className={`w-14 h-14 ${theme} rounded-2xl flex items-center justify-center mb-8 relative z-10 shadow-lg group-hover:scale-110 transition-transform`}>
            <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-4 tracking-tight text-slate-900">{title}</h3>
        <p className="text-slate-500 leading-relaxed font-medium">{desc}</p>
    </motion.div>
);

const WhyUs = () => {
    return (
        <div className="bg-white min-h-screen pb-24 font-outfit">
            <section className="pt-32 pb-48 px-6 bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-indigo-50/40"></div>
                <div className="container mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-6 py-2 mb-8 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 font-bold text-[10px] uppercase tracking-widest"
                    >
                        <Sparkles className="w-3 h-3" /> A BETTER CHOICE
                    </motion.div>
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-none text-slate-900">
                        Why Choose <span className="text-indigo-600">Us?</span>
                    </h1>
                    <p className="text-slate-500 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
                        We use simple AI and your medical history to help you get the right results fast.
                    </p>
                </div>
            </section>

            <section className="px-6 -mt-24 relative z-20">
                <div className="container mx-auto grid lg:grid-cols-3 gap-8">
                    <Card
                        title="Smart Mix"
                        desc="We look at both pictures and patient info together. This helps us get much more accurate results than standard tools."
                        icon={Binary}
                        theme="bg-indigo-600"
                    />
                    <Card
                        title="Very Fast"
                        desc="Built to work right away. You get results in a few seconds, so you don't have to wait for days."
                        icon={Zap}
                        theme="bg-slate-900"
                    />
                    <Card
                        title="Safe and Private"
                        desc="Your data is locked tight. We use high-level safety rules to keep your information private."
                        icon={ShieldCheck}
                        theme="bg-emerald-600"
                    />
                </div>
            </section>

            <section className="py-32 px-6">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="text-indigo-600 font-bold uppercase text-[10px] tracking-widest mb-4 inline-block">The Comparison</span>
                            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-8 leading-[0.9]">
                                Better Than <br /><span className="text-slate-300">The Rest.</span>
                            </h2>
                            <div className="space-y-8">
                                {[
                                    { title: "Standard AI", status: "Hard to Know", desc: "Most AI won't tell you how it got the answer.", color: "text-slate-400" },
                                    { title: "Health AI", status: "Easy to See", desc: "We show you exactly what the AI saw on the brain scan.", color: "text-indigo-600" }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 items-start p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                        <div className={`h-8 w-1 flex-shrink-0 bg-current mt-2 ${item.color}`}></div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="font-bold text-xl text-slate-900">{item.title}</h4>
                                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white border border-slate-100 ${item.color}`}>{item.status}</span>
                                            </div>
                                            <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-slate-50 rounded-[4rem] p-12 flex items-center justify-center">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="w-64 h-64 bg-white rounded-full flex items-center justify-center shadow-2xl shadow-indigo-100 relative"
                            >
                                <OrbSymbol size="lg" className="scale-[2.5] text-indigo-600 opacity-80" />
                                <div className="absolute inset-0 bg-indigo-200 blur-3xl rounded-full opacity-20"></div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WhyUs;
