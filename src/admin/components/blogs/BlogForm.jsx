import React, { useRef, useEffect } from 'react';
import { X, Upload, PlusCircle, MinusCircle, FileText, Loader2, Image as ImageIcon, Clock, Trash2, Search } from 'lucide-react';

const BlogForm = ({ 
    formData, setFormData, sections, setSections, handleSubmit, 
    loading, resetForm, setMainImage, mainImage 
}) => {
    const sectionsEndRef = useRef(null);

    // ✅ Auto-generate slug and meta title from title
    const handleTitleChange = (e) => {
        const val = e.target.value;
        // Logic: Title ko lowercase karo, symbols hatao, aur spaces ko dashes (-) se badlo
        const generatedSlug = val.toLowerCase()
                                .replace(/[^\w ]+/g, '') 
                                .replace(/ +/g, '-');
        
        setFormData({
            ...formData,
            title: val,
            slug: generatedSlug,
            metaTitle: val // Default meta title title hi rakhte hain
        });
    };

    const addSection = () => {
        setSections([...sections, { heading: '', text: '', sectionImage: null, preview: null }]);
    };

    useEffect(() => {
        if (sections.length > 1) {
            sectionsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [sections.length]);
    
    const removeSection = (index) => setSections(sections.filter((_, i) => i !== index));

    const handleSectionChange = (index, e) => {
        const newSections = [...sections];
        newSections[index][e.target.name] = e.target.value;
        setSections(newSections);
    };

    const handleSectionImage = (index, file) => {
        if (!file) return;
        const newSections = [...sections];
        newSections[index].sectionImage = file;
        newSections[index].preview = URL.createObjectURL(file);
        setSections(newSections);
    };

    const removeSectionImage = (index) => {
        const newSections = [...sections];
        newSections[index].sectionImage = null;
        newSections[index].preview = null;
        setSections(newSections);
    };

    return (
        <div className="bg-[#0f172a] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar scroll-smooth">
            
            <div className="flex justify-between items-center sticky top-0 bg-[#0f172a] py-4 z-20 border-b border-white/5 mb-8">
                <div>
                    <h2 className="text-2xl font-black italic text-white tracking-tight">Compose Story</h2>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest text-blue-500">SEO & Dynamic Content Builder</p>
                </div>
                <button type="button" onClick={resetForm} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all"><X size={28}/></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* --- BASIC INFO SECTION --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Main Title</label>
                            <input 
                                type="text" 
                                placeholder="Article Title" 
                                required 
                                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-blue-500 transition-all" 
                                value={formData.title} 
                                onChange={handleTitleChange} 
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Category</label>
                                <input type="text" placeholder="Technology" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-blue-500" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                            </div>
                            <div className="space-y-2 relative">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Read Time</label>
                                <div className="relative">
                                    <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <input type="text" placeholder="5 min read" required className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 rounded-2xl text-white outline-none focus:border-blue-500" value={formData.readTime} onChange={e => setFormData({...formData, readTime: e.target.value})} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-[2rem] cursor-pointer hover:bg-white/5 transition-all text-gray-500 hover:border-blue-500/50 relative overflow-hidden h-full min-h-[180px]">
                        {mainImage ? (
                            <img src={mainImage instanceof File ? URL.createObjectURL(mainImage) : mainImage} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Main Preview" />
                        ) : null}
                        <Upload size={32} className="relative z-10 mb-2" />
                        <span className="text-[10px] font-black uppercase relative z-10">{mainImage ? "Change Main Image" : "Upload Hero Image"}</span>
                        <input type="file" accept="image/*" className="hidden" onChange={e => setMainImage(e.target.files[0])} />
                    </label>
                </div>

                {/* --- ✅ SEO & SEARCH OPTIMIZATION SECTION --- */}
                <div className="p-8 bg-blue-600/5 border border-blue-500/20 rounded-[2.5rem] space-y-6">
                    <div className="flex items-center gap-2 text-blue-400">
                        <Search size={18} />
                        <h3 className="text-xs font-black uppercase tracking-[0.2em]">Search Engine Optimization (SEO)</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">URL Slug (How it appears in browser)</label>
                            <input 
                                type="text" 
                                placeholder="url-path-here" 
                                className="w-full bg-black/20 border border-white/5 p-4 rounded-xl text-white outline-none focus:border-blue-500 text-sm" 
                                value={formData.slug} 
                                onChange={e => setFormData({...formData, slug: e.target.value})} 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Meta Title (Google Display Name)</label>
                            <input 
                                type="text" 
                                placeholder="Best Meta Title..." 
                                className="w-full bg-black/20 border border-white/5 p-4 rounded-xl text-white outline-none focus:border-blue-500 text-sm" 
                                value={formData.metaTitle} 
                                onChange={e => setFormData({...formData, metaTitle: e.target.value})} 
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Meta Keywords (Comma separated)</label>
                        <input 
                            type="text" 
                            placeholder="react, web development, solutions" 
                            className="w-full bg-black/20 border border-white/5 p-4 rounded-xl text-white outline-none focus:border-blue-500 text-sm" 
                            value={formData.metaKeywords} 
                            onChange={e => setFormData({...formData, metaKeywords: e.target.value})} 
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Meta Description (Short Google Snippet)</label>
                        <textarea 
                            placeholder="Write a catchy 160-character description for Google search..." 
                            className="w-full bg-black/20 border border-white/5 p-4 rounded-xl text-white outline-none h-20 resize-none focus:border-blue-500 text-sm leading-relaxed" 
                            value={formData.metaDescription} 
                            onChange={e => setFormData({...formData, metaDescription: e.target.value})} 
                        />
                    </div>
                </div>

                {/* Excerpt & Intro */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Excerpt (Card View Text)</label>
                        <textarea placeholder="Short Excerpt for blog card..." required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none h-24 resize-none focus:border-blue-500" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Introduction Paragraph</label>
                        <textarea placeholder="Write the opening of your story..." required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none h-32 resize-none focus:border-blue-500" value={formData.intro} onChange={e => setFormData({...formData, intro: e.target.value})} />
                    </div>
                </div>

                {/* Content Sections Area */}
                <div className="space-y-6 pt-6 border-t border-white/5">
                    <h3 className="text-lg font-black italic text-blue-400">Content Flow</h3>
                    {sections.map((section, index) => (
                        <div key={index} className="p-8 bg-white/[0.02] rounded-[2.5rem] border border-white/10 space-y-6 relative group animate-in slide-in-from-bottom-4 duration-300">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Section #{index + 1} Heading</label>
                                <input name="heading" placeholder="Sub-heading..." className="w-full bg-transparent border-b border-white/10 py-2 text-white font-black text-xl italic outline-none focus:border-blue-500 transition-all" value={section.heading} onChange={e => handleSectionChange(index, e)} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Section Content</label>
                                <textarea name="text" placeholder="Write detailed section content..." className="w-full bg-transparent text-gray-400 outline-none h-32 resize-none leading-relaxed focus:text-gray-200" value={section.text} onChange={e => handleSectionChange(index, e)} />
                            </div>
                            <div className="flex items-center gap-6 p-4 bg-white/5 rounded-2xl border border-white/5">
                                <label className="shrink-0 w-32 h-24 border border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all group/img overflow-hidden relative">
                                    {section.preview ? (
                                        <img src={section.preview} className="absolute inset-0 w-full h-full object-cover" alt="Section" />
                                    ) : (
                                        <>
                                            <ImageIcon size={20} className="text-gray-500 group-hover/img:text-blue-500" />
                                            <span className="text-[8px] font-black uppercase text-gray-500 mt-2 text-center">Add Visual</span>
                                        </>
                                    )}
                                    <input type="file" accept="image/*" className="hidden" onChange={e => handleSectionImage(index, e.target.files[0])} />
                                </label>
                                <div className="flex-grow">
                                    <div className="text-[10px] text-gray-500 font-medium italic mb-2">{section.preview ? "Image ready!" : "Optional section image."}</div>
                                    {section.preview && (
                                        <button type="button" onClick={() => removeSectionImage(index)} className="flex items-center gap-1.5 text-red-500 text-[10px] font-black uppercase hover:text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg">
                                            <Trash2 size={12} /> Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                            {sections.length > 1 && (
                                <button type="button" onClick={() => removeSection(index)} className="absolute top-4 right-4 p-2 text-red-500/50 hover:text-red-500 transition-all"><MinusCircle size={22}/></button>
                            )}
                        </div>
                    ))}
                    <div className="flex justify-center py-4" ref={sectionsEndRef}>
                        <button type="button" onClick={addSection} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white bg-white/5 border border-white/10 px-8 py-4 rounded-2xl hover:bg-blue-600 hover:border-blue-500 transition-all active:scale-95 group">
                            <PlusCircle size={20} className="text-blue-500 group-hover:text-white" /> Add New Section
                        </button>
                    </div>
                </div>

                <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] text-white shadow-xl shadow-blue-600/20 flex justify-center items-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50">
                    {loading ? <Loader2 className="animate-spin" /> : <><FileText size={20}/> Publish To Website</>}
                </button>
            </form>
        </div>
    );
};

export default BlogForm;