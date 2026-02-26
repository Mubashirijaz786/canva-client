import React, { useState, useEffect, useCallback } from 'react';
import { MessageSquare, FileText, UserPlus, ArrowUpRight, Loader2, Briefcase, CheckCircle2, BellRing, Paperclip } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { axiosPrivate } from '../../api/axios';

const Dashboard = () => {
    const { adminAuth } = useAdminAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = useCallback(async () => {
        try {
            const res = await axiosPrivate.get('/stats/dashboard'); 
            setData(res.data);
        } catch (err) {
            console.error("Dashboard fetch error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboardData();
        const onFocus = () => fetchDashboardData();
        window.addEventListener('focus', onFocus);
        return () => window.removeEventListener('focus', onFocus);
    }, [fetchDashboardData, location.key]);

    if (loading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-500" size={40} />
            </div>
        );
    }

    const pendingInquiries = data?.recentInquiries?.filter(msg => msg.status === 'unread') || [];

    const stats = [
        { 
            label: "New Inquiries", 
            value: adminAuth?.role === 'superadmin' ? (data?.stats?.inquiries || "0") : "N/A", 
            change: "Secure", 
            icon: <MessageSquare size={20} />, 
            path: "/admin/messages",
            hidden: adminAuth?.role !== 'superadmin' 
        },
        { label: "Team Members", value: data?.stats?.team || "0", change: "Active", icon: <UserPlus size={20} />, path: "/admin/team" },
        { label: "Blog Posts", value: data?.stats?.blogs || "0", change: "Live", icon: <FileText size={20} />, path: "/admin/blogs" },
        { label: "Projects", value: data?.stats?.projects || "0", change: "Shipped", icon: <Briefcase size={20} />, path: "/admin/portfolio" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10 font-['Manrope']">
            
            {adminAuth?.role === 'superadmin' && pendingInquiries.length > 0 && (
                <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 p-5 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_0_30px_rgba(37,99,235,0.2)] border border-white/10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="bg-white/20 p-2 rounded-xl animate-bounce text-white">
                            <BellRing size={24} />
                        </div>
                        <div>
                            <h4 className="text-white font-black text-sm uppercase tracking-widest italic mb-1">Superadmin Alert!</h4>
                            <p className="text-blue-100 text-xs font-medium">{pendingInquiries.length} new inquiries are pending review.</p>
                        </div>
                    </div>
                    <Link to="/admin/messages" className="bg-white text-blue-600 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-lg active:scale-95 relative z-10">
                        View Inbox
                    </Link>
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black italic tracking-tight text-white uppercase mb-1">Dashboard</h1>
                    <p className="text-gray-500 text-sm font-medium italic">
                        Welcome back, <span className="text-blue-400 capitalize">{adminAuth?.name.split(' ')[0]}</span> ({adminAuth?.role})
                    </p>
                </div>

                {adminAuth?.role === 'superadmin' && (
                    <Link to="/admin/manage-admins" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-600/30 transition-all active:scale-95 text-[10px] uppercase tracking-widest">
                        <UserPlus size={16} />
                        <span>Manage Admins</span>
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.filter(s => !s.hidden).map((stat, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => navigate(stat.path)}
                        className="p-6 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-blue-500/30 transition-all cursor-pointer group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-2xl bg-white/5 text-white group-hover:bg-blue-600 transition-all duration-500">
                                {stat.icon}
                            </div>
                            <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${stat.label === "New Inquiries" && pendingInquiries.length > 0 ? "bg-red-500/20 text-red-500 animate-pulse" : "bg-blue-400/10 text-blue-400"}`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-3xl font-black text-white mb-1 tracking-tighter italic">{stat.value}</h3>
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">{stat.label}</p>
                    </div>
                ))}
            </div>

            {adminAuth?.role === 'superadmin' ? (
                <div className="w-full p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-sm shadow-xl relative overflow-hidden">
                    <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                        <div className="flex items-center gap-3">
                            {pendingInquiries.length > 0 && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping"></div>}
                            <h3 className="text-xl font-bold text-white italic tracking-tight uppercase">
                                 Pending Reviews <span className="text-blue-500 ml-2">({pendingInquiries.length})</span>
                            </h3>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3">
                        {pendingInquiries.length > 0 ? (
                            pendingInquiries.map((msg, idx) => (
                                <div 
                                    key={idx} 
                                    onClick={() => navigate('/admin/messages')}
                                    className="flex items-center justify-between p-5 rounded-3xl transition-all cursor-pointer border border-blue-500/30 bg-blue-600/[0.05] hover:bg-blue-600/[0.1] group relative overflow-hidden"
                                >
                                    <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white shadow-lg bg-blue-600 uppercase">
                                            {msg.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-bold text-sm text-white">{msg.name}</h4>
                                                <span className="text-[7px] font-black bg-blue-500 text-white px-1.5 py-0.5 rounded-sm uppercase tracking-tighter">ACTION</span>
                                                
                                                {/* ✅ ATTACHMENT INDICATOR */}
                                                {msg.attachmentUrl && (
                                                    <div className="flex items-center gap-1 bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full border border-green-500/30">
                                                        <Paperclip size={10} />
                                                        <span className="text-[8px] font-black uppercase tracking-tighter italic">Attachment</span>
                                                    </div>
                                                )}
                                            </div>
                                            {/* ✅ SHOW SERVICE TYPE */}
                                            <p className="text-gray-500 text-[10px] font-bold italic uppercase tracking-widest">
                                                {msg.service || "General Inquiry"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest block mb-1">New</span>
                                        <span className="text-white text-[10px] font-bold opacity-60">
                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-20 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
                                <CheckCircle2 size={32} className="text-green-500 opacity-80 mb-4" />
                                <h4 className="text-white font-bold text-lg mb-1 italic uppercase tracking-tighter">No Pending Leads</h4>
                                <p className="text-gray-600 text-sm max-w-[250px] font-medium italic">All client inquiries have been handled.</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="w-full p-12 rounded-[2.5rem] bg-white/[0.02] border border-dashed border-white/10 text-center">
                     <p className="text-gray-600 italic font-medium">Inquiries and User Management are restricted to Superadmins only.</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;