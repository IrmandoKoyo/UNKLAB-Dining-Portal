import React from 'react';
import { Info, Heart, Award, Users, Coffee, MapPin, Star, Sparkles, ChefHat, History } from 'lucide-react';

const About = () => {
    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 pb-24 animate-in fade-in duration-500">

            {/* --- HERO SECTION --- */}
            <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-900 text-white mb-8 shadow-2xl shadow-slate-200">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full blur-[100px] opacity-20 -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 -ml-16 -mb-16"></div>

                <div className="relative z-10 p-8 md:p-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
                        <Sparkles size={14} />
                        <span>Since 1965</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
                        Unklab <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Dining</span>
                    </h1>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
                        Menyajikan lebih dari sekadar makanan. Kami menghadirkan pengalaman kuliner yang sehat, bergizi, dan penuh kehangatan bagi seluruh keluarga besar Universitas Klabat.
                    </p>
                </div>
            </div>

            {/* --- STATS GRID --- */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
                    <div className="w-10 h-10 mx-auto bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-2">
                        <Users size={20} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">3.5k+</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase">Mahasiswa Dilayani</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
                    <div className="w-10 h-10 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2">
                        <Coffee size={20} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">12k+</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase">Porsi per Hari</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
                    <div className="w-10 h-10 mx-auto bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-2">
                        <ChefHat size={20} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">45</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase">Chef & Staff</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
                    <div className="w-10 h-10 mx-auto bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-2">
                        <Star size={20} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">4.8</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase">Rating Kepuasan</p>
                </div>
            </div>

            {/* --- STORY SECTION --- */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                            <History size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Sejarah Kami</h2>
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        Didirikan bersamaan dengan berdirinya Universitas Klabat, Dining Hall telah menjadi jantung kehidupan kampus selama lebih dari 50 tahun. Bermula dari kantin sederhana, kini telah bertransformasi menjadi fasilitas modern dengan standar gizi internasional.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                        Renovasi besar terakhir dilakukan pada tahun 2018, memperkenalkan sistem prasmanan modern dan integrasi teknologi digital untuk memudahkan akses bagi ribuan mahasiswa.
                    </p>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                            <Heart size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Visi & Misi</h2>
                    </div>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <div className="mt-1 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
                            <p className="text-slate-600 text-sm">Menyediakan makanan sehat, halal, dan bergizi seimbang untuk mendukung performa akademik mahasiswa.</p>
                        </li>
                        <li className="flex gap-3">
                            <div className="mt-1 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
                            <p className="text-slate-600 text-sm">Menciptakan lingkungan sosial yang positif di mana mahasiswa dapat berinteraksi dan membangun komunitas.</p>
                        </li>
                        <li className="flex gap-3">
                            <div className="mt-1 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
                            <p className="text-slate-600 text-sm">Terus berinovasi dalam pelayanan dengan memanfaatkan teknologi terkini.</p>
                        </li>
                    </ul>
                </div>
            </div>

            {/* --- TEAM / FOUNDER TRIBUTE --- */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 text-center border border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-2">Dibalik Layar</h2>
                <p className="text-slate-500 mb-8 max-w-md mx-auto">Tim dedikasi yang bekerja mulai jam 3 pagi setiap hari untuk memastikan sarapan hangat tersedia untuk Anda.</p>

                <div className="flex flex-wrap justify-center gap-6">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-slate-200 mb-2 overflow-hidden border-2 border-white shadow-md">
                            <img src="https://ui-avatars.com/api/?name=Chef+Juna&background=random" alt="Chef" />
                        </div>
                        <span className="font-bold text-sm text-slate-900">Chef Juna</span>
                        <span className="text-xs text-slate-500">Head Chef</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-slate-200 mb-2 overflow-hidden border-2 border-white shadow-md">
                            <img src="https://ui-avatars.com/api/?name=Bu+Susi&background=random" alt="Manager" />
                        </div>
                        <span className="font-bold text-sm text-slate-900">Ibu Susi</span>
                        <span className="text-xs text-slate-500">Manager</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-slate-200 mb-2 overflow-hidden border-2 border-white shadow-md">
                            <img src="https://ui-avatars.com/api/?name=Pak+Budi&background=random" alt="Nutritionist" />
                        </div>
                        <span className="font-bold text-sm text-slate-900">Pak Budi</span>
                        <span className="text-xs text-slate-500">Nutritionist</span>
                    </div>
                </div>
            </div>

            {/* --- FOOTER INFO --- */}
            <div className="mt-12 text-center">
                <p className="text-slate-400 text-sm font-medium">
                    &copy; 2025 Unklab Dining System. All rights reserved.
                </p>
                <div className="flex items-center justify-center gap-2 mt-2 text-slate-400 text-xs">
                    <MapPin size={12} />
                    <span>Airmadidi, Minahasa Utara, Sulawesi Utara</span>
                </div>
            </div>

        </div>
    );
};

export default About;
