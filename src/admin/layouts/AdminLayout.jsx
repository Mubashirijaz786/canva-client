import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, MessageSquare, LogOut, Home, Users, User, 
  ShieldCheck, Globe, Menu, X, Briefcase, Layers, HelpCircle, Handshake, 
  Search, Settings2, ChevronDown 
} from 'lucide-react';

import { axiosPrivate } from '../../api/axios';
import { useAdminAuth } from '../context/AdminAuthContext'; 

const AdminLayout = () => {
    const { adminAuth, setAdminAuth } = useAdminAuth(); 
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // ✅ Home Group ko open/close karne ki state
    const [isHomeOpen, setIsHomeOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await axiosPrivate.post('/auth/logout'); 
            setAdminAuth(null); 
            navigate('/admin-login');
        } catch (err) { 
            console.error("Logout error:", err); 
        }
    };

    // ✅ Home Page ki specific settings ka group
    const homeSubItems = [
        { path: '/admin/manage-hero', icon: <Layers size={18} />, label: 'Hero Section' },
        { path: '/admin/trusted-by', icon: <Handshake size={18} />, label: 'Manage Partners' },
        { path: '/admin/manage-choose-us', icon: <ShieldCheck size={18} />, label: 'Why Choose Us' },
        { path: '/admin/manage-faqs', icon: <HelpCircle size={18} />, label: 'Manage FAQs' },
    ];

    // ✅ Baqi general items
    const navItems = [
        { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/admin/manage-seo', icon: <Search size={20} />, label: 'Global SEO' },
        { path: '/admin/services-manager', icon: <Layers size={20} />, label: 'Services CMS' },
        { path: '/admin/about-page', icon: <FileText size={20} />, label: 'About Page' },
        { path: '/admin/blogs', icon: <FileText size={20} />, label: 'Manage Blogs' },
        { path: '/admin/team', icon: <Users size={20} />, label: 'Manage Team' },
        { path: '/admin/portfolio', icon: <Briefcase size={20} />, label: 'Projects' },
        { path: '/admin/reviews', icon: <MessageSquare size={20} />, label: 'Reviews' },
        { path: '/admin/portfolio-settings', icon: <Settings2 size={20} />, label: 'Portfolio Page'},
        
    ];

    return (
        <div className="flex min-h-screen bg-[#020617] text-white font-['Manrope']">
            
            {/* Mobile Header (Wahi purana) */}
            <div className="lg:hidden fixed top-0 left-0 w-full bg-white/5 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center z-[100]">
                <h2 className="text-lg font-black italic text-blue-500 tracking-tighter">CANVA Solutions</h2>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-white/5 rounded-lg text-white">
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Side Navigation */}
            <aside className={`
                w-64 border-r border-white/10 bg-white/5 backdrop-blur-2xl fixed h-full p-6 flex flex-col z-[90]
                transition-transform duration-300 lg:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="mb-8 px-2 hidden lg:block">
                    <h2 className="text-xl font-black italic bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent tracking-tighter">CANVA Solutions</h2>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">Management Suite</p>
                </div>

                {/* User Profile Card */}
                <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 shrink-0">
                        <User size={20} />
                    </div>
                    <div className="overflow-hidden">
                        <h4 className="text-sm font-bold truncate">{adminAuth?.name || 'Admin User'}</h4>
                        <span className="text-[10px] uppercase font-black text-blue-400 tracking-tighter">{adminAuth?.role}</span>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-1.5 flex-grow overflow-y-auto custom-scrollbar pr-2">
                    
                    {/* --- Home Group (The New Addition) --- */}
                    <div className="mb-2">
                        <button 
                            onClick={() => setIsHomeOpen(!isHomeOpen)}
                            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                                isHomeOpen ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <Home size={20} />
                                <span className="font-bold text-sm tracking-tight">Home Settings</span>
                            </div>
                            <ChevronDown size={16} className={`transition-transform duration-300 ${isHomeOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Sub-menu items with animation */}
                        <div className={`overflow-hidden transition-all duration-300 space-y-1 mt-1 ${isHomeOpen ? 'max-h-64 opacity-100 ml-4 border-l border-white/10 pl-2' : 'max-h-0 opacity-0'}`}>
                            {homeSubItems.map((sub) => (
                                <Link 
                                    key={sub.path}
                                    to={sub.path}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-3 p-2.5 rounded-lg text-xs font-semibold transition-all ${
                                        location.pathname === sub.path ? 'text-blue-400 bg-blue-400/5' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                    }`}
                                >
                                    {sub.icon}
                                    {sub.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* --- Regular Nav Items --- */}
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link 
                                key={item.path}
                                to={item.path} 
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                                    isActive 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-bold' 
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white font-medium'
                                }`}
                            >
                                {item.icon}
                                <span className="text-sm">{item.label}</span>
                            </Link>
                        );
                    })}

                    
                    {adminAuth?.role === 'superadmin' && (
                        <Link to="/admin/settings" className={`flex items-center gap-3 p-3 rounded-xl transition-all ${location.pathname === '/admin/settings' ? 'bg-blue-600' : 'text-gray-400 hover:bg-white/5'}`}>
                            <Globe size={20} /> <span className="text-sm">Site Settings</span>
                        </Link>
                    )}
                </nav>

                {/* Logout Button */}
                <button 
                    onClick={handleLogout}
                    className="mt-4 flex items-center gap-3 p-4 rounded-xl text-red-500 hover:bg-red-500/10 transition-all font-bold text-sm"
                >
                    <LogOut size={20} /> Logout
                </button>
            </aside>

            {/* Main Content Area */}
            <main className={`flex-grow p-6 lg:p-10 transition-all duration-300 ${isSidebarOpen ? 'blur-sm lg:blur-0 pointer-events-none lg:pointer-events-auto' : ''} lg:ml-64 mt-16 lg:mt-0`}>
                <div className="max-w-7xl mx-auto">
                    <Outlet /> 
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;