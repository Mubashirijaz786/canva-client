import React, { useState, useEffect } from 'react';
import { axiosPrivate, axiosPublic } from '../../api/axios';
import { Save, Loader2, Plus, Trash2, Trophy, LayoutDashboard } from 'lucide-react';

const ManagePortfolioConfig = () => {
    const [config, setConfig] = useState({
        badgeText: '',
        heroTitle: '',
        herosubtitle: '',
        heroDescription: '',
        stats: []
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await axiosPublic.get('/portfolio-config');
                if (res.data) {
                    setConfig({
                        badgeText: res.data.badgeText || '',
                        heroTitle: res.data.heroTitle || '',
                        herosubtitle: res.data.herosubtitle || '',
                        heroDescription: res.data.heroDescription || '',
                        stats: res.data.stats || []
                    });
                }
            } catch (err) { 
                console.error("Fetch Error:", err); 
            } finally { 
                setFetching(false); 
            }
        };
        fetchConfig();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosPrivate.put('/portfolio-config', config);
            alert("✅ Portfolio Page Settings Updated!");
        } catch (err) { 
            console.error("Update Error:", err);
            alert("❌ Error updating settings"); 
        } finally { 
            setLoading(false); 
        }
    };

    // ✅ FIXED: Limit condition added here
    const addStat = () => {
        if (config.stats.length >= 4) {
            alert("⚠️ You can only add up to 4 stats.");
            return;
        }
        setConfig({ ...config, stats: [...config.stats, { number: '', label: '' }] });
    };

    const removeStat = (index) => setConfig({ ...config, stats: config.stats.filter((_, i) => i !== index) });

    if (fetching) return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-blue-500" size={40} />
            <p className="text-gray-500 animate-pulse font-bold tracking-widest uppercase text-xs">Fetching Config...</p>
        </div>
    );

    return (
        <div className="min-h-screen text-white p-4 lg:p-8 font-['Manrope']">
            <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-blue-600/20 rounded-2xl text-blue-500">
                    <LayoutDashboard size={32} />
                </div>
                <div>
                    <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">Portfolio Header Settings</h1>
                    <p className="text-gray-500 text-sm">Manage hero text and performance statistics for your portfolio page</p>
                </div>
            </div>

            <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                
                <div className="space-y-6 bg-[#0f172a] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 bg-blue-600/5 blur-3xl rounded-full -z-10"></div>
                    <h3 className="text-lg font-bold text-blue-400 mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span> Hero Section
                    </h3>
                    
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black text-gray-500 ml-2 tracking-widest">Badge Text (Top)</label>
                        <input type="text" placeholder="e.g. Selected Works 2026" value={config.badgeText} onChange={e => setConfig({...config, badgeText: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500/50 transition-all text-sm" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black text-gray-500 ml-2 tracking-widest">Main Hero Title</label>
                        <textarea placeholder="The big bold heading..." value={config.heroTitle} onChange={e => setConfig({...config, heroTitle: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none h-32 resize-none focus:border-blue-500/50 transition-all text-sm" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black text-gray-500 ml-2 tracking-widest">Hero Subtitle (Colored Text)</label>
                        <textarea placeholder="A catchy subtitle..." value={config.herosubtitle} onChange={e => setConfig({...config, herosubtitle: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none h-20 resize-none focus:border-blue-500/50 transition-all text-sm" />
                    </div>
                
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black text-gray-500 ml-2 tracking-widest">Short Description</label>
                        <textarea placeholder="Explain your legacy..." value={config.heroDescription} onChange={e => setConfig({...config, heroDescription: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none h-32 resize-none focus:border-blue-500/50 transition-all text-sm" />
                    </div>
                </div>

                <div className="space-y-6 bg-[#0f172a] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 bg-yellow-600/5 blur-3xl rounded-full -z-10"></div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-yellow-500 italic">
                            <Trophy size={20}/> Performance Ranking ({config.stats.length}/4)
                        </h3>
                        
                        {/* ✅ Button disabled logic added */}
                        <button 
                            type="button" 
                            onClick={addStat} 
                            disabled={config.stats.length >= 4}
                            className={`p-2 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all border 
                                ${config.stats.length >= 4 
                                    ? "bg-gray-500/10 text-gray-500 border-gray-500/20 cursor-not-allowed" 
                                    : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20"}`}
                        >
                            <Plus size={14}/> {config.stats.length >= 4 ? "Limit Reached" : "Add New Stat"}
                        </button>
                    </div>

                    <div className="space-y-4 flex-grow overflow-y-auto max-h-[430px] pr-2 custom-scrollbar">
                        {config.stats.length === 0 && <p className="text-gray-600 text-center italic py-10">No stats added yet...</p>}
                        
                        {config.stats.map((stat, index) => (
                            <div key={index} className="flex gap-4 items-center bg-white/[0.03] p-5 rounded-3xl border border-white/5 group hover:border-yellow-500/30 transition-all">
                                <div className="flex-1 space-y-3">
                                    <input type="text" placeholder="Value (e.g. 150+)" value={stat.number} onChange={e => {
                                        const newStats = [...config.stats]; newStats[index].number = e.target.value; setConfig({...config, stats: newStats});
                                    }} className="w-full bg-black/20 border border-white/10 p-3 rounded-xl text-sm outline-none focus:border-yellow-500/50 transition-all font-bold" />
                                    
                                    <input type="text" placeholder="Label (e.g. Projects Delivered)" value={stat.label} onChange={e => {
                                        const newStats = [...config.stats]; newStats[index].label = e.target.value; setConfig({...config, stats: newStats});
                                    }} className="w-full bg-black/20 border border-white/10 p-3 rounded-xl text-xs outline-none focus:border-yellow-500/50 transition-all text-gray-400" />
                                </div>
                                <button type="button" onClick={() => removeStat(index)} className="text-red-500/50 hover:text-red-500 transition-colors p-2 bg-red-500/5 rounded-lg">
                                    <Trash2 size={18}/>
                                </button>
                            </div>
                        ))}
                    </div>

                    <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] flex justify-center items-center gap-3 transition-all active:scale-95 shadow-xl shadow-blue-500/20 mt-6 border border-blue-400/20">
                        {loading ? <Loader2 className="animate-spin" /> : <><Save size={18}/> Save Header Configuration</>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ManagePortfolioConfig;