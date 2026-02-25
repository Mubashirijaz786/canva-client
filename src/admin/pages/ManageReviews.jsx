import React, { useState, useEffect, useRef } from 'react';
import { axiosPrivate, axiosPublic } from '../../api/axios';
import { Plus, Upload, ImageIcon, Loader2 } from 'lucide-react';
import ReviewCard from '../components/reviews/ReviewCard'; 
import ReviewForm from '../components/reviews/ReviewForm'; 

const ManageReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [brandingImage, setBrandingImage] = useState(""); // ✅ Global Branding Image State
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentReview, setCurrentReview] = useState(null); 
    const [loading, setLoading] = useState(false);
    const heroInputRef = useRef();

    useEffect(() => { fetchReviews(); }, []);

    const fetchReviews = async () => {
        try {
            const res = await axiosPublic.get('/reviews');
            // ✅ Backend ab { reviews: [], brandingImage: "" } bhej raha hai
            setReviews(res.data.reviews || []);
            setBrandingImage(res.data.brandingImage || "");
        } catch (err) { 
            console.error("Error fetching reviews:", err); 
        }
    };

    const handleMakeFeatured = async (id) => {
        try {
            await axiosPrivate.put(`/reviews/${id}`, { isFeatured: true });
            fetchReviews();
        } catch (err) { 
            alert("Error setting hero text"); 
        }
    };

    const handleGlobalImageUpload = async (file) => {
        if (!file) return;
        const data = new FormData();
        data.append('image', file);
        setLoading(true);
        try {
            // ✅ Ab ye direct Branding Image wale endpoint par hit karega
            await axiosPrivate.put('/reviews/branding-image', data);
            fetchReviews();
        } catch (err) { 
            alert("Upload failed. Check if server route is correct."); 
        } finally { 
            setLoading(false); 
        }
    };

    const handleFormSubmit = async (formData) => {
        setLoading(true);
        try {
            if (currentReview) {
                await axiosPrivate.put(`/reviews/${currentReview._id}`, formData);
            } else {
                await axiosPrivate.post('/reviews', formData);
            }
            setIsFormOpen(false);
            fetchReviews();
        } catch (err) { 
            alert("Error saving review"); 
        } finally { 
            setLoading(false); 
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            try {
                await axiosPrivate.delete(`/reviews/${id}`);
                fetchReviews();
            } catch (err) { 
                alert("Error deleting review"); 
            }
        }
    };

    return (
        <div className="min-h-screen text-white font-['Manrope'] pb-20 px-4">
            
            {/* Global Branding Image Section */}
            <div className="flex flex-col md:flex-row items-center justify-between bg-[#111827] border border-white/10 rounded-[2.5rem] p-8 mb-12 gap-6 shadow-2xl">
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-black/40 border border-white/10 relative group cursor-pointer shadow-xl">
                        {brandingImage ? (
                            <img src={brandingImage} className="w-full h-full object-cover" alt="Branding" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-600">
                                <ImageIcon size={30} />
                            </div>
                        )}
                        <div 
                            onClick={() => heroInputRef.current.click()} 
                            className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                        >
                            <Upload size={20} />
                        </div>
                        <input 
                            type="file" 
                            ref={heroInputRef} 
                            className="hidden" 
                            onChange={(e) => handleGlobalImageUpload(e.target.files[0])} 
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold uppercase tracking-tight italic text-blue-400">Section Branding Image</h2>
                        
                    </div>
                </div>

                <button 
                    onClick={() => { setCurrentReview(null); setIsFormOpen(true); }} 
                    className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg"
                >
                    <Plus size={20} /> Add New Testimonial
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map(rev => (
                    <ReviewCard 
                        key={rev._id} 
                        rev={rev} 
                        onDelete={handleDelete} 
                        onEdit={(r) => { setCurrentReview(r); setIsFormOpen(true); }} 
                        onMakeHero={handleMakeFeatured}
                    />
                ))}
            </div>

            {loading && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <Loader2 className="animate-spin text-blue-500" size={50} />
                </div>
            )}
            
            <ReviewForm 
                isOpen={isFormOpen} 
                onClose={() => setIsFormOpen(false)} 
                onSubmit={handleFormSubmit} 
                loading={loading} 
                initialData={currentReview} 
            />
        </div>
    );
};

export default ManageReviews;