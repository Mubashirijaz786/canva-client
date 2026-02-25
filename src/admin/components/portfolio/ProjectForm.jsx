import React, { useState, useEffect } from 'react';
import { X, Upload, Loader2, Plus, Link as LinkIcon, Trash2 } from 'lucide-react';

const ProjectForm = ({ isOpen, onClose, onSubmit, loading, initialData }) => {
    const [formData, setFormData] = useState({ title: '', category: 'Web Development', desc: '', image: '', link: '', tags: [] });
    const [imagePreview, setImagePreview] = useState(null);
    const [currentTag, setCurrentTag] = useState("");

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
            setImagePreview(initialData.image);
        } else {
            setFormData({ title: '', category: 'Web Development', desc: '', image: '', link: '', tags: [] });
            setImagePreview(null);
        }
    }, [initialData, isOpen]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, imageFile: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            
            <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-md animate-in fade-in" onClick={onClose}></div>
            <div className="relative w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-[3rem] p-8 md:p-10 shadow-2xl animate-in zoom-in-95 overflow-y-auto max-h-[90vh]">
                
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-black italic text-white">{initialData ? 'Update Project' : 'New Project'}</h3>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:bg-white/5 rounded-xl"><X /></button>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Project Title" required className="bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-blue-500" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                        
                        <select 
                            className="bg-[#0f172a] border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-blue-500 cursor-pointer" 
                            value={formData.category} 
                            onChange={e => setFormData({...formData, category: e.target.value})}
                        >
                            <option value="Web Development">Web Development</option>
                            <option value="Mobile Apps">Mobile Apps</option>
                            <option value="Graphic Design">Graphic Design</option>
                            <option value="SEO">SEO</option>
                            <option value="Content Writing">Content Writing</option>
                            <option value="E-Commerce">E-Commerce</option>
                            <option value="Social Media">Social Media</option>
                            <option value="Custom Software">Custom Software</option>

                        </select>
                    </div>

                    <textarea placeholder="Description..." required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white h-24 outline-none focus:border-blue-500" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} />

                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"><LinkIcon size={18}/></div>
                        <input type="url" placeholder="Project Live Link" className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl text-white outline-none focus:border-blue-500" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />
                    </div>

                    {/* ✅ Optimized Image Upload Section */}
                    <div className="flex items-center gap-6">
                        <label className="flex-grow bg-white/5 border border-dashed border-white/20 p-8 rounded-2xl cursor-pointer hover:bg-white/10 transition-all text-center group">
                            <Upload size={24} className="mx-auto mb-2 text-gray-500 group-hover:text-blue-500 transition-colors"/> 
                            <span className="text-sm text-gray-400">Click to Select Project Image</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </label>
                        
                        {imagePreview && (
                            <div className="relative shrink-0">
                                <img src={imagePreview} className="w-24 h-24 object-cover rounded-2xl border border-white/10" alt="Preview" />
                                <button type="button" onClick={() => {setImagePreview(null); setFormData({...formData, imageFile: null})}} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:scale-110 transition-transform">
                                    <Trash2 size={12} />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="flex gap-2">
                            <input type="text" placeholder="Tags (React, Node...)" className="flex-grow bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none" value={currentTag} onChange={e => setCurrentTag(e.target.value)} />
                            <button type="button" onClick={() => { if(currentTag) { setFormData({...formData, tags: [...formData.tags, currentTag]}); setCurrentTag(""); } }} className="bg-blue-600 px-4 rounded-xl text-white"><Plus/></button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.tags.map((t, i) => (
                                <span key={i} className="bg-blue-500/10 text-blue-400 text-[10px] px-3 py-1 rounded-lg border border-blue-500/20 flex items-center gap-1">
                                    {t} <X size={10} className="cursor-pointer" onClick={() => setFormData({...formData, tags: formData.tags.filter(tag => tag !== t)})}/>
                                </span>
                            ))}
                        </div>
                    </div>

                    <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black text-white shadow-lg transition-all active:scale-95 disabled:opacity-50">
                        {loading ? <Loader2 className="animate-spin mx-auto" /> : (initialData ? "Update Project" : "Publish Project")}
                    </button>
                </form>
            </div>
        </div>
    );
};
export default ProjectForm;