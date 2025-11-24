import React, { useState, useEffect } from 'react';
import { X, Clock, Flame, Utensils, ChefHat, Star, Info, CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
import type { MenuItem } from '../types';

interface MealDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    meal: MenuItem | null;
    title: string;
    time: string;
}

type ViewMode = 'details' | 'rating' | 'success';
type Tab = 'details' | 'reviews';

interface Review {
    id: number;
    name: string;
    rating: number;
    text: string;
    date: string;
}

const DUMMY_REVIEWS: Review[] = [
    { id: 1, name: 'Sarah M.', rating: 5, text: 'Enak banget! Bumbunya pas dan porsinya mengenyangkan.', date: '2 jam lalu' },
    { id: 2, name: 'John D.', rating: 4, text: 'Rasanya oke, cuma antriannya tadi agak panjang.', date: 'Kemarin' },
    { id: 3, name: 'Jessica', rating: 5, text: 'Menu favorit saya sejauh ini! Wajib coba.', date: '2 hari lalu' },
];

const MealDetailModal: React.FC<MealDetailModalProps> = ({ isOpen, onClose, meal, title, time }) => {
    const [viewMode, setViewMode] = useState<ViewMode>('details');
    const [activeTab, setActiveTab] = useState<Tab>('details');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [review, setReview] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [reviews, setReviews] = useState<Review[]>(DUMMY_REVIEWS);

    // Reset state when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            setViewMode('details');
            setActiveTab('details');
            setRating(0);
            setReview('');
            setIsSubmitting(false);
        }
    }, [isOpen]);

    if (!isOpen || !meal) return null;

    const handleSubmit = () => {
        if (rating === 0) return;
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            const newReview: Review = {
                id: Date.now(),
                name: 'You', // In a real app, get from user profile
                rating: rating,
                text: review,
                date: 'Baru saja'
            };

            setReviews([newReview, ...reviews]);
            setIsSubmitting(false);
            setViewMode('success');

            // Auto switch to reviews tab after showing success briefly
            setTimeout(() => {
                setViewMode('details');
                setActiveTab('reviews');
            }, 1500);

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
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all scale-100 animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">

                {/* Header Image Area */}
                <div className="h-48 bg-amber-100 relative overflow-hidden flex-shrink-0 transition-all duration-500">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px]"></div>

                    {/* Decorative Circles */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-200 rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-200 rounded-full blur-2xl opacity-50"></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/30 backdrop-blur-md p-4 rounded-full shadow-lg border border-white/50">
                            {viewMode === 'success' ? (
                                <CheckCircle size={48} className="text-emerald-500 animate-bounce" />
                            ) : (
                                <ChefHat size={48} className="text-amber-600" />
                            )}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                        {viewMode === 'rating' ? (
                            <button
                                onClick={() => setViewMode('details')}
                                className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-slate-800 transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </button>
                        ) : <div></div>}

                        <button
                            onClick={onClose}
                            className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-slate-800 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-grow overflow-y-auto bg-white rounded-t-3xl -mt-6 relative z-10">
                    <div className="p-6">

                        {/* VIEW: DETAILS (With Tabs) */}
                        {viewMode === 'details' && (
                            <div className="animate-in slide-in-from-right duration-300">

                                {/* Title & Time (Always Visible) */}
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="flex items-center gap-2 text-amber-600 text-sm font-bold mb-1">
                                            <Clock size={14} />
                                            <span>{time}</span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
                                    </div>
                                    <div className="bg-amber-50 px-3 py-1 rounded-xl border border-amber-100 flex flex-col items-center">
                                        <span className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">Rating</span>
                                        <div className="flex items-center gap-1 font-bold text-slate-800">
                                            <Star size={12} className="text-amber-400 fill-amber-400" />
                                            <span>4.8</span>
                                        </div>
                                    </div>
                                </div>

                                {/* TABS */}
                                <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
                                    <button
                                        onClick={() => setActiveTab('details')}
                                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'details' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        Detail Menu
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('reviews')}
                                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'reviews' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        Ulasan ({reviews.length})
                                    </button>
                                </div>

                                {/* TAB CONTENT: DETAILS */}
                                {activeTab === 'details' && (
                                    <div className="animate-in fade-in duration-300">
                                        {/* Main Dish */}
                                        <div className="mb-6">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Main Course</label>
                                            <h3 className="text-xl font-serif font-bold text-slate-800">{meal.main}</h3>
                                            <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                                                <Info size={14} />
                                                Contains local spices and fresh ingredients.
                                            </p>
                                        </div>

                                        {/* Sides & Dessert */}
                                        <div className="space-y-4 mb-8">
                                            <div>
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Side Dishes</label>
                                                <div className="flex flex-wrap gap-2">
                                                    {meal.sides.map((side, idx) => (
                                                        <span key={idx} className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg text-sm font-medium border border-slate-100">
                                                            {side}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {meal.dessert && (
                                                <div>
                                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Dessert</label>
                                                    <span className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium border border-amber-100 inline-block">
                                                        {meal.dessert}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Nutrition Info */}
                                        <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-orange-100 text-orange-600 rounded-xl">
                                                    <Flame size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500 font-medium">Calories</p>
                                                    <p className="text-lg font-bold text-slate-800">{meal.calories} <span className="text-xs font-normal text-slate-400">kcal</span></p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                                                    <Utensils size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500 font-medium">Protein</p>
                                                    <p className="text-lg font-bold text-slate-800">{meal.protein}g</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <button
                                            onClick={() => setViewMode('rating')}
                                            className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all active:scale-[0.98]"
                                        >
                                            Beri Rating & Ulasan
                                        </button>
                                    </div>
                                )}

                                {/* TAB CONTENT: REVIEWS */}
                                {activeTab === 'reviews' && (
                                    <div className="animate-in fade-in duration-300 space-y-4">
                                        {reviews.map((rev) => (
                                            <div key={rev.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold text-xs">
                                                            {rev.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-900">{rev.name}</p>
                                                            <p className="text-[10px] text-slate-400">{rev.date}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-0.5 bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-sm">
                                                        <Star size={10} className="text-amber-400 fill-amber-400" />
                                                        <span className="text-xs font-bold text-slate-700">{rev.rating}</span>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-slate-600 leading-relaxed">"{rev.text}"</p>
                                            </div>
                                        ))}

                                        <button
                                            onClick={() => setViewMode('rating')}
                                            className="w-full mt-4 bg-white border-2 border-slate-900 text-slate-900 font-bold py-3 rounded-xl hover:bg-slate-50 transition-all"
                                        >
                                            Tulis Ulasan Anda
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* VIEW: RATING FORM */}
                        {viewMode === 'rating' && (
                            <div className="animate-in slide-in-from-right duration-300 flex flex-col h-full">
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Bagaimana makanannya?</h2>
                                    <p className="text-slate-500 text-sm">Berikan penilaian jujur Anda untuk menu ini.</p>
                                </div>

                                {/* Star Rating */}
                                <div className="flex justify-center gap-2 mb-8">
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

                                {/* Review Text Area */}
                                <div className="mb-6">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Tulis Ulasan (Opsional)</label>
                                    <textarea
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                        placeholder="Ceritakan pengalaman rasa, tekstur, atau saran..."
                                        className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none text-slate-700 text-sm"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button
                                    onClick={handleSubmit}
                                    disabled={rating === 0 || isSubmitting}
                                    className={`w-full mt-auto font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${rating === 0
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
                                        'Kirim Ulasan'
                                    )}
                                </button>
                            </div>
                        )}

                        {/* VIEW: SUCCESS */}
                        {viewMode === 'success' && (
                            <div className="animate-in zoom-in duration-300 flex flex-col items-center justify-center h-full py-8 text-center">
                                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle size={40} className="text-emerald-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Terima Kasih!</h2>
                                <p className="text-slate-500 text-sm mb-8 max-w-[200px]">
                                    Ulasan Anda telah berhasil dikirim dan akan membantu kami meningkatkan kualitas makanan.
                                </p>
                                <button
                                    onClick={onClose}
                                    className="w-full bg-slate-100 text-slate-900 font-bold py-3.5 rounded-xl hover:bg-slate-200 transition-all"
                                >
                                    Tutup
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealDetailModal;
