import React, { useState } from 'react';
import { Calendar, Filter, Check, Trophy, Utensils, ThumbsUp, TrendingUp, Loader2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { MENU_DATA } from '../materi/data';
import MealCard from '../components/MealCard';
import MealDetailModal from '../components/MealDetailModal';
import type { MenuItem } from '../types';

type FilterType = 'all' | 'pagi' | 'siang' | 'sore' | 'high-protein' | 'low-calorie';

const Schedule = () => {
    const [selectedDayIndex, setSelectedDayIndex] = useState(() => {
        const today = new Date().getDay();
        return today; // Sunday is 0, Monday is 1, etc.
    });
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q')?.toLowerCase() || '';
    const currentMenu = MENU_DATA[selectedDayIndex];

    // Filter State
    const [filterType, setFilterType] = useState<FilterType | 'favorites'>('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false); // State untuk dropdown

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState<{ item: MenuItem, title: string, time: string } | null>(null);

    // Favorites State (Local Storage)
    const [favorites, setFavorites] = useState<string[]>(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    // --- FITUR VOTING SYSTEM ---
    const [hasVoted, setHasVoted] = useState(false);
    const [isVoting, setIsVoting] = useState(false);
    const [voteData, setVoteData] = useState([
        { id: 1, name: "Mie Goreng Jawa Special", votes: 142, percent: 45 },
        { id: 2, name: "Capcay telur puyuh Kuah", votes: 98, percent: 31 },
        { id: 3, name: "Nasi Uduk Komplit", votes: 75, percent: 24 },
    ]);

    const handleVote = (id: number) => {
        if (hasVoted) return;
        setIsVoting(true);

        // Simulasi network request
        setTimeout(() => {
            const newData = voteData.map(item => {
                if (item.id === id) return { ...item, votes: item.votes + 1 };
                return item;
            });
            const total = newData.reduce((acc, curr) => acc + curr.votes, 0);
            const finalData = newData.map(item => ({
                ...item,
                percent: Math.round((item.votes / total) * 100)
            }));

            setVoteData(finalData);
            setHasVoted(true);
            setIsVoting(false);
        }, 800);
    };

    // Toggle Favorite
    const toggleFavorite = (e: React.MouseEvent, mealName: string) => {
        e.stopPropagation();
        setFavorites(prev => {
            const newFavorites = prev.includes(mealName)
                ? prev.filter(f => f !== mealName)
                : [...prev, mealName];
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    // Add to Calendar
    const addToCalendar = (e: React.MouseEvent, meal: MenuItem, title: string, time: string) => {
        e.stopPropagation();
        const text = `${title}: ${meal.main}`;
        const details = `Menu: ${meal.main}, ${meal.sides.join(', ')}.`;
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(text)}&details=${encodeURIComponent(details)}`;
        window.open(url, '_blank');
    };

    // Share via WhatsApp
    const shareMenu = (e: React.MouseEvent, meal: MenuItem, title: string) => {
        e.stopPropagation();
        const text = `Hey! Let's eat at the dining hall. ${title} menu is: ${meal.main}. See you there!`;
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    const shouldShowMeal = (item: any, type: 'pagi' | 'siang' | 'sore') => {
        if (!item) return false;

        const main = item.main || '';
        const sides = item.sides ? item.sides.join(' ') : '';
        const dessert = item.dessert || '';
        const text = (main + ' ' + sides + ' ' + dessert).toLowerCase();
        const matchesQuery = !query || text.includes(query);

        if (!matchesQuery) return false;

        if (filterType === 'all') return true;
        if (filterType === 'pagi') return type === 'pagi';
        if (filterType === 'siang') return type === 'siang';
        if (filterType === 'sore') return type === 'sore';
        if (filterType === 'high-protein') return item.protein > 20;
        if (filterType === 'low-calorie') return item.calories < 500;
        if (filterType === 'favorites') return favorites.includes(item.main);

        return true;
    };

    const handleMealClick = (item: MenuItem, title: string, time: string) => {
        setSelectedMeal({ item, title, time });
        setIsModalOpen(true);
    };

    const filterOptions: { label: string, value: FilterType | 'favorites' }[] = [
        { label: 'Semua Menu', value: 'all' },
        { label: '❤️ Favorites Only', value: 'favorites' },
        { label: 'Sarapan', value: 'pagi' },
        { label: 'Makan Siang', value: 'siang' },
        { label: 'Makan Malam', value: 'sore' },
        { label: 'High Protein (>20g)', value: 'high-protein' },
        { label: 'Low Calorie (<500kcal)', value: 'low-calorie' },
    ];

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen" onClick={() => isFilterOpen && setIsFilterOpen(false)}>

            <MealDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                meal={selectedMeal?.item || null}
                title={selectedMeal?.title || ''}
                time={selectedMeal?.time || ''}
            />

            {/* --- HEADER & DAY SELECTOR --- */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-1">Weekly Menu</h2>
                    <p className="text-slate-500">Pilih hari untuk melihat jadwal makan.</p>
                </div>

                {/* Day Selector Pills */}
                <div className="bg-white p-1.5 rounded-xl shadow-sm border border-slate-200 flex overflow-x-auto max-w-full gap-1 scrollbar-hide w-full md:w-auto">
                    {MENU_DATA.map((menu, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedDayIndex(idx)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all flex-1 md:flex-none ${selectedDayIndex === idx
                                ? 'bg-amber-500 text-white shadow-md'
                                : 'text-slate-500 hover:bg-slate-100'
                                }`}
                        >
                            {menu.day}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- DROPDOWN FILTER (Kembali ke desain Clean) --- */}
            <div className="flex items-center gap-3 mb-6 px-2 relative z-10">
                <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
                    <Calendar size={20} />
                </div>
                <span className="font-bold text-lg text-slate-800">{currentMenu.date}</span>
                <div className="h-px bg-slate-200 flex-grow ml-4"></div>

                {/* Filter Button & Dropdown */}
                <div className="relative">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsFilterOpen(!isFilterOpen);
                        }}
                        className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl border transition-all ${filterType !== 'all'
                            ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20'
                            : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-900'
                            }`}
                    >
                        <Filter size={16} />
                        {filterType === 'all' ? 'Filter' : filterOptions.find(o => o.value === filterType)?.label}
                    </button>

                    {/* Dropdown Menu */}
                    {isFilterOpen && (
                        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right z-50">
                            <div className="p-1">
                                {filterOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setFilterType(option.value as FilterType | 'favorites')}
                                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${filterType === option.value
                                            ? 'bg-amber-50 text-amber-700'
                                            : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        {option.label}
                                        {filterType === option.value && <Check size={14} />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* --- MENU GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                {shouldShowMeal(currentMenu.meals.pagi, 'pagi') && (
                    <MealCard
                        title="Sarapan Pagi"
                        time="05:30 - 06:30"
                        item={currentMenu.meals.pagi}
                        isFavorite={favorites.includes(currentMenu.meals.pagi.main)}
                        onToggleFavorite={(e: React.MouseEvent) => toggleFavorite(e, currentMenu.meals.pagi.main)}
                        onAddToCalendar={(e: React.MouseEvent) => addToCalendar(e, currentMenu.meals.pagi, "Sarapan Pagi", "05:30 - 06:30")}
                        onShare={(e: React.MouseEvent) => shareMenu(e, currentMenu.meals.pagi, "Sarapan Pagi")}
                        onClick={() => handleMealClick(currentMenu.meals.pagi, "Sarapan Pagi", "05:30 - 06:30")}
                    />
                )}
                {shouldShowMeal(currentMenu.meals.siang, 'siang') && (
                    <MealCard
                        title="Makan Siang"
                        time="11:30 - 13:00"
                        item={currentMenu.meals.siang}
                        isFavorite={favorites.includes(currentMenu.meals.siang.main)}
                        onToggleFavorite={(e: React.MouseEvent) => toggleFavorite(e, currentMenu.meals.siang.main)}
                        onAddToCalendar={(e: React.MouseEvent) => addToCalendar(e, currentMenu.meals.siang, "Makan Siang", "11:30 - 13:00")}
                        onShare={(e: React.MouseEvent) => shareMenu(e, currentMenu.meals.siang, "Makan Siang")}
                        onClick={() => handleMealClick(currentMenu.meals.siang, "Makan Siang", "11:30 - 13:00")}
                    />
                )}
                {shouldShowMeal(currentMenu.meals.sore, 'sore') && (
                    <MealCard
                        title="Makan Malam"
                        time="17:00 - 18:30"
                        item={currentMenu.meals.sore}
                        isFavorite={favorites.includes(currentMenu.meals.sore.main)}
                        onToggleFavorite={(e: React.MouseEvent) => toggleFavorite(e, currentMenu.meals.sore.main)}
                        onAddToCalendar={(e: React.MouseEvent) => addToCalendar(e, currentMenu.meals.sore, "Makan Malam", "17:00 - 18:30")}
                        onShare={(e: React.MouseEvent) => shareMenu(e, currentMenu.meals.sore, "Makan Malam")}
                        onClick={() => handleMealClick(currentMenu.meals.sore, "Makan Malam", "17:00 - 18:30")}
                    />
                )}
            </div>

            {/* --- VOTING SECTION --- */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-900/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full blur-[80px] opacity-20 -mr-16 -mt-16 animate-pulse"></div>

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-amber-400 text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
                            <Trophy size={14} />
                            <span>Community Choice</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Vote Menu Favoritmu!</h2>
                        <p className="text-slate-400 mb-6">Menu dengan voting terbanyak akan hadir di "Special Friday" minggu depan.</p>

                        <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-bold text-slate-500">
                            <Utensils size={16} />
                            <span>Total Votes: 315</span>
                        </div>
                    </div>

                    <div className="w-full md:w-[400px] space-y-3">
                        {voteData.map((item) => (
                            <div key={item.id} className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors group relative overflow-hidden">
                                <div className="flex justify-between items-center mb-2 relative z-10">
                                    <h4 className="font-bold text-sm">{item.name}</h4>
                                    <span className="text-xs font-bold text-amber-400">{item.percent}%</span>
                                </div>

                                {/* Progress Bar */}
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-3 relative z-10">
                                    <div
                                        className="h-full bg-amber-500 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${item.percent}%` }}
                                    ></div>
                                </div>

                                <button
                                    onClick={() => handleVote(item.id)}
                                    disabled={hasVoted || isVoting}
                                    className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all relative z-10 ${hasVoted
                                            ? 'bg-white/5 text-slate-500 cursor-not-allowed'
                                            : 'bg-white text-slate-900 hover:bg-amber-400 hover:text-slate-900'
                                        }`}
                                >
                                    {isVoting && item.id === 1 ? <Loader2 size={14} className="animate-spin" /> : <ThumbsUp size={14} />}
                                    {hasVoted ? 'Voted' : 'Vote This Menu'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Schedule;