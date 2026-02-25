import React from 'react';
import { Trash2, Star, MessageSquareQuote, Edit3, Zap, CheckCircle2 } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

const ReviewCard = ({ rev, onDelete, onEdit, onMakeHero }) => {
    const { adminAuth } = useAdminAuth();

    return (
        <div className={`p-8 rounded-[2.5rem] flex flex-col justify-between group transition-all backdrop-blur-sm relative overflow-hidden h-full border-2 ${rev.isFeatured ? 'border-blue-500 bg-blue-500/5' : 'border-white/10 bg-white/[0.03] hover:border-white/20'}`}>
            
            {adminAuth?.role === 'superadmin' && (
                <div className="absolute top-0 right-0 p-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <button onClick={() => onEdit(rev)} className="p-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white rounded-xl transition-all">
                        <Edit3 size={18} />
                    </button>
                    <button onClick={() => onDelete(rev._id)} className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all">
                        <Trash2 size={18} />
                    </button>
                </div>
            )}
            
            <div className="mb-14">
                <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < rev.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-700"} />
                    ))}
                </div>
                <MessageSquareQuote size={30} className="text-blue-500/20 mb-4" />
                <p className="text-gray-300 text-lg italic leading-relaxed mb-4">"{rev.quote}"</p>
            </div>

            <div className="relative">
                <div className="pt-6 border-t border-white/10">
                    <h4 className="text-white font-bold text-xl tracking-tight">{rev.author}</h4>
                    <p className="text-blue-400 font-medium text-sm uppercase tracking-widest">{rev.role}</p>
                </div>

                <div className="absolute bottom-0 right-0">
                    {rev.isFeatured ? (
                        <div className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 shadow-lg">
                            <CheckCircle2 size={12} /> Hero Active
                        </div>
                    ) : (
                        <button 
                            onClick={() => onMakeHero(rev._id)}
                            className="bg-white/5 hover:bg-blue-600 text-gray-400 hover:text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase border border-white/10 transition-all flex items-center gap-2"
                        >
                            <Zap size={12} /> Set as Hero
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;