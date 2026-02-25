import React from 'react';
import IconPicker from '../../layouts/IconPicker'; // ✅ Only added import
import { 
    Layout, Info, Plus, Trash2, Globe, HelpCircle, 
    Type, AlignLeft, Sparkles, Image as ImageIcon, Upload,
    CheckSquare, AlertCircle, MousePointer2, Target, Link as LinkIcon,
    MapPin, BarChart2, TrendingUp, FileText, Zap
} from 'lucide-react';

const ServiceForm = ({ formData, setFormData, onSubmit, loading }) => {
    
    // --- Array Handlers ---
    const addContentItem = () => setFormData({ 
        ...formData, 
        contentItems: [...formData.contentItems, { title: '', description: '', iconName: 'Zap' }] 
    });
    const removeContentItem = (index) => setFormData({ 
        ...formData, 
        contentItems: formData.contentItems.filter((_, i) => i !== index) 
    });

    const addChecklistItem = () => setFormData({
        ...formData,
        checklist: [...(formData.checklist || []), ""]
    });
    const removeChecklistItem = (index) => setFormData({
        ...formData,
        checklist: formData.checklist.filter((_, i) => i !== index)
    });

    const addReason = () => setFormData({
        ...formData,
        reasons: [...(formData.reasons || []), { title: '', description: '' }]
    });
    const removeReason = (index) => setFormData({
        ...formData,
        reasons: formData.reasons.filter((_, i) => i !== index)
    });

    const addFaq = () => setFormData({ 
        ...formData, 
        faqs: [...formData.faqs, { question: '', answer: '' }] 
    });
    const removeFaq = (index) => setFormData({ 
        ...formData, 
        faqs: formData.faqs.filter((_, i) => i !== index) 
    });

    // --- Styling Classes ---
    const inputClass = "w-full bg-[#1e293b] border border-white/10 rounded-2xl p-4 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all shadow-inner";
    const selectClass = "w-full bg-[#1e293b] border border-white/10 rounded-2xl p-3 text-sm text-white outline-none focus:border-cyan-500 cursor-pointer shadow-md";
    const optionStyle = { backgroundColor: '#1e293b', color: 'white' };

    return (
        <form id="serviceForm" onSubmit={onSubmit} className="space-y-8 pb-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* --- LEFT COLUMN (Main Content) --- */}
                <div className="lg:col-span-8 space-y-8">
                    
                    {/* 1. HERO SETTINGS */}
                    <div className="bg-[#0f172a] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
                        <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Layout size={24} /></div>
                            <div>
                                <h3 className="text-xl font-bold italic text-white">Hero Section</h3>
                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Page Banner & Messaging</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-2 italic">Badge Text</label>
                                    <input className={inputClass} value={formData.badgeText || ''} onChange={e => setFormData({...formData, badgeText: e.target.value})} placeholder="e.g. Search Engine Optimization" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-2 italic">Main Heading</label>
                                    <input className={inputClass} value={formData.heroTitle || ''} onChange={e => setFormData({...formData, heroTitle: e.target.value})} placeholder="Words That Rank." />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-2 italic">Accent Subtitle</label>
                                    <input className={inputClass} value={formData.heroSubtitle || ''} onChange={e => setFormData({...formData, heroSubtitle: e.target.value})} placeholder="Stories That Sell." />
                                </div>
                            </div>

                            {/* Hero Image Upload */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2 italic">Hero Banner Image</label>
                                <div className="flex flex-col md:flex-row items-center gap-6 bg-[#1e293b] p-6 rounded-[2rem] border border-white/10 group">
                                    <div className="relative w-full md:w-48 h-32 rounded-2xl overflow-hidden bg-[#0f172a] border border-white/5 flex items-center justify-center">
                                        {formData.heroImage ? (
                                            <img src={typeof formData.heroImage === 'string' ? formData.heroImage : URL.createObjectURL(formData.heroImage)} className="w-full h-full object-cover" alt="Hero" />
                                        ) : (
                                            <ImageIcon size={32} className="text-gray-700" />
                                        )}
                                    </div>
                                    <label className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold text-xs cursor-pointer transition-all shadow-lg flex items-center gap-2">
                                        <Upload size={16} /> CHOOSE IMAGE
                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => setFormData({...formData, heroImage: e.target.files[0]})} />
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2 italic">Hero Description</label>
                                <textarea className={`${inputClass} h-32 resize-none`} value={formData.heroDescription || ''} onChange={e => setFormData({ ...formData, heroDescription: e.target.value })} placeholder="Intro paragraph..." />
                            </div>
                        </div>
                    </div>

                    {/* 2. OFFERINGS (Cards) */}
                    <div className="bg-[#0f172a] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
                        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400"><Info size={24} /></div>
                                <h3 className="text-xl font-bold italic text-white">Offerings</h3>
                            </div>
                            <button type="button" onClick={addContentItem} className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2 rounded-xl font-black text-xs transition-all flex items-center gap-2">
                                <Plus size={16} /> ADD CARD
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {formData.contentItems.map((item, idx) => (
                                <div key={idx} className="bg-[#1e293b]/50 rounded-[2rem] border border-white/5 p-6 space-y-4">
                                    <div className="flex justify-between items-center gap-4">
                                        <input placeholder="Title" className="flex-grow bg-transparent border-b border-white/10 outline-none text-sm font-bold text-white" value={item.title} onChange={e => {
                                            const newItems = [...formData.contentItems];
                                            newItems[idx].title = e.target.value;
                                            setFormData({...formData, contentItems: newItems});
                                        }} />
                                        <button type="button" onClick={() => removeContentItem(idx)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-all"><Trash2 size={18}/></button>
                                    </div>
                                    
                                    {/* ✅ Purana Select hata kar IconPicker lga dya ha srf */}
                                    <IconPicker 
                                        selectedIcon={item.iconName} 
                                        onChange={(val) => {
                                            const newItems = [...formData.contentItems];
                                            newItems[idx].iconName = val;
                                            setFormData({...formData, contentItems: newItems});
                                        }}
                                    />

                                    <textarea placeholder="Description" className="w-full bg-[#0f172a] border border-white/5 rounded-xl p-3 text-xs h-24 resize-none outline-none text-gray-400" value={item.description} onChange={e => {
                                        const newItems = [...formData.contentItems];
                                        newItems[idx].description = e.target.value;
                                        setFormData({...formData, contentItems: newItems});
                                    }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. CHECKLIST & WHY FAILS SECTION */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[#0f172a] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="flex items-center gap-2 text-lg font-bold italic text-white">
                                    <CheckSquare size={20} className="text-cyan-400" /> Page Checklist
                                </h3>
                                <button type="button" onClick={addChecklistItem} className="p-1.5 bg-cyan-600 rounded-lg text-white"><Plus size={16}/></button>
                            </div>
                            <div className="space-y-3">
                                {formData.checklist?.map((item, i) => (
                                    <div key={i} className="flex gap-2">
                                        <input className={`${inputClass} !p-2 text-xs`} value={item} onChange={e => {
                                            const newC = [...formData.checklist];
                                            newC[i] = e.target.value;
                                            setFormData({...formData, checklist: newC});
                                        }} placeholder="Checklist item..." />
                                        <button type="button" onClick={() => removeChecklistItem(i)} className="text-red-500 p-1"><Trash2 size={16}/></button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#0f172a] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="flex items-center gap-2 text-lg font-bold italic text-white">
                                    <AlertCircle size={20} className="text-red-400" /> Why Generic Content Fails
                                </h3>
                                <button type="button" onClick={addReason} className="p-1.5 bg-red-600 rounded-lg text-white"><Plus size={16}/></button>
                            </div>
                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {formData.reasons?.map((reason, i) => (
                                    <div key={i} className="space-y-2 p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="flex justify-between">
                                            <input placeholder="Title" className="bg-transparent border-b border-white/10 outline-none text-xs font-bold text-white w-full" value={reason.title} onChange={e => {
                                                const newR = [...formData.reasons];
                                                newR[i].title = e.target.value;
                                                setFormData({...formData, reasons: newR});
                                            }} />
                                            <button type="button" onClick={() => removeReason(i)} className="text-red-500 ml-2"><Trash2 size={14}/></button>
                                        </div>
                                        <textarea placeholder="Description" className="w-full bg-[#1e293b] border border-white/5 rounded-xl p-2 text-[10px] h-16 resize-none outline-none text-gray-400" value={reason.description} onChange={e => {
                                            const newR = [...formData.reasons];
                                            newR[i].description = e.target.value;
                                            setFormData({...formData, reasons: newR});
                                        }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT COLUMN --- */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-[#0f172a] border border-blue-500/20 rounded-[2.5rem] p-8 shadow-2xl">
                        <h3 className="flex items-center gap-2 text-lg font-bold italic text-blue-400 mb-6"><Globe size={20} /> SEO Data</h3>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-blue-400/60 uppercase ml-2">Meta Title</label>
                                <input className={inputClass} value={formData.metaTitle || ''} onChange={e => setFormData({...formData, metaTitle: e.target.value})} placeholder="Meta Title" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-blue-400/60 uppercase ml-2">Meta Keywords</label>
                                <input className={inputClass} value={formData.metaKeywords || ''} onChange={e => setFormData({...formData, metaKeywords: e.target.value})} placeholder="Keywords..." />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-blue-400/60 uppercase ml-2">Meta Description</label>
                                <textarea className={`${inputClass} h-32 resize-none text-xs`} value={formData.metaDescription || ''} onChange={e => setFormData({...formData, metaDescription: e.target.value})} placeholder="Search engine description..." />
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0f172a] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="flex items-center gap-2 text-lg font-bold italic text-purple-400"><HelpCircle size={20} /> FAQs</h3>
                            <button type="button" onClick={addFaq} className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 active:scale-90"><Plus size={18} /></button>
                        </div>
                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {formData.faqs.map((faq, idx) => (
                                <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-3">
                                    <div className="flex justify-between items-start gap-2">
                                        <input placeholder="Question" className="flex-grow bg-transparent border-b border-white/5 outline-none text-xs font-bold text-white py-1" value={faq.question} onChange={e => {
                                            const newFaqs = [...formData.faqs];
                                            newFaqs[idx].question = e.target.value;
                                            setFormData({...formData, faqs: newFaqs});
                                        }} />
                                        <button type="button" onClick={() => removeFaq(idx)} className="text-red-500/50 hover:text-red-500 mt-1"><Trash2 size={14}/></button>
                                    </div>
                                    <textarea placeholder="Answer text..." className="w-full bg-[#1e293b] border border-white/5 rounded-xl p-2 text-[10px] h-20 resize-none outline-none text-gray-400" value={faq.answer} onChange={e => {
                                        const newFaqs = [...formData.faqs];
                                        newFaqs[idx].answer = e.target.value;
                                        setFormData({...formData, faqs: newFaqs});
                                    }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ServiceForm;