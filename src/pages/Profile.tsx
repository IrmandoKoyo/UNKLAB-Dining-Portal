import React, { useState, useEffect, useRef } from 'react';
import {
    User, CreditCard, Settings, LogOut, Mail, Phone, MapPin,
    ChevronLeft, Award, Zap, Clock, ShieldAlert, CheckCircle2,
    Leaf, Flame, TrendingUp, X, Moon, BellRing, Shield, HelpCircle, ChevronRight, Sun, Save, Lock, Utensils, Camera
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

interface ProfileProps {
    onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'achievements'>('overview');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // --- GLOBAL USER CONTEXT ---
    const { user, updateUser, updateProfileImage } = useUser();

    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- STATE MODALS (Pop-up) ---
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isSecurityOpen, setIsSecurityOpen] = useState(false);
    const [isDietaryOpen, setIsDietaryOpen] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    // --- STATE FORM EDIT PROFILE ---
    // Only Phone is editable
    const [tempPhone, setTempPhone] = useState(user.phone || "0812-3456-7890");

    // --- STATE FORM SECURITY (Password) ---
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // --- STATE DIETARY ---
    const [dietaryPreferences, setDietaryPreferences] = useState<string[]>(["Gluten Free", "Low Sugar"]);

    // --- STATE PENGATURAN ---
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isNotifEnabled, setIsNotifEnabled] = useState(true);

    // Logika Dark Mode: Mengubah class 'dark' di elemen <html> HTML
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Fungsi Simpan Perubahan Profil
    const handleSaveProfile = () => {
        updateUser({ phone: tempPhone });
        setIsEditProfileOpen(false);
        alert(`Berhasil! Nomor Telepon diperbarui menjadi: ${tempPhone}`);
    };

    // Fungsi Simpan Password Baru
    const handleSavePassword = () => {
        if (oldPassword && newPassword && confirmPassword) {
            if (newPassword !== confirmPassword) {
                alert("Password baru dan konfirmasi tidak cocok!");
                return;
            }
            setIsSecurityOpen(false);
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            alert("Keamanan Diperbarui! Password Anda telah diganti.");
        } else {
            alert("Mohon isi semua kolom password.");
        }
    };

    const handleSaveDietary = () => {
        setIsDietaryOpen(false);
        alert("Preferensi makanan berhasil disimpan!");
    };

    const toggleDietary = (pref: string) => {
        setDietaryPreferences(prev =>
            prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
        );
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            updateProfileImage(imageUrl);
        }
    };

    const handleComingSoon = (featureName: string) => {
        alert(`Fitur "${featureName}" akan segera hadir di update berikutnya!`);
    };

    // Data Dummy Achievements (Pencapaian)
    const achievements = [
        { id: 1, title: "Early Bird", desc: "Sarapan sebelum jam 06:00 selama 3 hari", icon: <Clock size={20} />, color: "bg-orange-100 text-orange-600", unlocked: true },
        { id: 2, title: "Green Hero", desc: "Memilih menu Full Vegan 5x berturut-turut", icon: <Leaf size={20} />, color: "bg-emerald-100 text-emerald-600", unlocked: true },
        { id: 3, title: "Streak Master", desc: "Tidak absen makan di dining selama 1 minggu", icon: <Flame size={20} />, color: "bg-red-100 text-red-600", unlocked: false },
        { id: 4, title: "Saver", desc: "Sisa poin di atas 100 di akhir bulan", icon: <TrendingUp size={20} />, color: "bg-blue-100 text-blue-600", unlocked: false },
    ];

    const dietaryOptions = ["Vegetarian", "Vegan", "Gluten Free", "Dairy Free", "Nut Free", "Low Sugar", "High Protein"];

    return (
        <div className={`max-w-4xl mx-auto p-4 md:p-8 pb-24 relative transition-colors duration-300 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>

            {/* === MODAL EDIT PROFILE (Pop-up) === */}
            {isEditProfileOpen && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-2xl p-6 border border-slate-100 dark:border-slate-700">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Edit Contact Info</h3>
                            <button onClick={() => setIsEditProfileOpen(false)}><X size={20} className="text-slate-400" /></button>
                        </div>
                        <div className="space-y-4">
                            {/* Read Only Fields */}
                            <div className="opacity-60 pointer-events-none">
                                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Nama Lengkap (Locked)</label>
                                <input type="text" value={user.name} readOnly className="w-full p-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-600" />
                            </div>
                            <div className="opacity-60 pointer-events-none">
                                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">NIM (Locked)</label>
                                <input type="text" value={user.nim} readOnly className="w-full p-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-600" />
                            </div>
                            <div className="opacity-60 pointer-events-none">
                                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Email Kampus (Locked)</label>
                                <input type="text" value={user.email || "s2200666@studend.unklab.ac.id"} readOnly className="w-full p-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-600" />
                            </div>
                            <div className="opacity-60 pointer-events-none">
                                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Asrama (Locked)</label>
                                <input type="text" value={user.dorm} readOnly className="w-full p-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-600" />
                            </div>

                            {/* Editable Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nomor Telepon</label>
                                <input
                                    type="tel"
                                    value={tempPhone}
                                    onChange={(e) => setTempPhone(e.target.value)}
                                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-amber-500 outline-none text-slate-900 dark:text-white transition-colors"
                                    placeholder="08xx-xxxx-xxxx"
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex gap-3">
                            <button onClick={() => setIsEditProfileOpen(false)} className="flex-1 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">Batal</button>
                            <button onClick={handleSaveProfile} className="flex-1 py-3 rounded-xl font-bold bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/20 transition-all">Simpan</button>
                        </div>
                    </div>
                </div>
            )}

            {/* === MODAL SECURITY (Change Password) === */}
            {isSecurityOpen && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-2xl p-6 border border-slate-100 dark:border-slate-700">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Ganti Password</h3>
                            <button onClick={() => setIsSecurityOpen(false)}><X size={20} className="text-slate-400" /></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Password Lama</label>
                                <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-amber-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Password Baru</label>
                                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-amber-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Konfirmasi Password Baru</label>
                                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-amber-500 outline-none" />
                            </div>
                        </div>
                        <div className="mt-6 flex gap-3">
                            <button onClick={() => setIsSecurityOpen(false)} className="flex-1 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">Batal</button>
                            <button onClick={handleSavePassword} className="flex-1 py-3 rounded-xl font-bold bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/20 transition-all">Simpan Password</button>
                        </div>
                    </div>
                </div>
            )}

            {/* === MODAL DIETARY PROFILE === */}
            {isDietaryOpen && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-2xl p-6 border border-slate-100 dark:border-slate-700">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Edit Dietary Profile</h3>
                            <button onClick={() => setIsDietaryOpen(false)}><X size={20} className="text-slate-400" /></button>
                        </div>
                        <p className="text-sm text-slate-500 mb-4">Pilih preferensi makanan Anda untuk mendapatkan rekomendasi menu yang sesuai.</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {dietaryOptions.map(option => (
                                <button
                                    key={option}
                                    onClick={() => toggleDietary(option)}
                                    className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${dietaryPreferences.includes(option)
                                        ? 'bg-green-500 text-white border-green-500 shadow-md'
                                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        <div className="mt-6 flex gap-3">
                            <button onClick={() => setIsDietaryOpen(false)} className="flex-1 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">Batal</button>
                            <button onClick={handleSaveDietary} className="flex-1 py-3 rounded-xl font-bold bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/20 transition-all">Simpan Preferensi</button>
                        </div>
                    </div>
                </div>
            )}

            {/* === MODAL HELP CENTER === */}
            {isHelpOpen && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-2xl p-6 border border-slate-100 dark:border-slate-700">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Help Center</h3>
                            <button onClick={() => setIsHelpOpen(false)}><X size={20} className="text-slate-400" /></button>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <h4 className="font-bold text-slate-900 mb-1">Layanan Mahasiswa</h4>
                                <p className="text-sm text-slate-500 mb-2">Untuk masalah akun, kartu hilang, atau data tidak sesuai.</p>
                                <a href="tel:+6281234567890" className="text-amber-600 font-bold text-sm flex items-center gap-2">
                                    <Phone size={14} /> Hubungi Admin (WA)
                                </a>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <h4 className="font-bold text-slate-900 mb-1">Dining Hall Office</h4>
                                <p className="text-sm text-slate-500 mb-2">Untuk kritik & saran mengenai makanan atau pelayanan.</p>
                                <a href="mailto:dining@unklab.ac.id" className="text-amber-600 font-bold text-sm flex items-center gap-2">
                                    <Mail size={14} /> Kirim Email
                                </a>
                            </div>
                            <div className="text-center pt-2">
                                <p className="text-xs text-slate-400">Versi Aplikasi v1.2.0 (Beta)</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <button onClick={() => setIsHelpOpen(false)} className="w-full py-3 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">Tutup</button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- HEADER --- */}
            <div className="flex items-center justify-between mb-8">
                <Link to="/" className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <ChevronLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold">My Profile</h1>
                <button
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    className={`p-2 rounded-xl transition-all ${isSettingsOpen ? 'bg-amber-100 text-amber-600 rotate-90' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm border border-slate-100 dark:border-slate-700'}`}
                >
                    <Settings size={24} />
                </button>
            </div>

            {/* --- SETTINGS DROPDOWN --- */}
            {isSettingsOpen && (
                <div className="mb-8 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-xl border border-slate-100 dark:border-slate-700 animate-in slide-in-from-top-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Pengaturan Aplikasi</h3>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-100 dark:bg-slate-600 rounded-lg text-slate-600 dark:text-slate-300">
                                    {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
                                </div>
                                <span className="font-medium text-sm">Dark Mode</span>
                            </div>
                            <button
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className={`w-12 h-6 rounded-full p-1 transition-colors ${isDarkMode ? 'bg-amber-500' : 'bg-slate-200'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-100 dark:bg-slate-600 rounded-lg text-slate-600 dark:text-slate-300">
                                    <BellRing size={18} />
                                </div>
                                <span className="font-medium text-sm">Notifikasi</span>
                            </div>
                            <button
                                onClick={() => setIsNotifEnabled(!isNotifEnabled)}
                                className={`w-12 h-6 rounded-full p-1 transition-colors ${isNotifEnabled ? 'bg-green-500' : 'bg-slate-200'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${isNotifEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>
                        <button onClick={() => setIsSecurityOpen(true)} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-100 dark:bg-slate-600 rounded-lg text-slate-600 dark:text-slate-300">
                                    <Lock size={18} />
                                </div>
                                <span className="font-medium text-sm">Ganti Password</span>
                            </div>
                            <ChevronRight size={16} className="text-slate-400" />
                        </button>
                        <button onClick={() => setIsHelpOpen(true)} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-100 dark:bg-slate-600 rounded-lg text-slate-600 dark:text-slate-300">
                                    <HelpCircle size={18} />
                                </div>
                                <span className="font-medium text-sm">Help Center</span>
                            </div>
                            <ChevronRight size={16} className="text-slate-400" />
                        </button>
                        <div className="h-px bg-slate-100 dark:bg-slate-700 my-2"></div>
                        <button onClick={onLogout} className="w-full flex items-center gap-3 p-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                            <LogOut size={18} />
                            <span className="font-bold text-sm">Log Out</span>
                        </button>
                    </div>
                </div>
            )}

            {/* --- PROFILE CARD --- */}
            <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-white dark:border-slate-700 relative overflow-hidden mb-8">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-700 border-4 border-white dark:border-slate-600 shadow-lg overflow-hidden">
                            <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                            accept="image/*"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-0 right-0 p-2 bg-slate-900 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                        >
                            <Camera size={14} />
                        </button>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{user.name}</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-4">{user.nim} • {user.dorm}</p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg text-xs font-bold border border-amber-100 dark:border-amber-900/30">
                                <Award size={14} />
                                <span>Gold Member</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-900/30">
                                <CheckCircle2 size={14} />
                                <span>Active Student</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full md:w-auto">
                        <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-100 dark:border-slate-700 text-center min-w-[140px]">
                            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Points Balance</p>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{user.balance}</h3>
                        </div>
                    </div>
                </div>

                {/* Contact Info Preview */}
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                            <Mail size={18} />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs text-slate-400 font-bold">Email Kampus</p>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{user.email || "s2200666@studend.unklab.ac.id"}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        <div className="p-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg">
                            <Phone size={18} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-bold">Nomor Telepon</p>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{user.phone || "0812-3456-7890"}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- TABS --- */}
            <div className="flex gap-6 mb-6 border-b border-slate-200 dark:border-slate-700">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'overview' ? 'text-amber-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    Overview
                    {activeTab === 'overview' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-600 rounded-t-full"></div>}
                </button>
                <button
                    onClick={() => setActiveTab('achievements')}
                    className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'achievements' ? 'text-amber-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    Achievements
                    {activeTab === 'achievements' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-600 rounded-t-full"></div>}
                </button>
            </div>

            {/* --- TAB CONTENT --- */}
            <div className="animate-in slide-in-from-bottom-4 duration-500">
                {activeTab === 'overview' ? (
                    <div className="space-y-6">
                        {/* Dietary Profile Section */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                    <Utensils size={20} className="text-amber-500" />
                                    Dietary Profile
                                </h3>
                                <button onClick={() => setIsDietaryOpen(true)} className="text-xs font-bold text-amber-600 hover:underline">Edit</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {dietaryPreferences.length > 0 ? (
                                    dietaryPreferences.map((pref, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-xs font-bold border border-green-100 dark:border-green-900/30">
                                            {pref}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-sm text-slate-400 italic">Belum ada preferensi makanan.</p>
                                )}
                            </div>
                        </div>

                        {/* Recent Activity (Dummy) */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">Recent Activity</h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                                            <Clock size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Makan Siang</h4>
                                            <p className="text-xs text-slate-500">Dining Hall • Kemarin, 12:30</p>
                                        </div>
                                        <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">-1 Meal</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {achievements.map((item) => (
                            <div key={item.id} className={`p-4 rounded-2xl border ${item.unlocked ? 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700 opacity-60'} flex items-start gap-4`}>
                                <div className={`p-3 rounded-xl ${item.unlocked ? item.color : 'bg-slate-200 text-slate-400'}`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                                    <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                                    {item.unlocked ? (
                                        <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-1 rounded-md">Unlocked</span>
                                    ) : (
                                        <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded-md">Locked</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;