import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Eye, BarChart3, Binary, Lock, Cpu, Globe } from 'lucide-react';

const FeatureCard = ({ title, desc, icon: Icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        viewport={{ once: true }}
        className="p-10 bg-white rounded-[3rem] border border-slate-100 hover:border-indigo-100 hover:shadow-xl shadow-sm transition-all group"
    >
        <div className="w-14 h-14 bg-slate-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all border border-slate-100 group-hover:border-indigo-600">
            <Icon className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold mb-4 tracking-tight text-slate-900">{title}</h3>
        <p className="text-slate-500 leading-relaxed font-medium text-sm">{desc}</p>
    </motion.div>
);

const Features = () => {
    return (
        <div className="bg-white min-h-screen pb-24 font-outfit">
            <section className="pt-32 pb-24 px-6 text-center">
                <div className="container mx-auto max-w-4xl">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-indigo-600 font-bold uppercase text-[10px] tracking-widest mb-4 inline-block"
                    >
                        What We Offer
                    </motion.span>
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-8 leading-none">
                        Our <span className="text-indigo-600">Tools.</span>
                    </h1>
                    <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
                        Easy-to-use tools built to help check for early signs of Alzheimer's.
                    </p>
                </div>
            </section>

            <section className="px-6">
                <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FeatureCard
                        title="Smart Photo Scan"
                        desc="We use smart AI to find very small changes in your brain photos that are hard to see."
                        icon={Binary}
                        delay={0.1}
                    />
                    <FeatureCard
                        title="Clear Evidence"
                        desc="We show you exactly what the AI found so you can trust the answers."
                        icon={Eye}
                        delay={0.2}
                    />
                    <FeatureCard
                        title="Full Checkup"
                        desc="We look at both your photos and your health info to get the right answer."
                        icon={Cpu}
                        delay={0.3}
                    />
                    <FeatureCard
                        title="Quick Answers"
                        desc="Our system works very fast to give you answers in just a few seconds."
                        icon={Zap}
                        delay={0.4}
                    />
                    <FeatureCard
                        title="Safe & Secure"
                        desc="All your data is kept very safe with high-level protection."
                        icon={Lock}
                        delay={0.5}
                    />
                    <FeatureCard
                        title="Private Info"
                        desc="We follow strict rules to keep your personal health info private."
                        icon={ShieldCheck}
                        delay={0.6}
                    />
                    <FeatureCard
                        title="Full History"
                        desc="See all your past checks and data in one easy place."
                        icon={BarChart3}
                        delay={0.7}
                    />
                    <FeatureCard
                        title="Help Everywhere"
                        desc="Designed to work for everyone, anywhere in the world."
                        icon={Globe}
                        delay={0.8}
                    />
                </div>
            </section>
        </div>
    );
};

export default Features;
