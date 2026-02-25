import React, { useState } from 'react';
import { axiosPrivate } from '../../api/axios';
import { Save, X, Loader2, Settings, RotateCcw } from 'lucide-react';
import ServiceList from '../components/services/ServiceList';
import ServiceForm from '../components/services/ServiceForm';
import { PAGE_DEFAULTS } from '../../data/pageDefaults'; // ✅ Master Defaults Import

const ManageServicePages = () => {
    const services = [
        { id: 'content-writing', name: 'Content Writing' },
        { id: 'seo', name: 'SEO Services' },
        { id: 'custom-software', name: 'Custom Software' },
        { id: 'e-commerce', name: 'E-Commerce' },
        { id: 'graphic-design', name: 'Graphic Design' },
        { id: 'mobile-app', name: 'Mobile App' },
        { id: 'web-development', name: 'Web Development' },
        { id: 'social-media', name: 'Social Media' }
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPage, setSelectedPage] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    const [formData, setFormData] = useState({
        heroTitle: '', heroSubtitle: '', heroDescription: '', heroImage: null,
        badgeText: '', 
        metaTitle: '', metaDescription: '', metaKeywords: '',
        contentItems: [], faqs: [], checklist: [], reasons: []
    });

    // 1. FETCH DATA HANDLER
    const handleEditClick = async (pageId) => {
        setSelectedPage(pageId);
        setIsModalOpen(true);
        setFetching(true);
        try {
            const res = await axiosPrivate.get(`/service-pages/${pageId}`);
            if (res.data && Object.keys(res.data).length > 0) {
                setFormData({
                    ...res.data,
                    heroImage: res.data.heroImage || null
                });
            } else {
                // If no DB data, load from our Master Constants
                setFormData({ ...PAGE_DEFAULTS[pageId], heroImage: null });
            }
        } catch (err) {
            console.log("Starting with default constants.");
            setFormData({ ...PAGE_DEFAULTS[pageId], heroImage: null });
        } finally {
            setFetching(false);
        }
    };

    // 2. RESET TO STATIC DATA (Universal Logic)
    const resetToDefault = () => {
        const defaults = PAGE_DEFAULTS[selectedPage];
        if (defaults && window.confirm(`⚠️ Are you sure? This will overwrite everything with the original static data for ${selectedPage}!`)) {
            setFormData({
                ...defaults,
                heroImage: null // Reset to local fallback image
            });
        }
    };

    // 3. SUBMIT HANDLER
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();
            // Append all fields to FormData
            Object.keys(formData).forEach(key => {
                if (key === 'heroImage') {
                    if (formData[key] instanceof File) data.append(key, formData[key]);
                } else if (Array.isArray(formData[key])) {
                    data.append(key, JSON.stringify(formData[key]));
                } else {
                    data.append(key, formData[key]);
                }
            });

            await axiosPrivate.put(`/service-pages/${selectedPage}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert("✅ Service Page Updated Successfully!");
            setIsModalOpen(false);
        } catch (err) {
            alert("❌ Update Failed: " + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 font-['Manrope'] text-white space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-center bg-[#0f172a] p-8 rounded-[2rem] border border-white/10 shadow-2xl">
                <div>
                    <h1 className="text-3xl font-black italic tracking-tighter text-white">Services CMS</h1>
                    <p className="text-blue-500 text-xs font-bold uppercase tracking-[0.3em] mt-1">Universal Content Manager</p>
                </div>
                <Settings size={40} className="text-white/10 animate-pulse" />
            </div>

            <ServiceList services={services} onEdit={handleEditClick} />

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
                    <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-md" onClick={() => !loading && setIsModalOpen(false)}></div>
                    
                    <div className="relative bg-[#0f172a] w-full max-w-7xl max-h-[95vh] rounded-[3.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col">
                        
                        {/* Modal Header */}
                        <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/5">
                            <div>
                                <h2 className="text-2xl font-black italic uppercase text-white">
                                    Editing: <span className="text-blue-500">{selectedPage}</span>
                                </h2>
                                <p className="text-[10px] font-bold text-gray-500 tracking-[0.2em] mt-1 uppercase">Full Page Control enabled</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white/10 rounded-2xl transition-all text-white"><X size={24} /></button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar bg-[#0f172a]">
                            {fetching ? (
                                <div className="flex flex-col items-center justify-center py-32 space-y-4">
                                    <Loader2 className="animate-spin text-blue-500" size={48} />
                                    <p className="italic text-gray-400 font-bold tracking-widest">SYNCING DATA...</p>
                                </div>
                            ) : (
                                <ServiceForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} loading={loading} />
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-8 border-t border-white/10 bg-white/5 flex justify-between items-center">
                            {/* Reset Button (Left Aligned) */}
                            <button 
                                type="button"
                                onClick={resetToDefault}
                                className="flex items-center gap-2 px-6 py-3 font-bold text-red-400 border border-red-500/20 rounded-2xl hover:bg-red-500/10 transition-all active:scale-95"
                            >
                                <RotateCcw size={18} /> Reset to Default
                            </button>

                            <div className="flex items-center gap-6">
                                <button onClick={() => setIsModalOpen(false)} className="px-8 py-4 rounded-2xl font-bold text-gray-400 hover:text-white transition-all">Discard</button>
                                <button form="serviceForm" type="submit" disabled={loading || fetching} className="bg-blue-600 hover:bg-blue-500 px-12 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 shadow-xl transition-all active:scale-95 disabled:opacity-50 text-white">
                                    {loading ? <Loader2 className="animate-spin" /> : <><Save size={20}/> Publish Now</>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageServicePages;