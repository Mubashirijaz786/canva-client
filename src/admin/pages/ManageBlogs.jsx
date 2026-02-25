import React, { useState, useEffect } from 'react';
import { axiosPrivate, axiosPublic } from '../../api/axios';
import { Plus, BookOpen } from 'lucide-react';
import BlogForm from '../components/blogs/BlogForm';
import BlogList from '../components/blogs/BlogList';

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null); 
    
    const [mainImage, setMainImage] = useState(null);
    const [sections, setSections] = useState([{ heading: '', text: '', sectionImage: null, preview: null }]);
    
    // ✅ Updated formData with SEO fields
    const [formData, setFormData] = useState({
        title: '', 
        excerpt: '', 
        category: '', 
        author: 'Admin', 
        readTime: '', 
        intro: '',
        slug: '', // URL Slug
        metaTitle: '', // SEO Title
        metaDescription: '', // SEO Description
        metaKeywords: '', // SEO Keywords
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    });

    useEffect(() => { fetchBlogs(); }, []);

    const fetchBlogs = async () => {
        try {
            const res = await axiosPublic.get('/blogs');
            setBlogs(res.data);
        } catch (err) { console.error("Error fetching blogs:", err); }
    };

    const resetForm = () => {
        setFormData({ 
            title: '', excerpt: '', category: '', author: 'Admin', readTime: '', intro: '', 
            slug: '', metaTitle: '', metaDescription: '', metaKeywords: '',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) 
        });
        setSections([{ heading: '', text: '', sectionImage: null, preview: null }]);
        setMainImage(null);
        setEditingId(null);
        setIsModalOpen(false);
    };

    // ✅ Load blog data including SEO fields for editing
    const handleEditClick = (blog) => {
        setEditingId(blog._id);
        setFormData({
            title: blog.title,
            excerpt: blog.excerpt,
            category: blog.category,
            author: blog.author,
            readTime: blog.readTime,
            intro: blog.intro,
            date: blog.date,
            slug: blog.slug || '', // Load SEO Slug
            metaTitle: blog.metaTitle || '', // Load SEO Title
            metaDescription: blog.metaDescription || '', // Load SEO Desc
            metaKeywords: blog.metaKeywords || '' // Load SEO Keywords
        });

        const mappedSections = blog.sections.map(s => ({
            heading: s.heading,
            text: s.text,
            sectionImage: null, 
            preview: s.image 
        }));
        setSections(mappedSections);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();

        try {
            // ✅ Append all basic and SEO fields to FormData
            const fieldsToAppend = [
                'title', 'excerpt', 'category', 'author', 'readTime', 
                'date', 'intro', 'slug', 'metaTitle', 'metaDescription', 'metaKeywords'
            ];
            
            fieldsToAppend.forEach(field => {
                data.append(field, formData[field]);
            });

            if (mainImage) data.append('mainImage', mainImage);

            const textSections = sections.map(s => ({ heading: s.heading, text: s.text }));
            data.append('sections', JSON.stringify(textSections));

            sections.forEach((s, i) => {
                if (s.sectionImage) data.append(`sectionImage_${i}`, s.sectionImage);
            });

            if (editingId) {
                // UPDATE logic
                await axiosPrivate.put(`/blogs/${editingId}`, data);
                alert("✅ Article & SEO Updated Successfully!");
            } else {
                // CREATE logic
                await axiosPrivate.post('/blogs', data);
                alert("✅ New Blog Published with SEO Settings!");
            }

            resetForm();
            fetchBlogs();
        } catch (err) {
            console.error(err);
            alert("❌ Failed: " + (err.response?.data?.message || "Server Error"));
        } finally {
            setLoading(false);
        }
    };

    const deleteBlog = async (id) => {
        if (!window.confirm("Do you really want to delete this blog?")) return;
        try {
            await axiosPrivate.delete(`/blogs/${id}`);
            fetchBlogs();
        } catch (err) { console.error(err); }
    };

    return (
        <div className="space-y-8 p-4 animate-in fade-in duration-700 font-['Manrope']">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-black italic text-white flex items-center gap-3">
                        <BookOpen className="text-blue-500" size={36}/> Knowledge Hub
                    </h1>
                    <p className="text-gray-500 text-sm">Compose stories with full SEO control.</p>
                </div>
                <button onClick={() => { resetForm(); setIsModalOpen(true); }} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-[2rem] font-bold shadow-lg transition-all active:scale-95">
                    Create New Story
                </button>
            </div>

            <BlogList 
                blogs={blogs} 
                deleteBlog={deleteBlog} 
                handleEditClick={handleEditClick} 
            />

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={resetForm} />
                    <div className="relative w-full max-w-4xl z-10">
                        <BlogForm 
                            formData={formData} 
                            setFormData={setFormData}
                            sections={sections} 
                            setSections={setSections}
                            handleSubmit={handleSubmit} 
                            loading={loading}
                            resetForm={resetForm} 
                            setMainImage={setMainImage}
                            mainImage={mainImage}
                            editingId={editingId} 
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBlogs;