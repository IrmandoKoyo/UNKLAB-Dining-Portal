import React, { useState, useEffect } from 'react';
import { Heart, Github, Instagram, Globe, Lightbulb } from 'lucide-react';
import logoUnklab from '../assets/logounklab.svg';

const FOOD_FACTS = [
    "Tempe memiliki kandungan protein yang hampir setara dengan daging sapi!",
    "Brokoli mengandung lebih banyak vitamin C daripada jeruk.",
    "Minum air sebelum makan dapat membantu pencernaan lebih lancar.",
    "Oatmeal adalah salah satu sarapan terbaik untuk kesehatan jantung.",
    "Pisang adalah sumber energi instan terbaik sebelum olahraga.",
    "Wortel tidak hanya bagus untuk mata, tapi juga kulit!",
    "Bayam mengandung zat besi yang sangat tinggi untuk mencegah anemia.",
    "Tahu adalah sumber kalsium nabati yang sangat baik."
];

const Footer = () => {
    const [fact, setFact] = useState("");

    useEffect(() => {
        // Pilih fakta acak setiap kali komponen dimuat
        const randomFact = FOOD_FACTS[Math.floor(Math.random() * FOOD_FACTS.length)];
        setFact(randomFact);
    }, []);

    return (
        <footer className="bg-white border-t border-slate-200 mt-12 pb-24 md:pb-12">
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

                    {/* Brand & Copyright */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center p-1.5">
                                <img src={logoUnklab} alt="Logo" className="w-full h-full object-contain" />
                            </div>
                            <span className="font-bold text-xl text-slate-900 tracking-tight">U Dining</span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                            Sistem informasi dining hall Universitas Klabat. Menyajikan menu sehat vegetarian untuk generasi unggul.
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon icon={<Instagram size={18} />} />
                            <SocialIcon icon={<Github size={18} />} />
                            <SocialIcon icon={<Globe size={18} />} />
                        </div>
                    </div>

                    {/* Widget Interaktif: Tahukah Anda? */}
                    <div className="md:col-span-2 bg-amber-50 rounded-2xl p-6 border border-amber-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="absolute top-0 right-0 bg-amber-200 w-16 h-16 rounded-bl-full -mr-8 -mt-8 opacity-50"></div>

                        <div className="flex items-start gap-4 relative z-10">
                            <div className="p-3 bg-white rounded-full text-amber-500 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                <Lightbulb size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-1">Tahukah Anda?</h4>
                                <p className="text-slate-600 text-sm italic">"{fact}"</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-xs text-center md:text-left">
                        &copy; {new Date().getFullYear()} Universitas Klabat. All rights reserved.
                    </p>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                        <span>Dibuat dengan</span>
                        <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" />
                        <span>oleh Mahasiswa FILKOM</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
    <button className="p-2 bg-slate-50 text-slate-500 rounded-full hover:bg-slate-900 hover:text-white transition-all duration-300">
        {icon}
    </button>
);

export default Footer;