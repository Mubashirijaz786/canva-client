import React, { useState, useEffect } from 'react';
import { axiosPrivate, axiosPublic } from '../../api/axios';
import { Save, Loader2, Plus, Trash2, BarChart, Heart } from 'lucide-react';
import IconPicker from '../layouts/IconPicker';

const ManageAbout = () => {
    // ✅ State mein ab sirf pure content fields hain
    const [config, setConfig] = useState({
        badgeText: '', heroTitle: '', heroSubtitle: '', heroDescription: '',
        founderMainTitle: '', founderName: '', founderRole: '', founderVision: '',
        stats: [], founderSections: [], 
        valuesTitle: '', valuesSubtitle: '', valuesList: [],
    });
    const [heroImg, setHeroImg] = useState(null);
    const [founderImg, setFounderImg] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axiosPublic.get('/about-page').then(res => {
            if (res.data) {
                setConfig({
                    ...res.data, // Backend se jo data aayega wo set ho jayega
                    stats: res.data.stats || [],
                    founderSections: res.data.founderSections || [],
                    valuesList: res.data.valuesList || [],
                });
            }
        }).catch(err => console.log("Fetch error:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();

        // ✅ Sirf wahi data append hoga jo config state mein hai (No SEO fields)
        Object.keys(config).forEach(key => {
            if (Array.isArray(config[key])) {
                formData.append(key, JSON.stringify(config[key]));
            } else {
                formData.append(key, config[key] || ''); 
            }
        });

        if (heroImg) formData.append('heroImage', heroImg);
        if (founderImg) formData.append('founderImage', founderImg);

        try {
            await axiosPrivate.put('/about-page', formData);
            alert("✅ About Page Content Updated!");
        } catch (err) { 
            console.error(err);
            alert("❌ Update Failed"); 
        } finally { 
            setLoading(false); 
        }
    };

    const addStat = () => setConfig({...config, stats: [...config.stats, {number: '', label: '', iconName: 'Zap'}]});
    const addSection = () => setConfig({...config, founderSections: [...config.founderSections, {title: '', description: ''}]});
    const addValue = () => setConfig({...config, valuesList: [...config.valuesList, {title: '', description: '', iconName: 'Heart'}]});

    return (
        <div className="max-w-5xl pb-20 text-white animate-in fade-in duration-500 font-['Manrope']">
            <h1 className="text-3xl font-black italic mb-8 uppercase tracking-tighter text-blue-500">Manage About Page</h1>
            
            <form onSubmit={handleSubmit} className="space-y-10">
                
                {/* 1. HERO SECTION */}
                <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-6 shadow-xl">
                    <h3 className="text-blue-400 font-bold uppercase text-xs tracking-widest">Hero Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] text-gray-500 font-bold uppercase">Hero Image</label>
                            <input type="file" onChange={e => setHeroImg(e.target.files[0])} className="bg-white/5 p-3 rounded-xl text-xs border border-white/10" />
                        </div>
                        <input type="text" placeholder="Badge Text" className="bg-white/5 p-4 rounded-xl border border-white/10 outline-none" value={config.badgeText} onChange={e => setConfig({...config, badgeText: e.target.value})} />
                        <input type="text" placeholder="Hero Title" className="bg-white/5 p-4 rounded-xl border border-white/10 outline-none" value={config.heroTitle} onChange={e => setConfig({...config, heroTitle: e.target.value})} />
                        <input type="text" placeholder="Hero Subtitle" className="bg-white/5 p-4 rounded-xl border border-white/10 outline-none" value={config.heroSubtitle} onChange={e => setConfig({...config, heroSubtitle: e.target.value})} />
                        <textarea placeholder="Hero Description" className="md:col-span-2 bg-white/5 p-4 rounded-xl border border-white/10 outline-none h-32 resize-none" value={config.heroDescription} onChange={e => setConfig({...config, heroDescription: e.target.value})} />
                    </div>
                </div>

                {/* 2. STATS SECTION */}
                <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-6 shadow-xl">
                    <h3 className="text-green-400 font-bold uppercase text-xs tracking-widest flex items-center gap-2"><BarChart size={16}/> Business Stats</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {config.stats.map((stat, i) => (
                            <div key={i} className="flex gap-4 p-4 bg-black/20 rounded-2xl border border-white/5 items-center">
                                <div className="space-y-2 flex-grow">
                                    <input type="text" placeholder="Number (50+)" className="w-full bg-white/5 p-2 rounded-lg text-sm" value={stat.number} onChange={e => {
                                        const up = [...config.stats]; up[i].number = e.target.value; setConfig({...config, stats: up});
                                    }} />
                                    <input type="text" placeholder="Label" className="w-full bg-white/5 p-2 rounded-lg text-sm" value={stat.label} onChange={e => {
                                        const up = [...config.stats]; up[i].label = e.target.value; setConfig({...config, stats: up});
                                    }} />
                                </div>
                                <button type="button" onClick={() => setConfig({...config, stats: config.stats.filter((_, idx) => idx !== i)})} className="text-red-500 p-2"><Trash2 size={18}/></button>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addStat} className="flex items-center gap-2 text-green-500 font-bold text-xs hover:underline"><Plus size={16}/> Add New Stat</button>
                </div>

                {/* 3. FOUNDER DETAILS */}
                <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-8 shadow-xl">
                    <h3 className="text-purple-400 font-bold uppercase text-xs tracking-widest">Founder Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-white/5 pb-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] text-gray-500 font-bold uppercase">Founder Photo</label>
                            <input type="file" onChange={e => setFounderImg(e.target.files[0])} className="bg-white/5 p-3 rounded-xl text-xs border border-white/10" />
                        </div>
                        <input type="text" placeholder="Founder Name" className="bg-white/5 p-4 rounded-xl border border-white/10 outline-none" value={config.founderName} onChange={e => setConfig({...config, founderName: e.target.value})} />
                        <input type="text" placeholder="Role" className="bg-white/5 p-4 rounded-xl border border-white/10 outline-none" value={config.founderRole} onChange={e => setConfig({...config, founderRole: e.target.value})} />
                        <textarea placeholder="Founder Vision" className="bg-white/5 p-4 rounded-xl border border-white/10 outline-none h-24 resize-none" value={config.founderVision} onChange={e => setConfig({...config, founderVision: e.target.value})} />
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">About Story Blocks</label>
                        {config.founderSections.map((sec, i) => (
                            <div key={i} className="flex gap-4 p-6 bg-black/20 rounded-3xl border border-white/5">
                                <div className="flex-grow space-y-4">
                                    <input type="text" placeholder="Title" className="w-full bg-white/5 p-3 rounded-xl text-sm outline-none" value={sec.title} onChange={e => {
                                        const up = [...config.founderSections]; up[i].title = e.target.value; setConfig({...config, founderSections: up});
                                    }} />
                                    <textarea placeholder="Description" className="w-full bg-white/5 p-3 rounded-xl text-sm h-24 outline-none resize-none" value={sec.description} onChange={e => {
                                        const up = [...config.founderSections]; up[i].description = e.target.value; setConfig({...config, founderSections: up});
                                    }} />
                                </div>
                                <button type="button" onClick={() => setConfig({...config, founderSections: config.founderSections.filter((_, idx) => idx !== i)})} className="text-red-500 self-start p-2"><Trash2 size={20}/></button>
                            </div>
                        ))}
                        <button type="button" onClick={addSection} className="flex items-center gap-2 text-blue-500 font-bold text-xs hover:underline"><Plus size={16}/> Add Content Block</button>
                    </div>
                </div>

                {/* 4. CORE VALUES SECTION */}
                <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-6 shadow-xl">
                    <h3 className="text-rose-400 font-bold uppercase text-xs tracking-widest flex items-center gap-2"><Heart size={16}/> Core Values</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <input type="text" placeholder="Section Title" className="bg-white/5 p-4 rounded-xl border border-white/10 outline-none" value={config.valuesTitle} onChange={e => setConfig({...config, valuesTitle: e.target.value})} />
                        <input type="text" placeholder="Section Subtitle" className="bg-white/5 p-4 rounded-xl border border-white/10 outline-none" value={config.valuesSubtitle} onChange={e => setConfig({...config, valuesSubtitle: e.target.value})} />
                    </div>
                    
                    <div className="space-y-4">
                        {config.valuesList.map((val, i) => (
                            <div key={i} className="flex gap-4 p-6 bg-black/20 rounded-3xl border border-white/5">
                                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="text" placeholder="Value Title" className="w-full bg-white/5 p-3 rounded-xl text-sm outline-none" value={val.title} onChange={e => {
                                        const up = [...config.valuesList]; up[i].title = e.target.value; setConfig({...config, valuesList: up});
                                    }} />
                                   <IconPicker 
                                        selectedIcon={val.iconName} 
                                        onChange={(newIcon) => {
                                            const up = [...config.valuesList]; 
                                            up[i].iconName = newIcon; 
                                            setConfig({...config, valuesList: up});
                                        }} 
                                    />
                                    <textarea placeholder="Description" className="md:col-span-2 w-full bg-white/5 p-3 rounded-xl text-sm h-20 outline-none resize-none" value={val.description} onChange={e => {
                                        const up = [...config.valuesList]; up[i].description = e.target.value; setConfig({...config, valuesList: up});
                                    }} />
                                </div>
                                <button type="button" onClick={() => setConfig({...config, valuesList: config.valuesList.filter((_, idx) => idx !== i)})} className="text-red-500 self-start p-2"><Trash2 size={20}/></button>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addValue} className="flex items-center gap-2 text-rose-500 font-bold text-xs hover:underline"><Plus size={16}/> Add New Value</button>
                </div>

                <button disabled={loading} className="bg-blue-600 hover:bg-blue-500 px-12 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs flex items-center gap-3 shadow-2xl active:scale-95 transition-all w-full md:w-auto">
                    {loading ? <Loader2 className="animate-spin" /> : <><Save size={20}/> Publish About Page Content</>}
                </button>
            </form>
        </div>
    );
};

export default ManageAbout;