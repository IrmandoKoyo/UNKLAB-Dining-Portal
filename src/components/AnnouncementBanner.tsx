import React from 'react';
import { Megaphone, X } from 'lucide-react';

const AnnouncementBanner = () => {
    const [isVisible, setIsVisible] = React.useState(true);

    if (!isVisible) return null;

    return (
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 text-white shadow-lg shadow-amber-500/20 mb-8 relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-10 -mt-10"></div>

            <div className="flex items-start gap-4 relative z-10">
                <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm">
                    <Megaphone size={24} className="text-white animate-bounce-slow" />
                </div>
                <div className="flex-grow">
                    <h3 className="font-bold text-lg mb-1">Special Christmas Menu! 🎄</h3>
                    <p className="text-amber-50 text-sm leading-relaxed">
                        Nikmati menu spesial Natal minggu depan. Cek menu lengkapnya di halaman Menu.
                    </p>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="text-white/70 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
};

export default AnnouncementBanner;
