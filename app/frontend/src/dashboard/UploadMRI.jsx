import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Activity, Brain, Loader2 } from 'lucide-react';
import { predictApi } from '../services/api';

const UploadMRI = ({ onResult }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [clinical, setClinical] = useState({
        age: 65,
        gender: 'M',
        mmse: 24,
        cdr: 0.5
    });

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        setFile(selected);
        if (selected) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(selected);
        }
    };

    const handleClinicalChange = (e) => {
        setClinical({ ...clinical, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please upload an MRI slice.");

        setLoading(true);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('age', clinical.age);
        formData.append('gender', clinical.gender);
        formData.append('mmse', clinical.mmse);
        formData.append('cdr', clinical.cdr);

        try {
            const res = await predictApi.predict(formData);
            onResult(res.data);
        } catch (err) {
            alert(err.response?.data?.error || "Analysis failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-lg shadow-slate-200 border border-slate-100 mt-2">
                <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
                    {/* MRI Upload Side */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Brain className="w-5 h-5 text-medical-600" />
                            <h3 className="font-bold text-slate-900">MRI Visual Input</h3>
                        </div>

                        <div className={`relative group border-2 border-dashed rounded-3xl transition-all h-56 flex flex-col items-center justify-center overflow-hidden ${preview ? 'border-medical-500' : 'border-slate-300 hover:border-medical-400'}`}>
                            {preview ? (
                                <img src={preview} alt="MRI Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-center p-6">
                                    <div className="w-16 h-16 bg-medical-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <Upload className="w-8 h-8 text-medical-500" />
                                    </div>
                                    <p className="text-slate-500 font-medium">Click to upload MRI slice</p>
                                    <p className="text-xs text-slate-400 mt-1">Supports JPG/PNG optimized for 224x224</p>
                                </div>
                            )}
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </div>
                    </div>

                    {/* Clinical Data Side */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                            <FileText className="w-5 h-5 text-medical-600" />
                            <h3 className="font-bold text-slate-900">Clinical Metrics</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase px-1">Patient Age</label>
                                <input name="age" type="number" value={clinical.age} onChange={handleClinicalChange} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-medical-500 text-sm font-bold text-slate-700" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase px-1">Gender</label>
                                <select name="gender" value={clinical.gender} onChange={handleClinicalChange} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-medical-500 text-sm font-bold text-slate-700">
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase px-1">MMSE Score</label>
                                <input name="mmse" type="number" step="0.5" value={clinical.mmse} onChange={handleClinicalChange} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-medical-500 text-sm font-bold text-slate-700" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase px-1">CDR Assessment</label>
                                <input name="cdr" type="number" step="0.5" value={clinical.cdr} onChange={handleClinicalChange} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-medical-500 text-sm font-bold text-slate-700" />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full py-3 bg-medical-600 text-white font-bold rounded-xl shadow-lg shadow-medical-100 flex items-center justify-center gap-3 hover:bg-medical-700 transition-all disabled:opacity-50 active:scale-95 text-sm"
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Activity className="w-5 h-5" />}
                            {loading ? "Running ML Model Pipeline..." : "Begin Diagnostic Analysis"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default UploadMRI;
