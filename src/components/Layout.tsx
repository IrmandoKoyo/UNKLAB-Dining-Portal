import React, { useState } from 'react';
import { Outlet, Link, useLocation, useSearchParams } from 'react-router-dom';
import { MapPin, Search, Bell, CalendarRange, Home, QrCode, User, Info } from 'lucide-react';
import { useUser } from '../context/UserContext';
import Footer from './Footer';

import logoUnklab from '../assets/logounklab.svg';

const Layout = () => {
    const location = useLocation();
    const activePath = location.pathname;
    const [searchParams, setSearchParams] = useSearchParams();
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const { user } = useUser();

    const NOTIFICATIONS = [
        { id: 1, title: 'Menu Besok Tersedia', text: 'Cek menu spesial untuk besok!', time: '10m ago', unread: true },
        { id: 2, title: 'Ulasan Disukai', text: 'Seseorang menyukai ulasan Anda.', time: '1h ago', unread: false },
        { id: 3, title: 'Sisa Poin Makan', text: 'Poin Anda tersisa 120.', time: '5h ago', unread: false },
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-amber-200 flex flex-col" onClick={() => isNotificationsOpen && setIsNotificationsOpen(false)}>

            {/* --- TOP NAVIGATION BAR (Glass Effect) --- */}
            <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50 px-4 md:px-8 py-4 transition-all">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/5 border border-slate-100 p-1">
                            <img src={logoUnklab} alt="Unklab Logo" className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg md:text-xl leading-none text-slate-900 tracking-tight">U Dining</h1>
                            <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                                <MapPin size={12} />
                                <span>Universitas Klabat</span>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-1 mx-6 bg-slate-100/50 p-1 rounded-xl border border-slate-200/50">
                        <Link to="/" className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activePath === '/' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>
                            Dashboard
                        </Link>
                        <Link to="/schedule" className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activePath === '/schedule' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>
                            Menu
                        </Link>
                        <Link to="/card" className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activePath === '/card' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>
                            QR Code
                        </Link>
                        <Link to="/about" className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activePath === '/about' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>
                            About
                        </Link>
                    </div>

                    <div className="flex items-center gap-3 md:gap-4">
                        {/* Search Bar (Desktop) */}
                        <div className="hidden md:flex items-center bg-slate-100 rounded-xl px-3 py-2 border border-slate-200 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all w-64">
                            <Search size={18} className="text-slate-400" />
                            <input
                                type="text"
                                placeholder="Cari menu..."
                                className="bg-transparent border-none outline-none text-sm ml-2 w-full placeholder:text-slate-400"
                                onChange={(e) => setSearchParams({ q: e.target.value })}
                            />
                        </div>

                        {/* Notification Bell */}
                        <div className="relative">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsNotificationsOpen(!isNotificationsOpen);
                                }}
                                className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors relative"
                            >
                                <Bell size={20} />
                                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>

                            {/* Notification Dropdown */}
                            {isNotificationsOpen && (
                                <div className="absolute right-0 top-full mt-4 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                    <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                                        <h3 className="font-bold text-sm">Notifikasi</h3>
                                        <button className="text-xs font-bold text-amber-600 hover:text-amber-700">Tandai dibaca</button>
                                    </div>
                                    <div className="max-h-[300px] overflow-y-auto">
                                        {NOTIFICATIONS.map((notif) => (
                                            <div key={notif.id} className={`p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${notif.unread ? 'bg-amber-50/30' : ''}`}>
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className={`text-sm ${notif.unread ? 'font-bold text-slate-900' : 'font-medium text-slate-600'}`}>{notif.title}</h4>
                                                    <span className="text-[10px] font-bold text-slate-400">{notif.time}</span>
                                                </div>
                                                <p className="text-xs text-slate-500 line-clamp-2">{notif.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-3 text-center border-t border-slate-50 bg-slate-50/50">
                                        <button className="text-xs font-bold text-slate-500 hover:text-slate-900">Lihat Semua</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile Avatar (Desktop) */}
                        <Link to="/profile" className="hidden md:block">
                            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-md overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                                <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* --- FOOTER --- */}
            <Footer />

            {/* --- MOBILE BOTTOM NAVIGATION --- */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-50 pb-safe">
                <Link to="/" className={`flex flex-col items-center gap-1 ${activePath === '/' ? 'text-amber-600' : 'text-slate-400'}`}>
                    <Home size={24} strokeWidth={activePath === '/' ? 2.5 : 2} />
                    <span className="text-[10px] font-bold">Home</span>
                </Link>
                <Link to="/schedule" className={`flex flex-col items-center gap-1 ${activePath === '/schedule' ? 'text-amber-600' : 'text-slate-400'}`}>
                    <CalendarRange size={24} strokeWidth={activePath === '/schedule' ? 2.5 : 2} />
                    <span className="text-[10px] font-bold">Menu</span>
                </Link>
                <div className="relative -top-6">
                    <Link to="/card" className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-lg shadow-slate-900/30 border-4 border-slate-50 transform transition-transform active:scale-95">
                        <QrCode size={24} />
                    </Link>
                </div>
                <Link to="/about" className={`flex flex-col items-center gap-1 ${activePath === '/about' ? 'text-amber-600' : 'text-slate-400'}`}>
                    <Info size={24} strokeWidth={activePath === '/about' ? 2.5 : 2} />
                    <span className="text-[10px] font-bold">About</span>
                </Link>
                <Link to="/profile" className={`flex flex-col items-center gap-1 ${activePath === '/profile' ? 'text-amber-600' : 'text-slate-400'}`}>
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-current">
                        <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bold">Profile</span>
                </Link>
            </div>
        </div>
    );
};

export default Layout;