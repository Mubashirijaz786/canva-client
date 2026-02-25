import React, { useState, useEffect } from 'react';
import { X, Star, Loader2 } from 'lucide-react';

const ReviewForm = ({ isOpen, onClose, onSubmit, loading, initialData }) => {
    const [formData, setFormData] = useState({ author: '', role: '', quote: '', rating: 5 });
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        if (initialData) {
            setFormData({
                author: initialData.author || '',
                role: initialData.role || '',
                quote: initialData.quote || '',
                rating: initialData.rating || 5
            });
        } else {
            setFormData({ author: '', role: '', quote: '', rating: 5 });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-[#020617]/60 backdrop-blur-md" onClick={onClose}></div>
            <div className="relative w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-[3rem] p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-black italic text-white uppercase">{initialData ? "Edit Review" : "New Review"}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl text-gray-400 transition-colors"><X size={24} /></button>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="flex justify-center bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <Star 
                                    key={num} size={28}
                                    onClick={() => setFormData({ ...formData, rating: num })} 
                                    className={`cursor-pointer transition-colors ${(hoverRating || formData.rating) >= num ? 'fill-yellow-500 text-yellow-500' : 'text-gray-700'}`} 
                                    onMouseEnter={() => setHoverRating(num)} 
                                    onMouseLeave={() => setHoverRating(0)} 
                                />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black ml-2 text-center block">Client Details</label>
                        <input type="text" placeholder="Name" required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-blue-500 transition-all mb-4" />
                        <input type="text" placeholder="Role / Company" required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-blue-500 transition-all" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black ml-2 block text-center">Feedback Quote</label>
                        <textarea placeholder="Write client's quote here..." required value={formData.quote} onChange={e => setFormData({...formData, quote: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none h-32 resize-none focus:border-blue-500 transition-all" />
                    </div>

                    <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 uppercase tracking-widest">
                        {loading ? <Loader2 className="animate-spin mx-auto" size={24} /> : (initialData ? "Update Review" : "Save Review")}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReviewForm;