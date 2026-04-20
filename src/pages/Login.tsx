import React, { useState } from 'react';
import { ArrowRight, Lock, User as UserIcon, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logoUnklab from '../assets/logounklab.svg';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulasi loading network
        setTimeout(() => {
            onLogin();
            navigate('/');
        }, 2000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-amber-50 relative overflow-hidden">
            {/* Background Blobs Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-gradient-to-br from-amber-300/30 to-orange-200/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] bg-gradient-to-bl from-amber-400/20 to-yellow-100/40 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-12 z-10 p-4">

                {/* Left Side: Branding (Desktop Only) */}
                <div className="hidden md:flex flex-col justify-center p-8">
                    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-2xl shadow-amber-900/5">
                        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/10 p-3">
                            <img src={logoUnklab} alt="Unklab Logo" className="w-full h-full object-contain" />
                        </div>
                        <h1 className="text-5xl font-bold text-slate-900 mb-4 leading-tight">
                            Dining <br /> <span className="text-amber-600">Universitas Klabat</span>
                        </h1>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            Sistem manajemen tempat makan asrama Universitas Klabat.
                            Cek menu, dan akses dining hall hanya dengan satu sentuhan.
                        </p>

                        <div className="mt-8 flex gap-4">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" style={{ backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})`, backgroundSize: 'cover' }}></div>
                                ))}
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="font-bold text-slate-800 text-sm">2,500+ Students</span>
                                <span className="text-xs text-slate-500">Trusted by Unklab Dormitory</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-amber-900/10 border border-white w-full max-w-md relative">

                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-900">Welcome Back!</h2>
                            <p className="text-slate-500">Please sign in to access your dashboard</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">NIM / NO Reg</label>
                                <div className="relative group">
                                    <UserIcon className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-amber-500 transition-colors" size={20} />
                                    <input
                                        type="text"
                                        placeholder="1050.../s22..."
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-slate-900 transition-all font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-amber-500 transition-colors" size={20} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-slate-900 transition-all font-medium"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500" />
                                    <span className="text-slate-600">Remember me</span>
                                </label>
                                <a href="#" className="text-amber-600 hover:text-amber-700 font-medium">Forgot Password?</a>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-slate-900/20 hover:shadow-slate-900/30 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mt-4"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    <>Sign In <ArrowRight size={20} /></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;