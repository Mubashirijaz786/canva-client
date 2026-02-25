import React, { useState, useEffect } from 'react';
import { UserPlus, Mail, Lock, User, Loader2, CheckCircle, ShieldAlert, ArrowRight, ArrowLeft, KeyRound, Trash2, Users, ShieldCheck } from 'lucide-react';
import { axiosPrivate } from '../../api/axios';

const AddAdmin = () => {
    const [view, setView] = useState('list'); // 'list' or 'add'
    const [admins, setAdmins] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (view === 'list') fetchAdmins();
    }, [view]);

    const fetchAdmins = async () => {
        setLoading(true);
        try {
            const res = await axiosPrivate.get('/auth/admins');
            setAdmins(res.data);
        } catch (err) {
            setError("Failed to fetch admins");
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveAdmin = async (id) => {
        if (!window.confirm("Are you sure you want to remove this admin?")) return;
        try {
            await axiosPrivate.delete(`/auth/admin/${id}`);
            fetchAdmins();
            alert("Admin removed successfully");
        } catch (err) {
            alert(err.response?.data?.message || "Delete failed");
        }
    };

    // --- OTP LOGIC (Your existing code) ---
    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axiosPrivate.post('/auth/send-admin-otp', { email: formData.email, name: formData.name });
            setOtpSent(true);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send OTP.");
        } finally {
            setLoading(false);
        }
    };

    const handleFinalSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axiosPrivate.post('/auth/verify-admin', { ...formData, otp });
            setSuccess(true);
            setOtpSent(false);
            setFormData({ name: '', email: '', password: '' });
            setOtp('');
            setTimeout(() => { setSuccess(false); setView('list'); }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Invalid or expired OTP.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto font-['Manrope'] animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight italic">Admin Control</h1>
                    <p className="text-gray-500 text-sm">Manage team access and authentication.</p>
                </div>
                
                <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                    <button 
                        onClick={() => setView('list')}
                        className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${view === 'list' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                    >
                        Admin List
                    </button>
                    <button 
                        onClick={() => setView('add')}
                        className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${view === 'add' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                    >
                        Add New
                    </button>
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 flex items-center gap-3">
                    <ShieldAlert size={20} /> <span className="text-sm font-bold">{error}</span>
                </div>
            )}

            {view === 'list' ? (
                /* --- ADMIN LIST VIEW --- */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {loading ? <Loader2 className="animate-spin text-blue-500 mx-auto col-span-2" /> : (
                        admins.map(admin => (
                            <div key={admin._id} className="p-6 bg-white/[0.03] border border-white/10 rounded-[2rem] flex items-center justify-between group hover:border-blue-500/30 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center font-black text-blue-500 border border-white/5">
                                        {admin.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold flex items-center gap-2">
                                            {admin.name} 
                                            {admin.role === 'superadmin' && <ShieldCheck size={14} className="text-blue-500" />}
                                        </h3>
                                        <p className="text-gray-500 text-xs">{admin.email}</p>
                                    </div>
                                </div>
                                {admin.role !== 'superadmin' && (
                                    <button 
                                        onClick={() => handleRemoveAdmin(admin._id)}
                                        className="p-3 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            ) : (
                /* --- ADD ADMIN VIEW (Your Original Form) --- */
                <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-2xl relative overflow-hidden max-w-2xl mx-auto">
                    {success && (
                        <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400 flex items-center gap-3">
                            <CheckCircle size={20} /> <span className="text-sm font-bold">New Admin Activated!</span>
                        </div>
                    )}

                    {!otpSent ? (
                        <form onSubmit={handleSendOTP} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] text-gray-500 uppercase font-black ml-1">Full Name</label>
                                <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500" placeholder="Full Name" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] text-gray-500 uppercase font-black ml-1">Email</label>
                                <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500" placeholder="admin@canvasolutions.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] text-gray-500 uppercase font-black ml-1">Password</label>
                                <div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500" placeholder="••••••••" />
                                </div>
                            </div>
                            <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2">
                                {loading ? <Loader2 className="animate-spin" size={20} /> : "Send Verification Code"}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleFinalSubmit} className="space-y-8">
                            <div className="relative group max-w-[200px] mx-auto">
                                <input type="text" required maxLength="6" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full bg-white/5 border border-blue-500/30 rounded-2xl py-5 text-center text-3xl tracking-[0.5em] text-white outline-none focus:border-blue-500 font-mono" placeholder="••••••" />
                            </div>
                            <button disabled={loading} className="w-full bg-green-600 hover:bg-green-500 py-5 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2">
                                {loading ? <Loader2 className="animate-spin" size={20} /> : "Verify & Activate"}
                            </button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
};

export default AddAdmin;