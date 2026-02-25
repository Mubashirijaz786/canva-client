import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lock, Loader2, Mail, ArrowLeft } from 'lucide-react';
import { axiosPublic } from '../../api/axios';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Backend ko email aur naya password bhej rahe hain
            const response = await axiosPublic.post('/auth/reset-password', { 
                token, 
                password, 
                email: email.toLowerCase().trim() 
            });

            setMessage("Password updated! Redirecting to login...");
            setTimeout(() => navigate('/admin-login'), 3000);
        } catch (err) {
            // Error handling ko simple rakha hai taake crash na ho
            const errorMsg = err.response?.data?.message || "Reset link expired or invalid";
            alert(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 font-['Manrope'] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>

            <div className="w-full max-w-md bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl shadow-2xl z-10">
                <h2 className="text-3xl font-extrabold text-white mb-2 text-center italic tracking-tight">New Password</h2>
                <p className="text-gray-500 text-center mb-8 text-sm font-medium">Reset access to Canva Solutions</p>

                {message && (
                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400 text-sm text-center animate-pulse">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="group space-y-2">
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black ml-1">Confirm Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input 
                                type="email" required placeholder="admin@canvasolutions.com" 
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500/50 transition-all"
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                    </div>

                    <div className="group space-y-2">
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black ml-1">New Security Key</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input 
                                type="password" required placeholder="••••••••" 
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500/50 transition-all"
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                    </div>

                    <button 
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold text-white transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword; // ✅ Ensure Default Export