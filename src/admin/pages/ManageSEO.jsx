import React, { useState, useEffect } from 'react';
import { axiosPrivate, axiosPublic } from '../../api/axios';
import { Save, Loader2, Globe, Share2, Upload, Image as ImageIcon } from 'lucide-react';

const ManageSEO = () => {
    const pages = [
        { id: 'home', label: 'Home Page' },
        { id: 'about', label: 'About Page' },
        { id: 'services', label: 'Services Page' },
        { id: 'portfolio', label: 'Portfolio Page' },
        { id: 'contact', label: 'Contact Page' },
        { id: 'blogs', label: 'Blogs Main Page' }
    ];

    const [selectedPage, setSelectedPage] = useState('home');
    const [formData, setFormData] = useState({
        metaTitle: '', metaDescription: '', metaKeywords: '',
        ogTitle: '', ogDescription: '', ogImage: ''
    });
    const [newImage, setNewImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        const fetchSEO = async () => {
            setFetching(true);
            try {
                const res = await axiosPublic.get(`/seo/${selectedPage}`);
                setFormData(res.data || {});
                setNewImage(null);
            } catch (err) { console.error(err); }
            finally { setFetching(false); }
        };
        fetchSEO();
    }, [selectedPage]);

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        const submitData = new FormData();
        
        submitData.append('pageName', selectedPage);
        submitData.append('metaTitle', formData.metaTitle || '');
        submitData.append('metaDescription', formData.metaDescription || '');
        submitData.append('metaKeywords', formData.metaKeywords || '');
        submitData.append('ogTitle', formData.ogTitle || '');
        submitData.append('ogDescription', formData.ogDescription || '');

        if (newImage) {
            submitData.append('ogImage', newImage);
        }

        try {
            await axiosPrivate.put('/seo', submitData);
            alert("SEO Updated Successfully!");
        } catch (err) { 
            alert("Error updating SEO"); 
        } finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen text-white p-4 lg:p-8 font-['Manrope']">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-[#111827] p-6 rounded-3xl border border-white/5 shadow-2xl">
                <div>
                    <h1 className="text-2xl font-black italic uppercase text-blue-400">Global SEO Manager</h1>
                    <p className="text-gray-500 text-xs mt-1">Select a page to optimize its search engine appearance</p>
                </div>
                <select 
                    value={selectedPage} 
                    onChange={(e) => setSelectedPage(e.target.value)}
                    className="bg-white/5 border border-white/10 p-3 px-6 rounded-xl outline-none text-blue-400 font-bold cursor-pointer hover:bg-white/10 transition-all shadow-inner"
                >
                    {pages.map(p => <option key={p.id} value={p.id} className="bg-[#111827]">{p.label}</option>)}
                </select>
            </div>

            {fetching ? <div className="flex justify-center mt-20"><Loader2 className="animate-spin text-blue-500" size={40} /></div> : (
                <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* --- Left: Meta Data --- */}
                    <div className="space-y-6 bg-[#111827] p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-gray-200"><Globe size={20} className="text-blue-500"/> Search Engine (Meta)</h3>
                        
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black text-gray-500 ml-2">Focus Title</label>
                            <input type="text" placeholder="e.g. Best Web Agency in Pakistan" value={formData.metaTitle || ''} onChange={e => setFormData({...formData, metaTitle: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black text-gray-500 ml-2">Meta Description</label>
                            <textarea placeholder="Write a short summary..." value={formData.metaDescription || ''} onChange={e => setFormData({...formData, metaDescription: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none h-32 resize-none focus:border-blue-500 transition-all" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black text-gray-500 ml-2">Keywords</label>
                            <input type="text" placeholder="web, design, seo..." value={formData.metaKeywords || ''} onChange={e => setFormData({...formData, metaKeywords: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500" />
                        </div>
                    </div>

                    {/* --- Right: Social Media --- */}
                    <div className="space-y-6 bg-[#111827] p-8 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-gray-200"><Share2 size={20} className="text-pink-500"/> Social Media (OG)</h3>
                        
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black text-gray-500 ml-2">Social Title</label>
                            <input type="text" placeholder="Title for Facebook/WhatsApp" value={formData.ogTitle || ''} onChange={e => setFormData({...formData, ogTitle: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all" />
                        </div>

                        {/* ✅ REDESIGNED UPLOAD BOX */}
                        <div className="space-y-2 flex-grow">
                            <label className="text-[10px] uppercase font-black text-gray-500 ml-2">Social Preview Image</label>
                            
                            <div className="relative group">
                                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/10 rounded-[2rem] bg-white/5 hover:bg-white/[0.08] hover:border-blue-500/50 transition-all cursor-pointer overflow-hidden">
                                    
                                    {/* Preview logic */}
                                    {(newImage || formData.ogImage) ? (
                                        <div className="relative w-full h-full">
                                            <img 
                                                src={newImage ? URL.createObjectURL(newImage) : formData.ogImage} 
                                                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
                                                alt="Preview" 
                                            />
                                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                                                <Upload className="text-white mb-2" size={24} />
                                                <span className="text-xs font-bold uppercase tracking-widest">Change Image</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <div className="p-4 bg-blue-500/10 rounded-2xl mb-4 text-blue-500">
                                                <ImageIcon size={32} />
                                            </div>
                                            <p className="mb-2 text-sm text-gray-300 font-bold">Click to upload image</p>
                                            <p className="text-xs text-gray-500 uppercase tracking-tighter">Recommended: 1200 x 630 pixels</p>
                                        </div>
                                    )}
                                    
                                    <input type="file" className="hidden" onChange={e => setNewImage(e.target.files[0])} />
                                </label>
                            </div>
                        </div>

                        <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex justify-center items-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-500/20">
                            {loading ? <Loader2 className="animate-spin" /> : <><Save size={18}/> Update SEO Settings</>}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ManageSEO;