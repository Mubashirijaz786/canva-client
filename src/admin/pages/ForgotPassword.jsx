import React, { useState } from 'react';
import { Mail, Loader2, CheckCircle } from 'lucide-react';
import { axiosPublic } from '../../api/axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosPublic.post('/auth/forgot-password', { email });
            setSent(true);
        } catch (err) {
            alert("Error sending reset email");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 font-['Manrope']">
            <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl">
                {!sent ? (
                    <>
                        <h2 className="text-2xl font-bold text-white text-center mb-4">Reset Password</h2>
                        <p className="text-gray-400 text-center mb-8 text-sm">Enter your email and we'll send you a recovery link.</p>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input type="email" required placeholder="Enter Email" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 text-white outline-none focus:border-blue-500"
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <button className="w-full bg-blue-600 py-4 rounded-xl font-bold text-white transition-all">
                                {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Send Reset Link'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-10">
                        <CheckCircle className="text-green-500 mx-auto mb-4" size={50} />
                        <h2 className="text-xl font-bold text-white mb-2">Email Sent!</h2>
                        <p className="text-gray-400">Please check your inbox for instructions.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;