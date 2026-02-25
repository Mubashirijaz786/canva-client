import React from 'react';
import { Trash2, Edit3, Sparkles } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const WhyChooseUsCard = ({ feature, onDelete, onEdit }) => {
  
    const IconComponent = LucideIcons[feature.iconName] || Sparkles;

    return (
        <div className="p-8 flex flex-col h-full group relative">
            <div className="flex justify-between items-start mb-6">
                {/* Icon Wrapper */}
                <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    <IconComponent size={28} />
                </div>

                {/* Edit/Delete Buttons */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <button 
                        onClick={() => onEdit(feature)} 
                        className="p-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white rounded-xl transition-all"
                    >
                        <Edit3 size={16} />
                    </button>
                    <button 
                        onClick={() => onDelete(feature._id)} 
                        className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                <h3 className="text-white font-bold text-xl mb-3 tracking-tight group-hover:text-blue-400 transition-colors">
                    {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {feature.description}
                </p>
            </div>
            
      
            <div className="mt-auto h-8"></div>
        </div>
    );
};

export default WhyChooseUsCard;