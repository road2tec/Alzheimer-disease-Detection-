import React from 'react';
import { motion } from 'framer-motion';
import { Workflow, Binary, Database, Network, Cpu, Layers, Microscope, Sparkles } from 'lucide-react';

const StepCard = ({ num, title, desc, icon: Icon, theme }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group p-10 bg-white rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-medical-100/20 transition-all duration-500 relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 p-8 text-8xl font-black text-slate-50 group-hover:text-medical-50 transition-colors pointer-events-none">{num}</div>
        <div className={`w-16 h-16 ${theme} rounded-2xl flex items-center justify-center mb-8 shadow-xl group-hover:rotate-6 transition-transform`}>
            <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-black mb-4 tracking-tight text-slate-900">{title}</h3>
        <p className="text-slate-500 leading-relaxed font-medium">{desc}</p>
    </motion.div>
);

const HowItWorks = () => {
    return (
        <div className="bg-white min-h-screen pb-24">
            {/* Header */}
            <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-slate-950">
                <div className="absolute inset-0 bg-gradient-to-br from-medical-900/20 to-transparent"></div>
                <div className="container mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10 text-medical-400 font-black text-[10px] uppercase tracking-[0.3em]"
                    >
                        <Network className="w-3 h-3" /> System Steps
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-tight">
                        HOW IT <span className="text-medical-500">WORKS</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        A simple step-by-step look at how we check your brain scan and info.
                    </p>
                </div>
            </section>

            {/* Process Steps */}
            <section className="py-24 px-6">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <StepCard
                            num="01"
                            title="Cleaning the Photo"
                            desc="We take your brain photo and make it clear so the AI can see it better."
                            icon={Microscope}
                            theme="bg-slate-900"
                        />
                        <StepCard
                            num="02"
                            title="AI Checking"
                            desc="Our smart AI looks at small parts of the photo to find any signs of trouble."
                            icon={Binary}
                            theme="bg-medical-600"
                        />
                        <StepCard
                            num="03"
                            title="Your Health Info"
                            desc="We add simple info like age and memory scores to get a full picture of your health."
                            icon={Database}
                            theme="bg-slate-950"
                        />
                        <StepCard
                            num="04"
                            title="Putting it Together"
                            desc="The AI joins the photo results and your health info together to give a clear answer."
                            icon={Layers}
                            theme="bg-medical-500"
                        />
                        <StepCard
                            num="05"
                            title="Showing the Marks"
                            desc="We show marks on the brain map so you and the doctor can see what the AI found."
                            icon={Cpu}
                            theme="bg-amber-500"
                        />
                        <StepCard
                            num="06"
                            title="Report Ready"
                            desc="Your final report is kept safe and shown to you right away."
                            icon={Workflow}
                            theme="bg-emerald-600"
                        />
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HowItWorks;
