import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MessageSquare, ArrowLeft, Send } from 'lucide-react';
import Navbar from '../components/Navbar';
import { reviewApi } from '../services/api';

const ReviewPage = () => {
    const { doctorId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const doctor = location.state?.doctor;

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) return alert("Please select a rating");

        setLoading(true);
        try {
            await reviewApi.addReview({
                doctorId,
                rating,
                comment
            });
            alert("Thank you for your feedback!");
            navigate('/user-dashboard');
        } catch (err) {
            console.error("Failed to submit review", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-outfit">
            <Navbar />
            <main className="max-w-2xl mx-auto px-6 py-20">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 font-bold hover:text-indigo-600 mb-8 transition-colors uppercase text-xs tracking-widest">
                    <ArrowLeft className="w-4 h-4" /> Go Back
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50 border border-slate-100"
                >
                    <header className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-3">Leave a <span className="text-indigo-600">Review.</span></h1>
                        <p className="text-slate-500 font-medium">Share your experience with <span className="text-slate-900 font-bold">{doctor?.name}</span> to help others.</p>
                    </header>

                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-center gap-3 mb-12">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                    className="focus:outline-none transition-transform active:scale-90"
                                >
                                    <Star
                                        className={`w-12 h-12 transition-colors ${star <= (hover || rating)
                                            ? 'text-amber-400 fill-current'
                                            : 'text-slate-200'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>

                        <div className="mb-8">
                            <label className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 block">Your Message</label>
                            <div className="relative">
                                <MessageSquare className="absolute top-4 left-4 w-5 h-5 text-slate-300" />
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 pl-12 text-slate-900 font-medium focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition-all h-40 resize-none"
                                    placeholder="Tell us about the consultation..."
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-5 rounded-2xl font-bold text-white shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-3 active:scale-95 ${loading ? 'bg-slate-400' : 'bg-indigo-600 hover:bg-indigo-700'
                                }`}
                        >
                            {loading ? 'SUBMITTING...' : 'SEND REVIEW'}
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </motion.div>
            </main>
        </div>
    );
};

export default ReviewPage;
