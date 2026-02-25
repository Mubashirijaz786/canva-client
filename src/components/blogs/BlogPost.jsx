import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, Loader2 } from 'lucide-react';
import { axiosPublic } from '../../api/axios';

// --- IMPORTS ---
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import ScrollToTop from '../common/ScrollToTop';
import WhatsAppButton from '../common/WhatsAppButton';
import MetaData from '../common/MetaData'; // ✅ SEO Component

const BlogPost = () => {
    const { slug } = useParams(); // ✅ URL se 'slug' uthayega (e.g. /blog/mera-post)
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSingleBlog = async () => {
            try {
                // ✅ Backend par slug se fetch karne wali API hit hogi
                const res = await axiosPublic.get(`/blogs/slug/${slug}`);
                setBlog(res.data);
            } catch (err) {
                console.error("Error fetching blog details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSingleBlog();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) return (
        <div className="bg-[#020617] min-h-screen text-white flex flex-col items-center justify-center gap-4 font-['Manrope']">
            <Loader2 className="animate-spin text-blue-500" size={40} />
            <p className="italic opacity-50">Fetching your story...</p>
        </div>
    );

    if (!blog) return (
        <div className="bg-[#020617] min-h-screen text-white flex flex-col items-center justify-center gap-6">
            <h2 className="text-2xl font-bold italic">Blog Post Not Found</h2>
            <Link to="/Blog" className="bg-blue-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                <ArrowLeft size={20} /> Back to Hub
            </Link>
        </div>
    );

    return (
        <div className="w-full relative bg-[#020617] min-h-screen text-white selection:bg-blue-500/30 overflow-x-hidden">
            
            {/* ✅ DYNAMIC SEO FOR REACT 19 ✅ 
                Ye tags React 19 khud head mein hoist kar dega */}
            <MetaData 
                title={`${blog.metaTitle || blog.title} | Canva Solutions`} 
                description={blog.metaDescription || blog.excerpt}
                keywords={blog.metaKeywords || "Canva Solutions, Tech Blog"}
            />

            <div className="relative w-full flex items-center justify-center p-2 sm:p-4 z-50">
                <div className="relative z-10 w-full lg:w-[98%] bg-transparent border border-transparent flex flex-col px-4 sm:px-10 lg:px-16 pt-4">
                    <Navbar />
                </div>
            </div>

            <article className="pb-24 relative z-10">
                
                {/* --- HEADER SECTION --- */}
                <div className="container mx-auto px-6 lg:px-16 max-w-5xl text-center mb-16 pt-20 animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold tracking-wide mb-8 uppercase">
                        <Tag size={14} /> {blog.category}
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-10 tracking-tight italic">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm border-y border-white/5 py-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                {blog.author.charAt(0)}
                            </div>
                            <div className="text-left">
                                <p className="text-white font-bold leading-none">{blog.author}</p>
                                <p className="text-[10px] text-gray-500 mt-1 uppercase font-black">{blog.role || 'Editor'}</p>
                            </div>
                        </div>
                        <div className="hidden md:block w-px h-8 bg-white/10"></div>
                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-blue-500" />
                            <span className="font-medium">{blog.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={18} className="text-blue-500" />
                            <span className="font-medium">{blog.readTime}</span>
                        </div>
                    </div>
                </div>

                {/* --- MAIN HERO IMAGE --- */}
                <div className="container mx-auto px-4 lg:px-16 max-w-6xl mb-20">
                    <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group">
                        <img 
                            src={blog.image} 
                            alt={blog.title} 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
                    </div>
                </div>

                {/* --- CONTENT SECTION --- */}
                <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
                    <div className="prose prose-lg prose-invert max-w-none mb-16">
                        <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light italic opacity-90">
                            {blog.intro}
                        </p>
                    </div>

                    <div className="space-y-20">
                        {blog.sections && blog.sections.map((section, index) => (
                            <div key={index} className="group animate-in fade-in slide-in-from-bottom-4 duration-1000">
                                {section.heading && (
                                    <h3 className="text-2xl md:text-4xl font-black text-white mb-6 italic tracking-tight group-hover:text-blue-400 transition-colors">
                                        {section.heading}
                                    </h3>
                                )}
                                
                                {section.text && (
                                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 font-medium whitespace-pre-wrap">
                                        {section.text}
                                    </p>
                                )}

                                {section.image && (
                                    <div className="my-14 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/10">
                                        <img 
                                            src={section.image} 
                                            alt={section.heading || 'section visual'} 
                                            className="w-full max-h-[550px] object-cover hover:scale-105 transition-transform duration-1000"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-24 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <Link 
                            to="/Blog" 
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-all group px-8 py-4 rounded-2xl bg-white/5 hover:bg-blue-600 font-black uppercase text-xs tracking-widest"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            <span>Return to Knowledge Hub</span>
                        </Link>
                    </div>
                </div>

            </article>

            <Footer />
            <WhatsAppButton />
            <ScrollToTop />
        </div>
    );
};

export default BlogPost;