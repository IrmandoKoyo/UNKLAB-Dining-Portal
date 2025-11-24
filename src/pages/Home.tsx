import React, { useState, useEffect } from 'react';
import { Clock, Users, Calendar, Wallet } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { MENU_DATA, MOCK_USER } from '../materi/data';
import MealCard from '../components/MealCard';
import DigitalID from '../components/DigitalID';
import MealDetailModal from '../components/MealDetailModal';
import FeedbackModal from '../components/FeedbackModal';
import AnnouncementBanner from '../components/AnnouncementBanner';
import NutritionWidget from '../components/NutritionWidget';
import type { MenuItem } from '../types';

const Home = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeMeal, setActiveMeal] = useState<'pagi' | 'siang' | 'sore'>('siang');
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q')?.toLowerCase() || '';

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState<{ item: MenuItem, title: string, time: string } | null>(null);

    // Default to today
    const today = new Date().getDay();
    const currentDayIndex = today;
    const currentMenu = MENU_DATA[currentDayIndex];

    // Status State
    const [nextMealTime, setNextMealTime] = useState("05:30");
    const [queueStatus, setQueueStatus] = useState("Low");

    useEffect(() => {
        const updateStatus = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const timeVal = hours + minutes / 60;

            // Logic Flow (Strict Transitions):
            // 00:00 - 06:30 -> Active: Pagi
            // 06:30 - 13:00 -> Active: Siang
            // 13:00 - End   -> Active: Sore

            if (timeVal < 6.5) { // Until 06:30
                setActiveMeal('pagi');
                if (timeVal < 5.5) {
                    setNextMealTime("05:30");
                    setQueueStatus("Low");
                } else {
                    setNextMealTime("11:30");
                    setQueueStatus("Normal");
                }
            } else if (timeVal < 13) { // Until 13:00
                setActiveMeal('siang');
                if (timeVal < 11.5) {
                    setNextMealTime("11:30");
                    setQueueStatus("Low");
                } else {
                    setNextMealTime("17:00");
                    setQueueStatus("High");
                }
            } else {
                // Sore covers everything after 13:00
                setActiveMeal('sore');
                if (timeVal < 17) {
                    setNextMealTime("17:00");
                    setQueueStatus("Low");
                } else if (timeVal < 18.5) {
                    setNextMealTime("05:30");
                    setQueueStatus("Normal");
                } else {
                    // Late Night (> 18:30)
                    setNextMealTime("05:30");
                    setQueueStatus("Closed");
                }
            }
        };

        updateStatus();
        const timer = setInterval(() => {
            setCurrentTime(new Date());
            updateStatus();
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Helper to determine badge text
    const getBadgeText = (mealType: 'pagi' | 'siang' | 'sore') => {
        const hours = currentTime.getHours();
        const timeVal = hours + currentTime.getMinutes() / 60;

        // Times
        const pagiStart = 5.5; // 05:30
        const pagiEnd = 6.5;   // 06:30

        const siangStart = 11.5; // 11:30
        const siangEnd = 13;     // 13:00

        const soreStart = 17;    // 17:00
        const soreEnd = 18.5;    // 18:30

        if (mealType === 'pagi') {
            if (timeVal < pagiStart) return "PREPARING";
            if (timeVal >= pagiStart && timeVal <= pagiEnd) return undefined; // "SERVING NOW"
            return "DONE";
        }

        if (mealType === 'siang') {
            if (timeVal < siangStart) return "PREPARING"; // Before 11:30
            if (timeVal >= siangStart && timeVal <= siangEnd) return undefined; // "SERVING NOW"
            return "DONE";
        }

        if (mealType === 'sore') {
            if (timeVal < soreStart) return "PREPARING"; // Before 17:00
            if (timeVal >= soreStart && timeVal <= soreEnd) return undefined; // "SERVING NOW"
            return "DONE"; // After 18:30
        }

        return undefined;
    };

    // Helper to determine if a card should be highlighted (Active Style)
    const isCardActive = (mealType: 'pagi' | 'siang' | 'sore') => {
        // The user wants specific highlight behavior:
        // Pagi: Highlighted from 00:00 until 10:00
        // Siang: Highlighted from 10:00 until 15:00
        // Sore: Highlighted from 15:00 until 23:59 (Even when DONE)

        return activeMeal === mealType;
    };

    // Favorites State
    const [favorites, setFavorites] = useState<string[]>(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

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

    const matchesSearch = (item: any) => {
        if (!query) return true;
        if (!item) return false;

        const main = item.main || '';
        const sides = item.sides ? item.sides.join(' ') : '';
        const dessert = item.dessert || '';

        const text = (main + ' ' + sides + ' ' + dessert).toLowerCase();
        return text.includes(query);
    };

    const handleMealClick = (item: MenuItem, title: string, time: string) => {
        setSelectedMeal({ item, title, time });
        setIsModalOpen(true);
    };

    const getGreeting = () => {
        const hours = currentTime.getHours();
        if (hours < 12) return 'Good Morning';
        if (hours < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">

            {/* Modal */}
            <MealDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                meal={selectedMeal?.item || null}
                title={selectedMeal?.title || ''}
                time={selectedMeal?.time || ''}
            />

            <FeedbackModal
                isOpen={isFeedbackOpen}
                onClose={() => setIsFeedbackOpen(false)}
            />

            {/* --- LEFT COLUMN: DASHBOARD WIDGETS --- */}
            <div className="w-full lg:w-[350px] space-y-6 flex-shrink-0">

                {/* 1. Quick Stats Widget */}
                <div className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500 rounded-full blur-[60px] opacity-20 -mr-10 -mt-10 animate-pulse"></div>
                    <div className="relative z-10">
                        <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">Live Status</p>
                        <div className="flex items-end gap-2 mb-6">
                            <h2 className="text-4xl font-bold">{currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</h2>
                            <span className="text-slate-400 text-sm mb-1.5">WITA</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                <Clock className="text-amber-400 mb-2" size={20} />
                                <p className="text-xs text-slate-400">Next Meal</p>
                                <p className="font-bold text-lg">{nextMealTime}</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                <Users className="text-emerald-400 mb-2" size={20} />
                                <p className="text-xs text-slate-400">Queue</p>
                                <p className="font-bold text-lg">{queueStatus}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Digital ID (Visible on Desktop Home) */}
                <div className="hidden lg:block">
                    <DigitalID user={MOCK_USER} />
                    <div className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        System Online & Connected
                    </div>
                </div>
            </div>

            {/* --- RIGHT COLUMN: CONTENT & MENU --- */}
            <div className="w-full flex-grow">

                {/* Announcement Banner (New) */}
                <AnnouncementBanner />

                {/* Header Section (Personalized) */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-1">
                            {getGreeting()}, <span className="text-amber-600">{MOCK_USER.name.split(' ')[0]}</span>!
                        </h2>
                        <div className="flex items-center gap-2 text-slate-500">
                            <Wallet size={16} className="text-slate-400" />
                            <span>Balance: <span className="font-bold text-slate-700">{MOCK_USER.balance} Points</span></span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-bold text-amber-600 bg-amber-50 px-4 py-2 rounded-xl border border-amber-100">
                        <Calendar size={18} />
                        <span>{currentMenu.day}, {currentMenu.date}</span>
                    </div>
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {matchesSearch(currentMenu.meals.pagi) && (
                        <MealCard
                            title="Sarapan Pagi"
                            time="05:30 - 06:30"
                            item={currentMenu.meals.pagi}
                            isActive={isCardActive('pagi')}
                            badgeText={getBadgeText('pagi')}
                            isFavorite={favorites.includes(currentMenu.meals.pagi.main)}
                            onToggleFavorite={(e: React.MouseEvent) => toggleFavorite(e, currentMenu.meals.pagi.main)}
                            onAddToCalendar={(e: React.MouseEvent) => addToCalendar(e, currentMenu.meals.pagi, "Sarapan Pagi", "05:30 - 06:30")}
                            onShare={(e: React.MouseEvent) => shareMenu(e, currentMenu.meals.pagi, "Sarapan Pagi")}
                            onClick={() => handleMealClick(currentMenu.meals.pagi, "Sarapan Pagi", "05:30 - 06:30")}
                        />
                    )}
                    {matchesSearch(currentMenu.meals.siang) && (
                        <MealCard
                            title="Makan Siang"
                            time="11:30 - 13:00"
                            item={currentMenu.meals.siang}
                            isActive={isCardActive('siang')}
                            badgeText={getBadgeText('siang')}
                            isFavorite={favorites.includes(currentMenu.meals.siang.main)}
                            onToggleFavorite={(e: React.MouseEvent) => toggleFavorite(e, currentMenu.meals.siang.main)}
                            onAddToCalendar={(e: React.MouseEvent) => addToCalendar(e, currentMenu.meals.siang, "Makan Siang", "11:30 - 13:00")}
                            onShare={(e: React.MouseEvent) => shareMenu(e, currentMenu.meals.siang, "Makan Siang")}
                            onClick={() => handleMealClick(currentMenu.meals.siang, "Makan Siang", "11:30 - 13:00")}
                        />
                    )}
                    {matchesSearch(currentMenu.meals.sore) && (
                        <MealCard
                            title="Makan Malam"
                            time="17:00 - 18:30"
                            item={currentMenu.meals.sore}
                            isActive={isCardActive('sore')}
                            badgeText={getBadgeText('sore')}
                            isFavorite={favorites.includes(currentMenu.meals.sore.main)}
                            onToggleFavorite={(e: React.MouseEvent) => toggleFavorite(e, currentMenu.meals.sore.main)}
                            onAddToCalendar={(e: React.MouseEvent) => addToCalendar(e, currentMenu.meals.sore, "Makan Malam", "17:00 - 18:30")}
                            onShare={(e: React.MouseEvent) => shareMenu(e, currentMenu.meals.sore, "Makan Malam")}
                            onClick={() => handleMealClick(currentMenu.meals.sore, "Makan Malam", "17:00 - 18:30")}
                        />
                    )}
                </div>

                {/* Nutrition Widget (Moved Here) */}
                <NutritionWidget />

                {/* Feedback Widget (Bottom) */}
                <div
                    onClick={() => setIsFeedbackOpen(true)}
                    className="mt-10 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-slate-900/10 cursor-pointer hover:scale-[1.01] transition-transform"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl">😋</div>
                        <div>
                            <h3 className="font-bold text-lg">Suka makanan hari ini?</h3>
                            <p className="text-slate-400 text-sm">Bantu dining hall meningkatkan kualitas makanan.</p>
                        </div>
                    </div>
                    <div className="flex gap-2 pointer-events-none">
                        {[1, 2, 3, 4, 5].map(star => (
                            <button key={star} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-slate-900 transition-colors flex items-center justify-center font-bold border border-white/10">
                                {star}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;
