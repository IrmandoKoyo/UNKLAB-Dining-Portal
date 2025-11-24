import React from 'react';
import { Flame, Dumbbell } from 'lucide-react';
import { MENU_DATA } from '../materi/data';

const NutritionWidget = () => {
    // Calculate today's nutrition
    const today = new Date().getDay();
    const currentDayIndex = (today + 6) % 7;
    const menu = MENU_DATA[currentDayIndex];

    const totalCalories =
        menu.meals.pagi.calories +
        menu.meals.siang.calories +
        menu.meals.sore.calories;

    const totalProtein =
        menu.meals.pagi.protein +
        menu.meals.siang.protein +
        menu.meals.sore.protein;

    // Mock targets
    const targetCalories = 2200;
    const targetProtein = 60;

    const calPercentage = Math.min((totalCalories / targetCalories) * 100, 100);
    const proteinPercentage = Math.min((totalProtein / targetProtein) * 100, 100);

    return (
        <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 border border-slate-100 mt-8">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
                Daily Nutrition Tracker
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Calories */}
                <div>
                    <div className="flex justify-between items-end mb-2">
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
                            <Flame size={18} className="text-orange-500" /> Calories
                        </div>
                        <div className="text-right">
                            <span className="text-2xl font-bold text-slate-900">{totalCalories}</span>
                            <span className="text-sm text-slate-400"> / {targetCalories} kcal</span>
                        </div>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${calPercentage}%` }}
                        ></div>
                    </div>
                </div>

                {/* Protein */}
                <div>
                    <div className="flex justify-between items-end mb-2">
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
                            <Dumbbell size={18} className="text-blue-500" /> Protein
                        </div>
                        <div className="text-right">
                            <span className="text-2xl font-bold text-slate-900">{totalProtein}g</span>
                            <span className="text-sm text-slate-400"> / {targetProtein}g</span>
                        </div>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${proteinPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-400">
                    Based on today's menu selection.
                </p>
            </div>
        </div>
    );
};

export default NutritionWidget;
