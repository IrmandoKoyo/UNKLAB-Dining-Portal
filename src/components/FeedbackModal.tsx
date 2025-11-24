import React, { useState } from 'react';
import { X, MessageSquare, Star, Loader2, CheckCircle, Send } from 'lucide-react';

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (rating === 0 && feedback.trim() === '') return;

        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => {
                onClose();
                // Reset after closing
                setTimeout(() => {
                    setIsSuccess(false);
                    setRating(0);
                    setFeedback('');
                }, 300);
            }, 2000);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Card */}
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all scale-100 animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="bg-slate-900 p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 rounded-full blur-[50px] opacity-20 -mr-10 -mt-10"></div>

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex items-center gap-3 mb-2 relative z-10">
                        <div className="p-2 bg-amber-500 rounded-xl text-slate-900">
                            <MessageSquare size={24} />
                        </div>
                        <h2 className="text-xl font-bold">Beri Masukan</h2>
                    </div>
                    <p className="text-slate-400 text-sm relative z-10">
                        Bantu kami meningkatkan kualitas pelayanan dan makanan di Dining Hall.
                    </p>
                </div>

                {/* Content */}
                <div className="p-6">
                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in duration-300">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle size={32} className="text-emerald-500" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Terima Kasih!</h3>
                            <p className="text-slate-500 text-sm">Masukan Anda sangat berharga bagi kami.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Rating */}
                            <div className="text-center">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                    Kepuasan Secara Umum
                                </label>
                                <div className="flex justify-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            onClick={() => setRating(star)}
                                            className="p-1 transition-transform hover:scale-110 focus:outline-none"
                                        >
                                            <Star
                                                size={32}
                                                className={`transition-colors ${star <= (hoverRating || rating)
                                                        ? 'fill-amber-400 text-amber-400'
                                                        : 'text-slate-200'
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Text Area */}
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    Saran & Kritik
                                </label>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Contoh: Kebersihan meja perlu ditingkatkan..."
                                    className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none text-slate-700 text-sm"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting || (rating === 0 && feedback === '')}
                                className={`w-full font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${(rating === 0 && feedback === '')
                                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                        : 'bg-slate-900 text-white shadow-slate-900/20 hover:bg-slate-800 active:scale-[0.98]'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Mengirim...
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        Kirim Masukan
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;
