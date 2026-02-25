import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, User, Loader2, ShieldCheck, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { axiosPublic } from '../../api/axios';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false); // ✅ Success Screen State
    const [timer, setTimer] = useState(0);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleInitialSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axiosPublic.post('/auth/check-email', { email: formData.email });
            await axiosPublic.post('/auth/send-otp', { email: formData.email });
            setOtpSent(true);
            setTimer(60);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    const handleFinalRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axiosPublic.post('/auth/register', { ...formData, otp });
            // ✅ Yahan redirect nahi karenge, success screen dikhayenge
            setIsRegistered(true); 
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 font-['Manrope'] relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>

            <div className="w-full max-w-[450px] bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-2xl shadow-2xl z-10 transition-all duration-500">
                
                {isRegistered ? (
                    /* ==========================================
                       ✅ SUCCESS SCREEN (Registration Complete)
                       ========================================== */
                    <div className="text-center animate-in zoom-in-95 duration-500 py-4">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-6">
                            <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                                <CheckCircle2 className="text-white" size={32} />
                            </div>
                        </div>
                        
                        <h2 className="text-2xl font-extrabold text-white mb-2 tracking-tight italic">Welcome to the Team!</h2>
                        <p className="text-gray-400 text-sm mb-10 leading-relaxed px-2">
                            Aapka account <span className="text-blue-400 font-bold">{formData.email}</span> ke liye successfully create ho gaya hai.
                        </p>

                        <Link 
                            to="/admin-login" 
                            className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-600/20"
                        >
                            Continue to Sign In <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                ) : (
                    /* ==========================================
                       FORM VIEW (Step 1 & 2)
                       ========================================== */
                    <>
                        <div className="text-center mb-10">
                            <div className="inline-block p-4 rounded-2xl bg-blue-600/10 mb-4">
                                <ShieldCheck className="text-blue-500" size={32} />
                            </div>
                            <h1 className="text-3xl font-extrabold text-white tracking-tight italic">Canva Solutions</h1>
                            <p className="text-gray-500 text-sm mt-2 font-medium">
                                {otpSent ? "Verify your identity" : "Admin Registration"}
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs text-center">
                                {error}
                            </div>
                        )}

                        {!otpSent ? (
                            /* STEP 1: Details */
                            <form onSubmit={handleInitialSubmit} className="space-y-4">
                                <div className="group relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                                    <input type="text" required placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500/50 transition-all" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                                </div>
                                <div className="group relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                                    <input type="email" required placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500/50 transition-all" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                                </div>
                                <div className="group relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                                    <input type="password" required placeholder="Create Password" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500/50 transition-all" onChange={(e) => setFormData({...formData, password: e.target.value})} />
                                </div>
                                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-600/20">
                                    {loading ? <Loader2 className="animate-spin" /> : <>Register Admin <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
                                </button>
                            </form>
                        ) : (
                            /* STEP 2: OTP Verification */
                            <form onSubmit={handleFinalRegister} className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                                <div className="text-center px-4">
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        We've sent a 6-digit code to <br/>
                                        <span className="text-white font-bold underline underline-offset-4 decoration-blue-500">{formData.email}</span>
                                    </p>
                                </div>
                                <div className="relative">
                                    <input type="text" required placeholder="••••••" maxLength="6" className="w-full bg-white/5 border border-blue-500/30 rounded-2xl py-5 text-center text-2xl tracking-[1rem] text-white outline-none focus:border-blue-500 transition-all font-mono placeholder:text-gray-800" onChange={(e) => setOtp(e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-500 py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2">
                                        {loading ? <Loader2 className="animate-spin" /> : 'Confirm Verification'}
                                    </button>
                                    <button type="button" onClick={() => setOtpSent(false)} className="text-gray-500 text-sm hover:text-white transition-colors flex items-center justify-center gap-2">
                                        <ArrowLeft size={14} /> Back to Edit
                                    </button>
                                </div>
                                {timer > 0 ? (
                                    <p className="text-center text-xs text-gray-500">Resend in <span className="text-blue-500">{timer}s</span></p>
                                ) : (
                                    <button type="button" onClick={handleInitialSubmit} className="w-full text-blue-500 text-xs font-bold hover:underline">Resend OTP Code</button>
                                )}
                            </form>
                        )}

                        <div className="mt-10 pt-8 border-t border-white/5 text-center">
                            <p className="text-gray-500 text-sm">
                                Already have an account? 
                                <Link to="/admin-login" className="ml-2 text-blue-500 font-bold hover:text-blue-400 transition-colors">Sign In</Link>
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Register;