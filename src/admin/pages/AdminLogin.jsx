import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Loader2, ArrowRight, ShieldCheck, UserPlus } from 'lucide-react';
import { axiosPublic } from '../../api/axios';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminLogin = () => {
    const { setAdminAuth } = useAdminAuth();
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        const res = await axiosPublic.post('/auth/login', { email, password });
        
      
        localStorage.setItem('auth', JSON.stringify(res.data));

       
        setAdminAuth(res.data);
     
        navigate('/admin');
    } catch (err) {
        const message = err.response?.data?.message || 'Invalid credentials. Please try again.';
        setError(message); 
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 font-['Manrope'] relative overflow-hidden">
            {/* Background Glow Decorations */}
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full"></div>

            <div className="w-full max-w-[450px] bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-2xl shadow-2xl z-10 relative transition-all duration-500">
                
                {/* Header Section */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-blue-600/10 mb-5">
                        <ShieldCheck className="text-blue-500" size={36} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight italic">Admin Login</h1>
                    <p className="text-gray-500 text-sm mt-2">Manage your Canva Solutions ecosystem</p>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs text-center animate-pulse">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Input */}
                    <div className="space-y-2">
                        <label className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-black ml-1">Email ID</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input 
                                type="email" required
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-blue-500/50 focus:bg-white/[0.07] outline-none transition-all placeholder:text-gray-700"
                                placeholder="admin@canvasolutions.com"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-black">Security Key</label>
                            <Link to="/forgot-password" size={18} className="text-blue-500 text-[10px] uppercase tracking-wider font-bold hover:text-blue-400 transition-colors">
                                Forgot?
                            </Link>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input 
                                type="password" required
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-blue-500/50 focus:bg-white/[0.07] outline-none transition-all placeholder:text-gray-700"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-500 py-4 mt-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-600/20 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : (
                            <>
                                Login <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

              
            </div>
        </div>
    );
};

export default AdminLogin;