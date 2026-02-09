import React from 'react';
import { motion } from 'framer-motion';
import { Target, Compass, Heart, Activity, Shield } from 'lucide-react';
import OrbSymbol from '../components/OrbSymbol';

const About = () => {
    return (
        <div className="bg-white min-h-screen">
            <section className="relative pt-32 pb-48 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-medical-50/30 -z-10"></div>
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-20 h-20 bg-medical-600 rounded-[2rem] flex items-center justify-center text-white mx-auto shadow-2xl mb-12 shadow-medical-200"
                    >
                        <div className="relative w-12 h-12 flex items-center justify-center">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute inset-0 bg-white/40 rounded-full blur-md"
                            />
                            <motion.div
                                animate={{ x: [-4, 4, -4] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute w-8 h-8 bg-medical-300/30 rounded-full blur-sm"
                            />
                        </div>
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8 leading-none">
                        OUR <span className="text-medical-600 italic">GOAL.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed tracking-tight">
                        We want to make it easy for anyone to check their brain health using smart technology that is simple to understand.
                    </p>
                </div>
            </section>

            <section className="py-24 px-6 bg-slate-950 text-white">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="space-y-12"
                        >
                            <div className="flex gap-8 items-start">
                                <div className="w-12 h-12 bg-medical-500 rounded-2xl flex items-center justify-center shrink-0">
                                    <Target className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black mb-4 tracking-tight">Very Precise</h3>
                                    <p className="text-slate-400 font-medium leading-relaxed">
                                        We use the best tools to find even the smallest signs of brain health issues early on.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-8 items-start">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                                    <Heart className="w-6 h-6 text-medical-400" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black mb-4 tracking-tight">Made for People</h3>
                                    <p className="text-slate-400 font-medium leading-relaxed">
                                        We know every person has a story. Our AI is built to be easy to use so you can feel sure about your results.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200"
                                className="rounded-[4rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-[2s]"
                                alt="Laboratory Setting"
                            />
                            <div className="absolute inset-0 bg-medical-600/20 mix-blend-overlay rounded-[4rem]"></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 bg-white">
                <div className="container mx-auto grid md:grid-cols-3 gap-12 text-center">
                    {[
                        { label: "Started", val: "2024", icon: Compass },
                        { label: "Accuracy", val: "96.8%", icon: Activity },
                        { label: "Security", val: "High", icon: Shield }
                    ].map((s, i) => (
                        <div key={i} className="space-y-4">
                            <s.icon className="w-10 h-10 mx-auto text-medical-600 mb-6" />
                            <div className="text-5xl font-black text-slate-900 tracking-tighter">{s.val}</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
