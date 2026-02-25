import React from 'react';
import { Trash2, Edit3, Calendar, Tag, FileText, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

const BlogList = ({ blogs, deleteBlog, handleEditClick }) => {
    const { adminAuth } = useAdminAuth();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
            {blogs.length > 0 ? (
                blogs.map(blog => (
                    <div 
                        key={blog._id} 
                        className="bg-white/[0.03] border border-white/10 p-6 rounded-[2.5rem] flex gap-6 items-center group relative backdrop-blur-sm hover:border-blue-500/30 transition-all duration-500"
                    >
                        {/* Blog Thumbnail */}
                        <div className="relative shrink-0 overflow-hidden rounded-3xl w-32 h-32 shadow-2xl">
                            <img 
                                src={blog.image} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                alt={blog.title} 
                            />
                        </div>

                        {/* Blog Info */}
                        <div className="flex-grow min-w-0">
                            <div className="flex items-center gap-2 mb-2 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                                <Tag size={12}/> {blog.category}
                            </div>
                            <h3 className="text-white font-black italic text-lg line-clamp-2 leading-tight mb-3 group-hover:text-blue-400 transition-colors">
                                {blog.title}
                            </h3>
                            <div className="flex items-center gap-4 text-gray-500 text-[10px] font-bold">
                                <span className="flex items-center gap-1.5"><Calendar size={12}/> {blog.date}</span>
                                <span className="flex items-center gap-1.5"><FileText size={12}/> {blog.readTime}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute top-6 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                            
                            {/* ✅ FIXED: Use blog.slug instead of blog._id for SEO Friendly Link */}
                            <Link 
                                target="_blank" 
                                to={`/blog/${blog.slug}`} 
                                className="p-2.5 text-gray-400 bg-white/5 hover:bg-blue-600 hover:text-white rounded-xl transition-all"
                                title="View Live"
                            >
                                <ExternalLink size={18} />
                            </Link>
                            
                            {/* Edit Button */}
                            <button 
                                onClick={() => handleEditClick(blog)} 
                                className="p-2.5 text-blue-400 bg-blue-400/5 hover:bg-blue-400 hover:text-white rounded-xl transition-all"
                                title="Edit Article"
                            >
                                <Edit3 size={18} />
                            </button>

                            {/* Delete Button (Superadmin Only) */}
                            {adminAuth?.role === 'superadmin' && (
                                <button 
                                    onClick={() => deleteBlog(blog._id)} 
                                    className="p-2.5 text-red-500 bg-red-500/5 hover:bg-red-500/20 rounded-xl transition-all"
                                    title="Delete Article"
                                >
                                    <Trash2 size={20} />
                                </button>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <div className="md:col-span-2 py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
                    <p className="italic font-bold text-gray-600">No articles published yet.</p>
                </div>
            )}
        </div>
    );
};

export default BlogList;