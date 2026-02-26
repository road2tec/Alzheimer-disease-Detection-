import React from 'react';
import { motion } from 'framer-motion';
import { Target, Compass, Heart, Activity, Shield } from 'lucide-react';
import OrbSymbol from '../components/OrbSymbol';

const About = () => {
    return (
        <div className="bg-white min-h-screen font-outfit">
            <section className="relative pt-32 pb-48 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-indigo-50/30 -z-10"></div>
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white mx-auto shadow-2xl mb-12 shadow-indigo-100"
                    >
                        <Heart className="w-10 h-10" />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-8 leading-none">
                        Our <span className="text-indigo-600">Mission.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed">
                        We want to make it easy for anyone to check their brain health using smart technology that is simple to understand.
                    </p>
                </div>
            </section>

            <section className="py-24 px-6 bg-slate-50">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="space-y-12"
                        >
                            <div className="flex gap-8 items-start p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-100">
                                    <Target className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3 tracking-tight text-slate-900">Very Precise</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">
                                        We use the best tools to find even the smallest signs of brain health issues early on.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-8 items-start p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-100">
                                    <Heart className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3 tracking-tight text-slate-900">Made for People</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">
                                        We know every person has a story. Our AI is built to be easy to use so you can feel sure about your results.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200"
                                className="rounded-[4rem] shadow-2xl transition-all duration-700 hover:scale-[1.02]"
                                alt="Laboratory Setting"
                            />
                            <div className="absolute inset-0 bg-indigo-600/5 rounded-[4rem]"></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-32 px-6 bg-white">
                <div className="container mx-auto grid md:grid-cols-3 gap-12 text-center">
                    {[
                        { label: "Started", val: "2024", icon: Compass },
                        { label: "Accuracy", val: "96.8%", icon: Activity },
                        { label: "Security", val: "High", icon: Shield }
                    ].map((s, i) => (
                        <div key={i} className="space-y-4 p-10 bg-slate-50 rounded-[3rem] border border-transparent hover:border-indigo-100 hover:bg-white transition-all">
                            <s.icon className="w-10 h-10 mx-auto text-indigo-600 mb-6" />
                            <div className="text-5xl font-bold text-slate-900 tracking-tight">{s.val}</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
