import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Eye, BarChart3, Binary, Lock, Cpu, Globe } from 'lucide-react';

const FeatureCard = ({ title, desc, icon: Icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay }}
        viewport={{ once: true }}
        className="p-10 bg-white rounded-[3rem] border border-slate-100 hover:border-medical-200 hover:shadow-xl hover:shadow-medical-100/10 transition-all group"
    >
        <div className="w-14 h-14 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-medical-600 group-hover:text-white transition-all">
            <Icon className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-black mb-4 tracking-tight text-slate-900">{title}</h3>
        <p className="text-slate-500 leading-relaxed font-medium text-sm">{desc}</p>
    </motion.div>
);

const Features = () => {
    return (
        <div className="bg-white min-h-screen pb-24">
            <section className="pt-32 pb-24 px-6 text-center">
                <div className="container mx-auto max-w-4xl">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-medical-600 font-black uppercase text-[10px] tracking-[0.4em] mb-4 inline-block"
                    >
                        What We Offer
                    </motion.span>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8 leading-none">
                        MAIN <span className="text-medical-600 italic">FEATURES</span>
                    </h1>
                    <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
                        Easy-to-use tools built to help check for early signs of Alzheimer's.
                    </p>
                </div>
            </section>

            <section className="px-6">
                <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FeatureCard
                        title="Smart Scan"
                        desc="Using AI to find very small changes in brain scans that are hard to see."
                        icon={Binary}
                        delay={0.1}
                    />
                    <FeatureCard
                        title="Clear Proof"
                        desc="We show you exactly what the AI found so you can trust the results."
                        icon={Eye}
                        delay={0.2}
                    />
                    <FeatureCard
                        title="Mixed Checks"
                        desc="We look at both pictures and patient info to get the right answer."
                        icon={Cpu}
                        delay={0.3}
                    />
                    <FeatureCard
                        title="Fast Results"
                        desc="Our system works very quickly to give you results in seconds."
                        icon={Zap}
                        delay={0.4}
                    />
                    <FeatureCard
                        title="Safe System"
                        desc="All your data is kept very safe with high-level protection."
                        icon={Lock}
                        delay={0.5}
                    />
                    <FeatureCard
                        title="Privacy Fix"
                        desc="We follow strict rules to keep patient info private."
                        icon={ShieldCheck}
                        delay={0.6}
                    />
                    <FeatureCard
                        title="Total View"
                        desc="See all your stats and history in one easy place."
                        icon={BarChart3}
                        delay={0.7}
                    />
                    <FeatureCard
                        title="Global Help"
                        desc="Designed to work everywhere to help more people."
                        icon={Globe}
                        delay={0.8}
                    />
                </div>
            </section>
        </div>
    );
};

export default Features;
