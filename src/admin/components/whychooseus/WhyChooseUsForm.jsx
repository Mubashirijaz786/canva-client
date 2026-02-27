import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import IconPicker from '../../layouts/IconPicker';

const WhyChooseUsForm = ({ isOpen, onClose, onSubmit, loading, initialData }) => {
    const [formData, setFormData] = useState({ title: '', description: '', iconName: 'Sparkles' });

    useEffect(() => {
        if (initialData) setFormData({ title: initialData.title, description: initialData.description, iconName: initialData.iconName });
        else setFormData({ title: '', description: '', iconName: 'Sparkles' });
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-[#020617]/60 backdrop-blur-md" onClick={onClose}></div>
            <div className="relative w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-[3rem] p-8 shadow-2xl flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-black italic text-white uppercase">{initialData ? "Edit Card" : "New Card"}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl text-gray-400"><X size={24} /></button>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="space-y-2">
                        <IconPicker 
                            selectedIcon={formData.iconName} 
                            onChange={(icon) => setFormData({ ...formData, iconName: icon })} 
                            label="Card Icon"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 uppercase font-black ml-2">Title</label>
                        <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-blue-500 transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 uppercase font-black ml-2">Description</label>
                        <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none h-32 resize-none focus:border-blue-500 transition-all" />
                    </div>
                    <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-[0.98] uppercase tracking-widest">
                        {loading ? <Loader2 className="animate-spin mx-auto" size={24} /> : "Save Card"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default WhyChooseUsForm;