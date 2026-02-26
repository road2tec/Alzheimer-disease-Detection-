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

    return (
        <div ref={containerRef} className="bg-white text-slate-900 selection:bg-indigo-100 font-outfit">
            {/* 1. HERO SECTION */}
            <section className="relative min-h-[90vh] flex items-center px-6 lg:px-24 overflow-hidden">
                {/* Background Image with Overlay */}
                <motion.div
                    style={{ y: backgroundY }}
                    className="absolute inset-0 bg-gradient-to-b from-indigo-50/30 via-white to-white -z-20"
                ></motion.div>

                {/* Decorative Background Blobs */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-50/20 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3"></div>

                <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center z-10 w-full mt-20 lg:mt-0">
                    {/* Left Panel: Content */}
                    <div className="text-left py-20 lg:py-0">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-indigo-50 text-indigo-600 font-bold text-xs tracking-widest border border-indigo-100"
                        >
                            <Sparkles className="w-3 h-3" />
                            SIMPLE BRAIN HEALTH CHECK
                        </motion.div>

                        <div className="mb-8">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tight text-slate-900"
                            >
                                Health <span className="text-indigo-600">ML Model</span><br />
                                <span className="text-slate-300 block mt-2">Checkup.</span>
                            </motion.h1>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl text-slate-500 mb-12 leading-relaxed max-w-lg font-medium"
                        >
                            A simple way to check your brain health. We use <span className="text-slate-900 font-bold">Smart ML Model</span> and your <span className="text-slate-900 font-bold">Health Info</span> to give you clear and fast answers.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-5"
                        >
                            <Link
                                to="/signup"
                                className="group relative px-10 py-5 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 active:scale-95"
                            >
                                START FREE CHECKUP
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a
                                href="#how-it-works"
                                className="px-10 py-5 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all text-center flex items-center justify-center active:scale-95"
                            >
                                LEARN MORE
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1 }}
                            className="mt-16 flex items-center gap-12"
                        >
                            {[
                                { val: "96%", label: "Accuracy" },
                                { val: "Instantly", label: "Results" }
                            ].map((s, i) => (
                                <div key={i} className="flex flex-col">
                                    <span className="text-4xl font-bold text-slate-900 tracking-tight">{s.val}</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Panel: Visualization */}
                    <div className="hidden lg:flex justify-center items-center relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="relative w-full max-w-md aspect-square"
                        >
                            {/* Realistic Medical Image */}
                            <motion.div
                                animate={{
                                    y: [-15, 15, -15],
                                }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="relative w-full h-full bg-white rounded-[4rem] border border-slate-100 shadow-2xl shadow-indigo-100 flex items-center justify-center overflow-hidden group"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
                                    alt="Medical Analysis"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-indigo-900/10"></div>

                                {/* Overlay Gradient for depth */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-transparent"></div>

                                {/* Scanning Laser Line (Optional, keeping for tech feel) */}
                                <motion.div
                                    animate={{ top: ['-10%', '110%'] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-[2px] bg-indigo-400/50 blur-[1px] z-10"
                                />
                            </motion.div>

                            {/* Verification Badge */}
                            <motion.div
                                animate={{ y: [-5, 5, -5] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-6 -right-6 p-6 bg-white rounded-3xl shadow-xl border border-slate-50 flex items-center gap-4 z-20"
                            >
                                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600"><ShieldCheck className="w-7 h-7" /></div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Medical Grade</span>
                                    <span className="text-sm font-bold text-slate-900">SECURE ANALYSIS</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. THE CHALLENGE */}
            <section className="py-32 bg-slate-50 relative overflow-hidden">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <FadeInView>
                            <span className="text-indigo-600 font-bold uppercase text-[10px] tracking-widest mb-4 inline-block">The Problem</span>
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1] text-slate-900">
                                Better Checks with <span className="text-indigo-600">More Info.</span>
                            </h2>
                            <p className="text-xl text-slate-500 leading-relaxed mb-10 font-medium">
                                Photos alone don't tell the whole story. To get a real checkup, we look at both your <span className="text-slate-900">health history</span> and your <span className="text-slate-900">brain photos.</span>
                            </p>
                            <div className="space-y-6">
                                {[
                                    { icon: Eye, title: "Simple Checks", desc: "Most checks only look at photos and miss your personal health history." },
                                    { icon: BarChart3, title: "Hidden Info", desc: "Health records and photos are often kept apart. We bring them together for you." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-5 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-100">
                                            <item.icon className="w-6 h-6 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1 text-slate-900">{item.title}</h4>
                                            <p className="text-sm text-slate-500 font-medium leading-normal">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FadeInView>

                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="aspect-square bg-white rounded-[4rem] overflow-hidden border border-slate-100 shadow-2xl relative"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1200"
                                    className="w-full h-full object-cover opacity-80"
                                    alt="Medical Analysis"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent"></div>
                                <div className="absolute bottom-10 left-10">
                                    <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1 leading-none">Smart Screening</div>
                                    <div className="text-3xl font-bold text-slate-900">Unified Data Model</div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. HOW IT WORKS */}
            <section id="how-it-works" className="py-32 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-3xl mx-auto text-center mb-24">
                        <FadeInView>
                            <span className="text-indigo-600 font-bold uppercase text-[10px] tracking-[0.4em] mb-4 inline-block">Our Simple Process</span>
                            <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.9] mb-8 text-slate-900">
                                Smart <span className="text-slate-300">Checking.</span> <br />Clear <span className="text-indigo-600">Answers.</span>
                            </h2>
                            <p className="text-xl text-slate-500 font-medium leading-relaxed">
                                We check both your photos and your health scores. By joining them together, we give you a much better result.
                            </p>
                        </FadeInView>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Upload Photo",
                                icon: Binary,
                                desc: "Our ML Model looks at your brain photo for tiny changes that are too small for humans to see.",
                                theme: "bg-indigo-600"
                            },
                            {
                                step: "02",
                                title: "Add Health Info",
                                icon: Database,
                                desc: "Tell us simple things like age and memory scores to help the ML Model understand your health better.",
                                theme: "bg-slate-900"
                            },
                            {
                                step: "03",
                                title: "Get Results",
                                icon: Workflow,
                                desc: "The system joins all data together to give a clear report with 96% accuracy.",
                                theme: "bg-indigo-400"
                            }
                        ].map((item, idx) => (
                            <FadeInView key={idx} delay={idx * 0.1}>
                                <div className="group p-10 bg-slate-50 rounded-[3rem] border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-xl transition-all duration-500 h-full relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 text-7xl font-bold text-slate-200/50 group-hover:text-indigo-50 transition-colors pointer-events-none">{item.step}</div>
                                    <div className={`w-16 h-16 ${item.theme} rounded-2xl flex items-center justify-center mb-10 shadow-lg group-hover:scale-110 transition-transform`}>
                                        <item.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 tracking-tight text-slate-900">{item.title}</h3>
                                    <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                                </div>
                            </FadeInView>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. PERFORMANCE ACCURACY */}
            <section className="py-32 bg-indigo-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)]"></div>
                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="bg-white p-10 rounded-[3.5rem] shadow-2xl"
                            >
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white"><Cpu className="w-5 h-5" /></div>
                                            <span className="font-bold uppercase tracking-widest text-[10px] text-slate-400">Analysis Engine</span>
                                        </div>
                                    </div>

                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-slate-400">
                                                <span>Image Data Weight</span>
                                                <span className="text-indigo-600">92%</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    animate={{ width: ["0%", "92%"] }}
                                                    transition={{ duration: 3, ease: "easeOut" }}
                                                    className="h-full bg-indigo-500"
                                                ></motion.div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-slate-400">
                                                <span>Clinical Data Weight</span>
                                                <span className="text-slate-900">88%</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    animate={{ width: ["0%", "88%"] }}
                                                    transition={{ duration: 3, ease: "easeOut", delay: 0.4 }}
                                                    className="h-full bg-slate-900"
                                                ></motion.div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-indigo-50 rounded-3xl border border-indigo-100 text-center">
                                        <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.4em] mb-2 leading-none">CHECKUP ACCURACY</div>
                                        <div className="text-7xl font-bold text-slate-900 tracking-tight">96<span className="text-3xl text-indigo-400">%</span></div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <FadeInView>
                                <span className="text-indigo-200 font-bold uppercase text-[10px] tracking-widest mb-6 inline-block leading-none">System Results</span>
                                <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-none">
                                    Trusted by <br /><span className="opacity-80">Doctors.</span>
                                </h2>
                                <p className="text-xl text-indigo-100 font-medium leading-relaxed mb-10">
                                    Our ML Model is easy to understand. It shows clear marks on the brain checkup so doctors can see exactly what was found.
                                </p>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-white"><CheckCircle2 className="w-4 h-4" /></div>
                                        <span className="font-bold text-sm">Visual Evidence</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-white"><CheckCircle2 className="w-4 h-4" /></div>
                                        <span className="font-bold text-sm">Clear Reports</span>
                                    </div>
                                </div>
                            </FadeInView>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-slate-900 py-24 text-white font-outfit">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-3 mb-6">
                                <OrbSymbol size="sm" />
                                <span className="text-2xl font-bold tracking-tight">Health <span className="text-indigo-400">ML Model</span></span>
                            </div>
                            <p className="text-slate-400 text-sm font-medium leading-relaxed">
                                Making complex brain health checking simple and accessible for everyone.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold text-[11px] uppercase tracking-widest text-indigo-400 mb-8">Navigation</h4>
                            <ul className="space-y-4">
                                {['Home', 'Features', 'How It Works', 'About Us'].map(link => (
                                    <li key={link}><Link to={`/${link.toLowerCase().replace(/ /g, '-')}`} className="text-slate-300 hover:text-white transition-colors text-sm font-semibold">{link}</Link></li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-[11px] uppercase tracking-widest text-indigo-400 mb-8">Resources</h4>
                            <ul className="space-y-4">
                                {['Documentation', 'Privacy Policy', 'Data Security', 'Support'].map(link => (
                                    <li key={link}><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm font-semibold">{link}</a></li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-[11px] uppercase tracking-widest text-indigo-400 mb-8">Contact</h4>
                            <div className="space-y-4">
                                <p className="text-sm font-semibold text-slate-300">support@healthai.com</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Systems Active</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-none">
                            &copy; 2024 Health ML. For clinical demonstration only.
                        </div>
                        <div className="flex gap-8">
                            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Twitter</span>
                            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest hover:text-white cursor-pointer transition-colors">LinkedIn</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
