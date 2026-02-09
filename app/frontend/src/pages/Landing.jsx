import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Shield, ArrowRight, FlaskConical, Stethoscope,
    Microscope, Zap, Database, Cpu, Layers, Sparkles,
    Eye, BarChart3, Binary, Workflow, CheckCircle2, ShieldCheck
} from 'lucide-react';
import OrbSymbol from '../components/OrbSymbol';

const FadeInView = ({ children, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
};

const Landing = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const textScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    return (
        <div ref={containerRef} className="bg-white text-slate-900 selection:bg-medical-200">
            {/* 1. HERO SECTION: The Kinetic Reveal */}
            <section className="relative min-h-screen flex items-center px-6 lg:px-24 overflow-hidden">
                <motion.div
                    style={{ y: backgroundY }}
                    className="absolute inset-0 bg-gradient-to-b from-medical-50/30 via-white to-white -z-20"
                ></motion.div>

                {/* Decorative Background Blobs */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-medical-100/20 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3"></div>

                <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center z-10 w-full">
                    {/* Left Panel: Content */}
                    <div className="text-left py-20 lg:py-0">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-xl bg-slate-950 text-white font-black text-[9px] tracking-[0.3em] shadow-2xl"
                        >
                            <Sparkles className="w-2.5 h-2.5 text-medical-300" />
                            SMART HEALTH CARE
                        </motion.div>

                        <div className="overflow-hidden mb-8">
                            <motion.h1
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-6xl md:text-[7.5rem] font-black leading-[0.85] tracking-tighter"
                            >
                                HEALTH<span className="text-medical-600 italic">AI</span><br />
                                <span className="text-slate-200 block mt-2">EASY CHECKUP</span>
                            </motion.h1>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl text-slate-500 mb-12 leading-relaxed max-w-lg font-medium tracking-tight"
                        >
                            Easy Alzheimer's checking. We use <span className="text-slate-900 font-black">AI Technology</span> and <span className="text-slate-900 font-black">Basic Info</span> to give very accurate results.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-5"
                        >
                            <Link
                                to="/signup"
                                className="group relative px-10 py-5 bg-medical-600 text-white font-black rounded-2xl shadow-2xl shadow-medical-500/20 hover:bg-medical-700 transition-all flex items-center justify-center gap-3 overflow-hidden text-sm active:scale-95"
                            >
                                <span className="relative z-10">START YOUR TEST</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                            </Link>
                            <a
                                href="#how-it-works"
                                className="px-10 py-5 bg-white text-slate-950 font-black rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all text-center flex items-center justify-center text-sm active:scale-95"
                            >
                                HOW IT WORKS
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1 }}
                            className="mt-16 flex items-center gap-12"
                        >
                            {[
                                { val: "96%", label: "Correctness" },
                                { val: "Fast", label: "Results" }
                            ].map((s, i) => (
                                <div key={i} className="flex flex-col">
                                    <span className="text-4xl font-black text-slate-900 tracking-tighter">{s.val}</span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Panel: Advanced Visual Node */}
                    <div className="hidden lg:flex justify-center items-center relative h-full min-h-[600px]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="relative w-full max-w-md aspect-square"
                        >
                            {/* Neural Core */}
                            <div className="relative z-10 w-full h-full flex items-center justify-center">
                                {/* Ethereal background layers */}
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: 360,
                                        borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 70%", "60% 40% 30% 70% / 50% 60% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 70%"]
                                    }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 bg-medical-500/10 blur-[80px]"
                                />
                                <motion.div
                                    animate={{
                                        scale: [1.2, 1, 1.2],
                                        rotate: -360,
                                        borderRadius: ["60% 40% 30% 70% / 50% 60% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 70%", "60% 40% 30% 70% / 50% 60% 70% 40%"]
                                    }}
                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-10 bg-indigo-500/20 blur-[60px]"
                                />

                                {/* Central Glass Node */}
                                <motion.div
                                    animate={{
                                        y: [-20, 20, -20],
                                    }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    className="relative w-80 h-80 bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden group"
                                >
                                    {/* Inner Rotating Aura */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent,rgba(131,114,255,0.3),transparent)]"
                                    />

                                    {/* Scanning Laser Line */}
                                    <motion.div
                                        animate={{ top: ['-10%', '110%'] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent z-10 blur-[1px]"
                                    />

                                    <OrbSymbol size="lg" className="scale-[2.8] relative z-20 text-medical-600 group-hover:scale-[3] transition-transform duration-700" />

                                    {/* Floating Particles Inside */}
                                    {[...Array(8)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                                                y: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                                                opacity: [0, 1, 0]
                                            }}
                                            transition={{ duration: 2 + Math.random() * 4, repeat: Infinity }}
                                            className="absolute w-1 h-1 bg-white rounded-full"
                                        />
                                    ))}
                                </motion.div>
                            </div>

                            {/* Orbiting Nodes */}
                            {[0, 120, 240].map((deg, i) => (
                                <motion.div
                                    key={i}
                                    style={{ rotate: deg }}
                                    animate={{ rotate: deg + 360 }}
                                    transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-[-15%] border border-slate-100 rounded-[5rem] flex items-start justify-center"
                                >
                                    <div className="w-6 h-6 bg-white border border-slate-200 rounded-full shadow-lg flex items-center justify-center -translate-y-3">
                                        <div className="w-2 h-2 bg-medical-500 rounded-full animate-pulse"></div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Floating Tech Badges */}
                            <motion.div
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-10 -right-10 p-5 bg-white rounded-3xl shadow-2xl border border-slate-50 flex items-center gap-3 z-20"
                            >
                                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600"><ShieldCheck className="w-6 h-6" /></div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Privacy Protocol</span>
                                    <span className="text-sm font-black text-slate-900 tracking-tight">ENCRYPTED NODE</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Industrial Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 lg:left-24 lg:translate-x-0 flex flex-col items-center lg:items-start gap-2"
                >
                    <span className="text-[10px] font-black text-slate-300 tracking-[0.5em] uppercase">Initialize Scroll</span>
                    <div className="w-0.5 h-12 bg-gradient-to-b from-medical-200 to-transparent"></div>
                </motion.div>
            </section>

            {/* 2. THE PROBLEM: Why we are here */}
            <section className="py-24 bg-slate-950 text-white relative">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <FadeInView>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-none">
                                Why We <span className="text-medical-400">Help</span><br /> People.
                            </h2>
                            <p className="text-lg text-slate-400 leading-relaxed mb-8 font-medium">
                                Usually, AI only looks at brain scans. But a scan alone
                                doesn't tell the <span className="text-white font-black italic">Whole Story</span>—like age and test scores.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { icon: Eye, title: "Only Pictures", desc: "Using only pictures can give wrong results because patient history is missing." },
                                    { icon: BarChart3, title: "Mixed Data", desc: "Patient info and brain scans are kept in different places. We bring them together." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-5 p-6 bg-white/5 rounded-3xl border border-white/10">
                                        <div className="w-12 h-12 bg-medical-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                                            <item.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-lg mb-1">{item.title}</h4>
                                            <p className="text-sm text-slate-500 font-medium leading-normal">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FadeInView>

                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="aspect-square bg-gradient-to-br from-medical-900 to-black rounded-[5rem] overflow-hidden border border-white/10 shadow-2xl relative group"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1200"
                                    className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[3s]"
                                    alt="Visual Atrophy Scan"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

                                {/* Animated scanning line */}
                                <motion.div
                                    animate={{ top: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                    className="absolute w-full h-[2px] bg-medical-400 shadow-[0_0_20px_rgba(131,114,255,1)] z-10"
                                ></motion.div>

                                <div className="absolute bottom-10 left-10">
                                    <div className="text-[10px] font-black text-medical-300 uppercase tracking-[0.4em] mb-2">Diagnostic Scan</div>
                                    <div className="text-3xl font-black italic">INCOMPLETED DATA</div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. THE SOLUTION: NEW HYBRID SOLUTION */}
            <section id="how-it-works" className="py-24 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-4xl mx-auto text-center mb-24">
                        <FadeInView>
                            <span className="text-medical-600 font-black uppercase text-[10px] tracking-[0.4em] mb-4 inline-block">Our Simple Way</span>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-6">
                                Joining <span className="italic text-slate-300">Pictures</span> & <br />Patient <span className="text-medical-600">Scores.</span>
                            </h2>
                            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
                                We check both the brain scan and the patient's history. By looking at
                                both, our AI gives a much better answer.
                            </p>
                        </FadeInView>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-50 -z-10"></div>

                        {[
                            {
                                step: "01",
                                title: "Scan Check",
                                icon: Binary,
                                desc: "Our AI breaks down the brain scan to find very small changes that are hard to see with the eye.",
                                theme: "bg-medical-600"
                            },
                            {
                                step: "02",
                                title: "Info Sync",
                                icon: Database,
                                desc: "At the same time, we check things like age and test scores to understand the patient better.",
                                theme: "bg-slate-900"
                            },
                            {
                                step: "03",
                                title: "Mixed Result",
                                icon: Workflow,
                                desc: "The AI combines pixel info and patient scores to give a final result with 96% correctness.",
                                theme: "bg-medical-400"
                            }
                        ].map((item, idx) => (
                            <FadeInView key={idx} delay={idx * 0.2}>
                                <div className="group p-10 bg-slate-50 rounded-[4rem] border border-transparent hover:border-medical-100 hover:bg-white hover:shadow-2xl hover:shadow-medical-100/20 transition-all duration-500 h-full relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 text-8xl font-black text-slate-200/50 group-hover:text-medical-100 transition-colors pointer-events-none">{item.step}</div>
                                    <div className={`w-16 h-16 ${item.theme} rounded-3xl flex items-center justify-center mb-8 shadow-xl group-hover:rotate-12 transition-transform`}>
                                        <item.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black mb-4 tracking-tight">{item.title}</h3>
                                    <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                                </div>
                            </FadeInView>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. INTERACTIVE ARCHITECTURE SECTION: WHAT WE IMPLEMENTED */}
            <section className="py-40 bg-slate-50 overflow-hidden">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1 relative">
                            {/* Animated Code/System Visualizer */}
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                className="bg-white p-12 rounded-[5rem] shadow-2xl relative z-10"
                            >
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-medical-500 rounded-xl flex items-center justify-center text-white"><Cpu className="w-6 h-6" /></div>
                                            <span className="font-black uppercase tracking-widest text-[10px]">Processing Step</span>
                                        </div>
                                        <div className="text-[10px] font-bold text-slate-400">Speed: Fast</div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                                            <motion.div
                                                animate={{ width: ["0%", "92%", "92%"] }}
                                                transition={{ duration: 4, repeat: Infinity }}
                                                className="h-full bg-medical-500"
                                            ></motion.div>
                                        </div>
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                            <span className="text-slate-400">Scan Check Accuracy</span>
                                            <span className="text-medical-600">92%</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                                            <motion.div
                                                animate={{ width: ["0%", "88%", "88%"] }}
                                                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                                                className="h-full bg-slate-900"
                                            ></motion.div>
                                        </div>
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                            <span className="text-slate-400">Patient Info Weight</span>
                                            <span className="text-slate-900">88%</span>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-medical-50 rounded-3xl border border-medical-100 text-center">
                                        <div className="text-[10px] font-black text-medical-600 uppercase tracking-[0.4em] mb-2">Final System Score</div>
                                        <div className="text-6xl font-black text-medical-900 tracking-tighter">96<span className="text-2xl text-medical-400">%</span></div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Decorative element background */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[40px] border-white rounded-[10rem] -z-10"></div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <FadeInView>
                                <span className="text-medical-600 font-black uppercase text-[10px] tracking-[0.5em] mb-6 inline-block">How We Build</span>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 leading-none">
                                    Simple & <br /><span className="italic text-slate-300">Clear</span> AI.
                                </h2>
                                <p className="text-xl text-slate-500 font-medium leading-relaxed mb-10">
                                    We don't keep our AI a secret. It shows <span className="text-slate-900 font-black italic">Clear Signs</span>
                                    on the brain map so doctors can see why the AI gave its score.
                                </p>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-medical-600 font-black text-xs uppercase tracking-widest">
                                            <CheckCircle2 className="w-4 h-4" /> Brain Mapping
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-200 rounded-full"></div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-medical-600 font-black text-xs uppercase tracking-widest">
                                            <CheckCircle2 className="w-4 h-4" /> Visual Proof
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-200 rounded-full"></div>
                                    </div>
                                </div>
                            </FadeInView>
                        </div>
                    </div>
                </div>
            </section>


            {/* Premium Information-Rich Footer */}
            <footer className="bg-slate-950 py-24 text-white border-t border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(131,114,255,0.05),transparent)]"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-4 gap-12 mb-20">
                        {/* Brand Section */}
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-3 mb-6 group cursor-pointer">
                                <OrbSymbol size="sm" />
                                <span className="text-2xl font-black tracking-tighter">HEALTH<span className="text-medical-500">AI</span></span>
                            </div>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
                                Democratizing advanced neural diagnostics through accessible AI technology.
                            </p>
                            <div className="flex gap-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 hover:bg-medical-500/20 transition-all cursor-pointer flex items-center justify-center group">
                                        <div className="w-1.5 h-1.5 bg-slate-500 group-hover:bg-medical-400 rounded-full"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-medical-500 mb-8">Navigation</h4>
                            <ul className="space-y-4">
                                {['Home', 'Features', 'Steps', 'Why Us', 'About'].map(link => (
                                    <li key={link}><Link to={`/${link.toLowerCase().replace(' ', '-')}`} className="text-slate-400 hover:text-white transition-colors text-sm font-bold">{link}</Link></li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-medical-500 mb-8">Legal Node</h4>
                            <ul className="space-y-4">
                                {['Privacy Protocol', 'Terms of Service', 'Security Grid', 'Ethics Statement'].map(link => (
                                    <li key={link}><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-bold">{link}</a></li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-medical-500 mb-8">Global Support</h4>
                            <div className="space-y-6">
                                <div>
                                    <div className="text-[10px] font-black text-slate-600 uppercase mb-1">Encrypted Mail</div>
                                    <div className="text-sm font-black text-slate-300">support@healthai.core</div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-black text-slate-600 uppercase mb-1">System Status</div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">All Nodes Active</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
                            &copy; 2024 Hybrid-ViT Research Unit. For clinical demonstration only.
                        </div>
                        <div className="flex items-center gap-6">
                            <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Documentation</span>
                            <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-white transition-colors">API Keys</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
