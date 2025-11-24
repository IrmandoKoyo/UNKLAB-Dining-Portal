import React from 'react';
import type { MenuItem } from '../types';
import { Flame, Utensils, Star, ChefHat, Heart, Calendar, Share2 } from 'lucide-react';

interface MealCardProps {
    title: string;
    time: string;
    item: MenuItem;
    isActive?: boolean;
    isFavorite?: boolean;
    badgeText?: string; // New prop for custom badge text
    onClick?: () => void;
    onToggleFavorite?: (e: React.MouseEvent) => void;
    onAddToCalendar?: (e: React.MouseEvent) => void;
    onShare?: (e: React.MouseEvent) => void;
}

const MealCard: React.FC<MealCardProps> = ({
    title,
    time,
    item,
    isActive,
    isFavorite,
    badgeText,
    onClick,
    onToggleFavorite,
    onAddToCalendar,
    onShare
}) => {
    return (
        <div
            onClick={onClick}
            className={`group relative flex flex-col h-full overflow-hidden rounded-3xl transition-all duration-300 ${isActive
                    ? 'bg-white shadow-2xl shadow-amber-500/20 ring-2 ring-amber-400 scale-[1.02]'
                    : 'bg-white border border-slate-100 hover:shadow-xl hover:border-amber-200'
                } ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
        >

            {/* Status Badge */}
            {(isActive || badgeText) && (
                <div className={`absolute top-0 right-0 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-20 shadow-sm ${badgeText === 'DONE' ? 'bg-slate-500' : 'bg-amber-500'}`}>
                    {badgeText || 'SERVING NOW'}
                </div>
            )}

            {/* Image Placeholder (Abstract Food Pattern) */}
            <div className={`h-24 w-full relative overflow-hidden ${isActive ? 'bg-amber-100' : 'bg-blue-100'}`}>
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="absolute bottom-2 left-4 flex items-end gap-3">
                    <div className="p-2 bg-white rounded-xl shadow-sm text-amber-600">
                        <ChefHat size={24} />
                    </div>
                    <div className="mb-1">
                        <h3 className="font-bold text-slate-800 leading-none">{title}</h3>
                        <p className="text-xs text-slate-500 font-medium">{time}</p>
                    </div>
                </div>
            </div>

            {/* Body Card */}
            <div className="p-5 flex-grow flex flex-col">
                <div className="mb-4">
                    <div className="flex justify-between items-start">
                        <h4 className="text-lg font-serif font-bold text-slate-800 leading-tight">{item.main}</h4>
                        <div className="flex items-center gap-1 text-amber-400 bg-amber-50 px-1.5 py-0.5 rounded text-xs font-bold">
                            <Star size={10} fill="currentColor" /> 4.8
                        </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Vegetarian Option Available</p>
                </div>

                <div className="space-y-2 mb-6 flex-grow">
                    {item.sides.map((side, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-300"></div>
                            {side}
                        </div>
                    ))}
                    {item.dessert && (
                        <div className="flex items-center gap-2 text-sm text-amber-600 font-medium mt-2 pt-2 border-t border-dashed border-slate-100">
                            <span className="text-xs px-1.5 py-0.5 bg-amber-100 rounded text-amber-700">Dessert</span>
                            {item.dessert}
                        </div>
                    )}
                </div>

                {/* Nutrition & Action */}
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex gap-3">
                        <div className="text-xs text-slate-500 flex items-center gap-1" title="Calories">
                            <Flame size={14} className="text-orange-400" /> {item.calories}
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-1" title="Protein">
                            <Utensils size={14} className="text-blue-400" /> {item.protein}g
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-1">
                        {onToggleFavorite && (
                            <button
                                onClick={onToggleFavorite}
                                className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-red-500 bg-red-50' : 'text-slate-400 hover:bg-slate-100 hover:text-red-500'}`}
                                title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                            >
                                <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
                            </button>
                        )}
                        {onAddToCalendar && (
                            <button
                                onClick={onAddToCalendar}
                                className="p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-amber-600 transition-colors"
                                title="Add to Google Calendar"
                            >
                                <Calendar size={16} />
                            </button>
                        )}
                        {onShare && (
                            <button
                                onClick={onShare}
                                className="p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-green-600 transition-colors"
                                title="Share via WhatsApp"
                            >
                                <Share2 size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealCard;