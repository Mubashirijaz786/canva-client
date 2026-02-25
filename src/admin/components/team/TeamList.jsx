import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

const TeamList = ({ members, startEdit, deleteMember }) => {
    const { adminAuth } = useAdminAuth();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map(m => (
                <div key={m._id} className="bg-white/[0.03] border border-white/10 p-5 rounded-[2.5rem] group hover:border-blue-500/30 transition-all duration-500 relative overflow-hidden backdrop-blur-sm">
                    <div className="relative h-60 rounded-3xl overflow-hidden mb-5">
                        <img src={m.image} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            {adminAuth?.role === 'superadmin' && (
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            <button onClick={() => startEdit(m)} className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-xl backdrop-blur-md">
                                <Edit3 size={18} />
                            </button>
                            <button onClick={() => deleteMember(m._id)} className="p-3 bg-red-500 hover:bg-red-400 text-white rounded-xl shadow-xl backdrop-blur-md">
                                <Trash2 size={18} />
                            </button>
                        </div>
                            )}
                    </div>
                    <div className="px-2">
                        <h3 className="text-xl font-black text-white italic mb-1">{m.name}</h3>
                        <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">{m.role}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TeamList;