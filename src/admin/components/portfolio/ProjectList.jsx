import React from 'react';
import { Trash2, Edit3, ExternalLink } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

const ProjectList = ({ projects, onEdit, onDelete }) => {
    const { adminAuth } = useAdminAuth();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
                <div key={project._id} className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] overflow-hidden group hover:border-blue-500/30 transition-all backdrop-blur-sm">
                    <div className="h-48 overflow-hidden relative">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                        
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noreferrer" className="p-2 bg-black/50 backdrop-blur-md text-green-400 rounded-xl hover:bg-green-500 hover:text-white transition-all">
                                    <ExternalLink size={16}/>
                                </a>
                            )}

                            {/* Edit Button: Visible to both Admin and Superadmin */}
                            <button onClick={() => onEdit(project)} className="p-2 bg-black/50 backdrop-blur-md text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white transition-all">
                                <Edit3 size={16}/>
                            </button>
                            
                            {/* ✅ STRICT CHECK: Only Superadmin can see the Delete Button */}
                            {adminAuth?.role === 'superadmin' ? (
                                <button 
                                    onClick={() => onDelete(project._id)} 
                                    className="p-2 bg-red-500/20 backdrop-blur-md text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                                    title="Only Superadmin can delete"
                                >
                                    <Trash2 size={16}/>
                                </button>
                            ) : null}
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest">{project.category}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                        <p className="text-gray-500 text-xs line-clamp-2 mb-4 leading-relaxed">{project.desc}</p>
                        <div className="flex flex-wrap gap-2">
                            {project.tags?.map((tag, i) => (
                                <span key={i} className="text-[10px] bg-white/5 px-2 py-1 rounded-md text-gray-400 border border-white/10">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProjectList;