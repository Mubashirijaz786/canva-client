import React from 'react';
import { Edit3 } from 'lucide-react';

const ServiceList = ({ services, onEdit }) => {
    return (
        <div className="bg-[#0f172a] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
            <table className="w-full text-left border-collapse">
                <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                        <th className="p-6 text-xs font-black uppercase tracking-widest text-gray-400">Service Name</th>
                        <th className="p-6 text-xs font-black uppercase tracking-widest text-gray-400">Identifier</th>
                        <th className="p-6 text-xs font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {services.map((service) => (
                        <tr key={service.id} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="p-6 font-bold text-lg">{service.name}</td>
                            <td className="p-6 text-sm text-blue-400 font-mono italic">{service.id}</td>
                            <td className="p-6 text-right">
                                <button 
                                    onClick={() => onEdit(service.id)}
                                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                                >
                                    <Edit3 size={16} /> Edit Content
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ServiceList;