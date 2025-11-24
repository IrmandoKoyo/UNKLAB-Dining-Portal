import React from 'react';
import { QrCode, CheckCircle2, Wifi } from 'lucide-react';
import type { User } from '../types';
import logoUnklab from '../assets/logounklab.svg';

const DigitalID: React.FC<{ user: User }> = ({ user }) => {
    return (
        <div className="w-full max-w-sm mx-auto perspective-1000 group">
            {/* Card Container with Holographic Effect on Hover */}
            <div className="relative h-auto bg-slate-900 text-white p-6 rounded-3xl shadow-2xl overflow-hidden transition-transform duration-500 hover:scale-[1.02] hover:rotate-1">

                {/* Abstract Background Patterns */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-overlay filter blur-3xl opacity-10 -ml-16 -mb-16"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                {/* Card Content */}
                <div className="relative z-10 flex flex-col h-full justify-between min-h-[400px]">

                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1">
                                <img src={logoUnklab} alt="Logo" className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h2 className="font-bold text-lg tracking-tight leading-none">UNKLAB</h2>
                                <p className="text-slate-400 text-[10px] uppercase tracking-widest">Universal Access</p>
                            </div>
                        </div>
                        <Wifi size={20} className="text-slate-500 rotate-90" />
                    </div>

                    {/* QR Section */}
                    <div className="flex-grow flex flex-col items-center justify-center my-6">
                        <div className="bg-white p-1 rounded-2xl shadow-lg shadow-amber-500/10">
                            <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl p-3">
                                <QrCode size={160} className="text-slate-900" />
                            </div>
                        </div>
                        <p className="mt-3 text-amber-400 text-xs font-mono animate-pulse">Scan to Validate</p>
                    </div>

                    {/* Footer Info */}
                    <div className="space-y-4">
                        <div>
                            <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Student Name</p>
                            <h1 className="text-2xl font-bold text-white tracking-tight">{user.name}</h1>
                        </div>

                        <div className="flex justify-between items-end pt-4 border-t border-white/10">
                            <div>
                                <p className="text-slate-500 text-[10px] uppercase font-bold">Dormitory</p>
                                <p className="text-slate-300 font-medium">{user.dorm}</p>
                            </div>
                            <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
                                <CheckCircle2 size={14} />
                                <span className="text-xs font-bold">Active</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Holographic Shine Element */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent z-20 pointer-events-none" />
            </div>
        </div>
    );
};

export default DigitalID;