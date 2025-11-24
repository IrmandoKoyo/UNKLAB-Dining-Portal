import React, { useState, useEffect } from 'react';
import DigitalID from '../components/DigitalID';
import { MOCK_USER, MENU_DATA } from '../materi/data';
import { History, Share2, AlertCircle, Wifi, Clock, CheckCircle2, X, Ticket, Send, Camera, ThumbsUp, MessageSquare, Info } from 'lucide-react';
import MealDetailModal from '../components/MealDetailModal';
import type { MenuItem } from '../types';

const DigitalCard = () => {
    // State untuk simulasi timer keamanan
    const [timeLeft, setTimeLeft] = useState(30);
    // State untuk tab aktif (Scan atau Riwayat)
    const [activeTab, setActiveTab] = useState<'scan' | 'history'>('scan');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState<{ item: MenuItem, title: string, time: string } | null>(null);

    // New Feature States
    const [isGuestPassOpen, setIsGuestPassOpen] = useState(false);
    const [isReportOpen, setIsReportOpen] = useState(false);
    const [reportType, setReportType] = useState('food');
    const [reportText, setReportText] = useState('');
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    // Efek Timer Mundur
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 30));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Data Dummy Riwayat Scan
    const history = [
        { id: 1, meal: "Sarapan Pagi", time: "06:15", date: "Hari Ini", status: "Sukses", type: 'pagi', dayOffset: 0 },
        { id: 2, meal: "Makan Malam", time: "18:20", date: "Kemarin", status: "Sukses", type: 'sore', dayOffset: -1 },
        { id: 3, meal: "Makan Siang", time: "12:05", date: "Kemarin", status: "Sukses", type: 'siang', dayOffset: -1 },
        { id: 4, meal: "Sarapan Pagi", time: "06:30", date: "Kemarin", status: "Sukses", type: 'pagi', dayOffset: -1 },
    ];

    const handleHistoryClick = (item: any) => {
        // Calculate the correct day index based on offset
        const today = new Date().getDay(); // 0 (Sun) - 6 (Sat)
        // MENU_DATA starts from Sunday (Index 0)

        let targetDayIndex = (today + item.dayOffset + 7) % 7;

        const menuForDay = MENU_DATA[targetDayIndex];
        const mealItem = menuForDay.meals[item.type as 'pagi' | 'siang' | 'sore'];

        if (mealItem) {
            setSelectedMeal({
                item: mealItem,
                title: item.meal,
                time: item.time // Or the standard time range
            });
            setIsModalOpen(true);
        }
    };

    const handleShareGuestPass = () => {
        alert("Link Guest Pass berhasil disalin! Kirimkan kepada tamu Anda.");
        setIsGuestPassOpen(false);
    };

    const handleSubmitReport = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Laporan Anda telah terkirim. Terima kasih atas masukan Anda!");
        setIsReportOpen(false);
        setReportText('');
    };

    return (
        <div className="max-w-md mx-auto p-4 md:p-6 min-h-[80vh] flex flex-col relative">

            <MealDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                meal={selectedMeal?.item || null}
                title={selectedMeal?.title || ''}
                time={selectedMeal?.time || ''}
            />

            {/* === MODAL GUEST PASS === */}
            {isGuestPassOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-slate-900 w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden relative border border-slate-700">
                        {/* Decorative Background */}
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-amber-400 to-orange-600 opacity-20"></div>
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500 rounded-full blur-3xl opacity-20"></div>

                        <div className="p-6 relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-black text-white tracking-tight">FOR GUEST</h3>
                                    <p className="text-amber-500 text-xs font-bold uppercase tracking-widest">One-Time Access</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setIsInfoOpen(!isInfoOpen)} className={`p-1 rounded-full transition-colors ${isInfoOpen ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
                                        <Info size={20} />
                                    </button>
                                    <button onClick={() => setIsGuestPassOpen(false)} className="p-1 bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {isInfoOpen ? (
                                <div className="bg-slate-800/50 rounded-2xl p-4 mb-6 border border-slate-700 animate-in fade-in slide-in-from-top-2">
                                    <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                                        <Info size={16} className="text-amber-500" />
                                        Aturan Penggunaan
                                    </h4>
                                    <p className="text-slate-300 text-xs leading-relaxed">
                                        Anak asrama yang membawa teman untuk makan di dining dapat menggunakan kartu Guest ini.
                                        <br /><br />
                                        <strong>Berlaku:</strong> 2 kali makan dalam sebulan atau sekali dalam 2 minggu.
                                        <br /><br />
                                        <strong>Perlu di ketahui:</strong> Anda akan dikenakan charge 1 kali makan sesuai ketentuan yang berlaku.
                                    </p>
                                    <button onClick={() => setIsInfoOpen(false)} className="mt-3 w-full py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-lg transition-colors">
                                        Mengerti
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="bg-white rounded-2xl p-4 mb-6 shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300">
                                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-50">
                                            <div className="w-48 h-48 bg-slate-900 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                                                {/* Fake QR Pattern */}
                                                <div className="absolute inset-0 opacity-50 grid grid-cols-6 grid-rows-6 gap-1 p-2">
                                                    {[...Array(36)].map((_, i) => (
                                                        <div key={i} className={`bg-white rounded-sm ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`}></div>
                                                    ))}
                                                </div>
                                                <div className="w-12 h-12 bg-white rounded-lg z-10 flex items-center justify-center">
                                                    <Ticket className="text-slate-900" size={24} />
                                                </div>
                                            </div>
                                            <p className="text-xs font-mono text-slate-500 text-center">CODE: GUEST-{Math.floor(Math.random() * 10000)}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-slate-300 text-sm">
                                            <Clock size={16} className="text-amber-500" />
                                            <span>Berlaku: <strong>1 kali</strong> dalam <strong>2 minggu</strong></span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-300 text-sm">
                                            <CheckCircle2 size={16} className="text-amber-500" />
                                            <span>Akses: <strong>Dining Hall</strong></span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleShareGuestPass}
                                        className="w-full mt-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 active:scale-95 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Share2 size={18} />
                                        Bagikan Tiket
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* === MODAL LAPOR MASALAH === */}
            {isReportOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 relative">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-900">Lapor Masalah</h3>
                            <button onClick={() => setIsReportOpen(false)} className="p-1 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmitReport}>
                            <div className="mb-4">
                                <label className="block text-sm font-bold text-slate-700 mb-2">Jenis Masalah</label>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setReportType('food')}
                                        className={`p-3 rounded-xl border text-sm font-medium transition-all flex flex-col items-center gap-1 ${reportType === 'food' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                                    >
                                        <span className="text-xl">🍔</span>
                                        Makanan
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setReportType('service')}
                                        className={`p-3 rounded-xl border text-sm font-medium transition-all flex flex-col items-center gap-1 ${reportType === 'service' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                                    >
                                        <span className="text-xl">👨‍🍳</span>
                                        Pelayanan
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setReportType('cleanliness')}
                                        className={`p-3 rounded-xl border text-sm font-medium transition-all flex flex-col items-center gap-1 ${reportType === 'cleanliness' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                                    >
                                        <span className="text-xl">🧹</span>
                                        Kebersihan
                                    </button>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-bold text-slate-700 mb-2">Detail Laporan</label>
                                <textarea
                                    value={reportText}
                                    onChange={(e) => setReportText(e.target.value)}
                                    placeholder="Jelaskan masalah yang Anda temui..."
                                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none min-h-[100px] text-sm text-slate-700 resize-none"
                                    required
                                ></textarea>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-bold text-slate-700 mb-2">Bukti Foto (Opsional)</label>
                                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer">
                                    <Camera size={24} className="mb-2" />
                                    <span className="text-xs font-medium">Ketuk untuk ambil foto</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                <Send size={18} />
                                Kirim Laporan
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* --- TAB SWITCHER (Navigasi Atas) --- */}
            <div className="flex bg-slate-200 p-1 rounded-xl mb-8 self-center w-full max-w-[250px] shadow-inner">
                <button
                    onClick={() => setActiveTab('scan')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'scan' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <span className={`w-2 h-2 rounded-full ${activeTab === 'scan' ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`}></span>
                    Live ID
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'history' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <History size={14} />
                    Riwayat
                </button>
            </div>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex-grow flex flex-col items-center relative">

                {/* TAMPILAN SCANNER (QR) */}
                {activeTab === 'scan' ? (
                    <div className="w-full flex flex-col items-center animate-in fade-in zoom-in duration-300">

                        {/* Security Badge */}
                        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full text-xs font-bold mb-6 border border-emerald-100 shadow-sm">
                            <Wifi size={14} />
                            <span>Jaringan Aman • Unklab Secure</span>
                        </div>

                        {/* Komponen Kartu Digital (Yang sudah ada) */}
                        <div className="w-full transform transition-transform active:scale-95 duration-200">
                            <DigitalID user={MOCK_USER} />
                        </div>

                        {/* Bar Timer Keamanan */}
                        <div className="w-full max-w-[280px] mt-8">
                            <div className="flex justify-between text-xs text-slate-400 font-bold mb-2 uppercase tracking-wider">
                                <span>Auto-refresh QR</span>
                                <span className="text-slate-900">{timeLeft}s</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ease-linear ${timeLeft < 10 ? 'bg-red-500' : 'bg-slate-900'}`}
                                    style={{ width: `${(timeLeft / 30) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Tombol Aksi Cepat */}
                        <div className="grid grid-cols-2 gap-4 w-full mt-8">
                            <button
                                onClick={() => setIsGuestPassOpen(true)}
                                className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200 transition-all group cursor-pointer"
                            >
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                                    <Share2 size={20} />
                                </div>
                                <span className="text-xs font-bold text-slate-600">Guest Pass</span>
                            </button>
                            <button
                                onClick={() => setIsReportOpen(true)}
                                className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200 transition-all group cursor-pointer"
                            >
                                <div className="p-3 bg-red-50 text-red-600 rounded-xl group-hover:scale-110 transition-transform">
                                    <AlertCircle size={20} />
                                </div>
                                <span className="text-xs font-bold text-slate-600">Lapor Masalah</span>
                            </button>
                        </div>
                    </div>
                ) : (

                    /* TAMPILAN RIWAYAT (HISTORY) */
                    <div className="w-full animate-in slide-in-from-right duration-300 self-start">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                <Clock size={20} className="text-slate-400" />
                                Aktivitas Terakhir
                            </h3>
                            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">4 Data</span>
                        </div>

                        <div className="space-y-4 relative">
                            {/* Garis Timeline */}
                            <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-100 -z-10"></div>

                            {history.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleHistoryClick(item)}
                                    className="flex items-center gap-4 p-3 bg-white border border-slate-100 rounded-2xl hover:shadow-md transition-all cursor-pointer group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-amber-50 group-hover:text-amber-500 transition-colors z-10">
                                        {item.status === "Sukses" ? <CheckCircle2 size={18} /> : <Clock size={18} />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-slate-900 text-sm">{item.meal}</h4>
                                            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">{item.time}</span>
                                        </div>
                                        <div className="flex justify-between items-center mt-1">
                                            <p className="text-xs text-slate-500">{item.date}</p>
                                            <span className="text-[10px] font-bold text-green-600">{item.status}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DigitalCard;