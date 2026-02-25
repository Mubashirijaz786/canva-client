import React from 'react';
import { Plus, Edit3, Loader2, Upload, Link as LinkIcon, X } from 'lucide-react';

const TeamForm = ({ 
    formData, setFormData, handleSubmit, loading, editMode, 
    resetForm, uploadType, setUploadType, handleFileChange, imagePreview 
}) => {
    return (
        <div className="bg-[#0f172a] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold italic text-white tracking-tight">
                    {editMode ? 'Update Member' : 'Add New Member'}
                </h2>
                <button onClick={resetForm} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all">
                    <X size={24}/>
                </button>
            </div>
            
            <div className="flex gap-4 mb-6">
                <button type="button" onClick={() => setUploadType('file')} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${uploadType === 'file' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-white/5 text-gray-400'}`}>
                    <Upload size={16}/> File
                </button>
                <button type="button" onClick={() => setUploadType('url')} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${uploadType === 'url' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-white/5 text-gray-400'}`}>
                    <LinkIcon size={16}/> URL
                </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all text-white" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Ahmad Aftab" />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Professional Role</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all text-white" required value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} placeholder="e.g. SEO Expert" />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Member Image</label>
                    {uploadType === 'file' ? (
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-blue-500/50 hover:bg-white/5 transition-all overflow-hidden">
                            {imagePreview ? (
                                <img src={imagePreview} className="h-full w-full object-contain p-2" alt="Preview" />
                            ) : (
                                <div className="flex flex-col items-center text-gray-500">
                                    <Upload size={30} className="mb-2" />
                                    <span className="text-sm">Click to select image</span>
                                </div>
                            )}
                            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                        </label>
                    ) : (
                        <input type="text" placeholder="https://..." className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all text-white" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
                    )}
                </div>

                <button disabled={loading} className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-white transition-all flex items-center justify-center gap-2 ${editMode ? 'bg-orange-600 hover:bg-orange-500' : 'bg-blue-600 hover:bg-blue-500'}`}>
                    {loading ? <Loader2 className="animate-spin" /> : editMode ? 'Update Member' : 'Add Member'}
                </button>
            </form>
        </div>
    );
};

export default TeamForm;    