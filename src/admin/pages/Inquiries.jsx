import React, { useState, useEffect } from 'react';
import { axiosPrivate } from '../../api/axios';
import { Loader2, Mail, Phone, Calendar, ChevronRight, X, Trash2, Inbox, CheckCircle2, CheckCircle, RotateCcw } from 'lucide-react';

const Inquiries = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMsg, setSelectedMsg] = useState(null);

    // 1. FETCH ALL MESSAGES
    const fetchMessages = async () => {
        try {
            const res = await axiosPrivate.get('/inquiries');
            setMessages(res.data.data || res.data);
        } catch (err) {
            console.error("Error fetching messages:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    // ✅ 2. DYNAMIC STATUS UPDATE (Read / Resolved)
    const updateInquiryStatus = async (id, newStatus) => {
        try {
            await axiosPrivate.patch(`/inquiries/${id}/read`, { status: newStatus });
            
            // UI Sync
            setMessages(prev => prev.map(m => m._id === id ? { ...m, status: newStatus } : m));
            if (selectedMsg?._id === id) setSelectedMsg(prev => ({ ...prev, status: newStatus }));
        } catch (err) {
            console.error("Failed to update status:", err);
        }
    };

    const handleOpenMessage = async (msg) => {
        setSelectedMsg(msg);
        if (msg.status === 'unread') {
            updateInquiryStatus(msg._id, 'read');
        }
    };

    // 3. DELETE LOGIC
    const handleDelete = async (id, e) => {
        e.stopPropagation();
       

        try {
            await axiosPrivate.delete(`/inquiries/${id}`);
            setMessages(messages.filter(msg => msg._id !== id));
            if (selectedMsg?._id === id) setSelectedMsg(null);
        } catch (err) {
            alert("Failed to delete message");
        }
    };

    if (loading) return (
        <div className="h-screen flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-blue-500" size={48} />
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Loading Inbox...</p>
        </div>
    );

    return (
        <div className="space-y-8 pb-20 font-['Manrope'] selection:bg-blue-500/30">
            {/* Page Title */}
            <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-600/10 rounded-2xl text-blue-500">
                    <Inbox size={32} />
                </div>
                <div>
                    <h1 className="text-3xl font-black italic tracking-tighter uppercase text-white leading-none">Inquiry Hub</h1>
                    <p className="text-gray-500 text-xs mt-1 font-medium italic">Manage your incoming project leads and client messages.</p>
                </div>
            </div>

            {/* List Section */}
            <div className="grid grid-cols-1 gap-4">
                {messages.length > 0 ? messages.map((msg) => (
                    <div 
                        key={msg._id}
                        onClick={() => handleOpenMessage(msg)}
                        className={`p-6 rounded-[2rem] border transition-all duration-500 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group relative overflow-hidden ${
                            msg.status === 'unread' 
                            ? "bg-blue-600/[0.07] border-blue-500/30 shadow-[0_0_25px_rgba(37,99,235,0.1)]" 
                            : msg.status === 'resolved' 
                            ? "bg-green-500/[0.03] border-green-500/20 opacity-80"
                            : "bg-white/[0.02] border-white/5 opacity-60 hover:opacity-100"
                        }`}
                    >
                        {/* Indicative Bar */}
                        {msg.status === 'unread' && <div className="absolute left-0 top-0 h-full w-1.5 bg-blue-600"></div>}
                        {msg.status === 'resolved' && <div className="absolute left-0 top-0 h-full w-1.5 bg-green-500"></div>}

                        <div className="flex items-center gap-5">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl transition-all duration-500 ${
                                msg.status === 'unread' ? "bg-blue-600 text-white" : 
                                msg.status === 'resolved' ? "bg-green-600 text-white" : "bg-white/10 text-gray-500"
                            }`}>
                                {msg.status === 'resolved' ? <CheckCircle size={24}/> : msg.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className={`font-black text-lg tracking-tight ${msg.status === 'unread' ? "text-blue-400" : msg.status === 'resolved' ? "text-green-400" : "text-white"}`}>
                                        {msg.name}
                                    </h3>
                                    {msg.status === 'unread' && (
                                        <span className="bg-blue-500 text-white text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest animate-pulse">New Lead</span>
                                    )}
                                    {msg.status === 'resolved' && (
                                        <span className="bg-green-500/20 text-green-500 text-[8px] px-2 py-0.5 rounded-full font-black uppercase">Done</span>
                                    )}
                                </div>
                                <p className="text-gray-500 text-xs font-medium">{msg.email}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <div className="hidden md:block text-right">
                                <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 flex items-center justify-end gap-1.5 ${msg.status === 'unread' ? "text-blue-400" : msg.status === 'resolved' ? "text-green-400" : "text-gray-600"}`}>
                                    {msg.status === 'unread' ? "Pending Review" : msg.status === 'resolved' ? "Resolved" : "Viewed"}
                                </div>
                                <p className="text-gray-500 text-[10px] font-bold">{new Date(msg.createdAt).toDateString()}</p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                {/* ✅ Quick Resolve Toggle */}
                                <button 
                                    onClick={(e) => { e.stopPropagation(); updateInquiryStatus(msg._id, msg.status === 'resolved' ? 'read' : 'resolved'); }}
                                    className={`p-3 rounded-xl transition-all ${msg.status === 'resolved' ? "bg-yellow-500/10 text-yellow-500" : "bg-green-500/10 text-green-500"}`}
                                >
                                    {msg.status === 'resolved' ? <RotateCcw size={18} /> : <CheckCircle2 size={18} />}
                                </button>
                                
                                <button onClick={(e) => handleDelete(msg._id, e)} className="p-3.5 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 transition-all shadow-lg active:scale-90">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                            
                            <ChevronRight className={`transition-transform group-hover:translate-x-1.5 ${msg.status === 'unread' ? "text-blue-400" : "text-gray-700"}`} />
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-24 bg-white/[0.02] rounded-[3.5rem] border border-dashed border-white/10">
                        <Inbox className="mx-auto text-gray-800 mb-4" size={64} />
                        <p className="text-gray-600 italic font-medium">Bhai, koi inquiry nahi mili.</p>
                    </div>
                )}
            </div>

            {/* --- Modal Detail Section (ALL FIELDS RESTORED) --- */}
            {selectedMsg && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 backdrop-blur-2xl bg-black/80">
                    <div className="bg-[#0f172a] border border-white/10 w-full max-w-2xl rounded-[3rem] p-10 relative animate-in zoom-in duration-300 shadow-2xl overflow-hidden">
                        <div className="absolute -top-20 -right-20 p-40 bg-blue-600/10 blur-[100px] -z-10 rounded-full"></div>
                        
                        <div className="absolute top-8 right-8 flex items-center gap-3">
                            {/* ✅ Modal Status Toggle */}
                            <button 
                                onClick={() => updateInquiryStatus(selectedMsg._id, selectedMsg.status === 'resolved' ? 'read' : 'resolved')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${selectedMsg.status === 'resolved' ? "bg-yellow-500/10 text-yellow-500" : "bg-green-500 text-white shadow-lg shadow-green-900/20"}`}
                            >
                                {selectedMsg.status === 'resolved' ? <><RotateCcw size={14}/> Re-open Lead</> : <><CheckCircle size={14}/> Mark Resolved</>}
                            </button>
                            <button onClick={() => setSelectedMsg(null)} className="p-2 text-gray-500 hover:text-white transition-colors bg-white/5 rounded-xl hover:bg-white/10">
                                <X size={28} />
                            </button>
                        </div>

                        <div className="flex items-center gap-6 mb-10 border-b border-white/5 pb-10">
                            <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-4xl font-black text-white shadow-2xl transition-colors duration-500 ${selectedMsg.status === 'resolved' ? 'bg-green-600 shadow-green-900/20' : 'bg-blue-600 shadow-blue-900/20'}`}>
                                {selectedMsg.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-4xl font-black text-white tracking-tighter italic uppercase">{selectedMsg.name}</h2>
                                <p className="text-blue-400 font-black text-xs uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    {selectedMsg.service || "General Inquiry"}
                                </p>
                            </div>
                        </div>

                        {/* ✅ RESTORED ALL FIELDS (Email, Phone, Date, Budget) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                                <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest mb-1 flex items-center gap-2"><Mail size={12} className="text-blue-500"/> Client Email</p>
                                <p className="text-white font-bold text-sm">{selectedMsg.email}</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                                <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest mb-1 flex items-center gap-2"><Phone size={12} className="text-green-500"/> Phone Number</p>
                                <p className="text-white font-bold text-sm">{selectedMsg.phone || "No phone provided"}</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                                <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest mb-1 flex items-center gap-2"><Calendar size={12} className="text-purple-500"/> Date Received</p>
                                <p className="text-white font-bold text-sm">{new Date(selectedMsg.createdAt).toLocaleString()}</p>
                            </div>
                            {selectedMsg.budget && (
                                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                                    <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest mb-1 flex items-center gap-2">💰 Project Budget</p>
                                    <p className="text-green-400 font-black text-lg italic">${selectedMsg.budget}</p>
                                </div>
                            )}
                        </div>

                        {/* Message Content */}
                        <div className="bg-white/[0.04] p-8 rounded-[2.5rem] border border-white/5 relative">
                            <div className="absolute -top-3 left-8 bg-[#020617] px-4 py-0.5 rounded-full border border-white/10 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Message Content</div>
                            <p className="text-gray-200 leading-relaxed text-xl italic font-light">"{selectedMsg.message}"</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inquiries;