import React, { useState, useEffect, useRef } from 'react';
import { axiosPrivate, axiosPublic } from '../../api/axios';
import { Plus, Upload, ImageIcon, Loader2 } from 'lucide-react';
import WhyChooseUsCard from '../components/whychooseus/WhyChooseUsCard';
import WhyChooseUsForm from '../components/whychooseus/WhyChooseUsForm';

const ManageWhyChooseUs = () => {
    const [features, setFeatures] = useState([]);
    const [mainImage, setMainImage] = useState(""); // ✅ Global Image State
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentFeature, setCurrentFeature] = useState(null);
    const [loading, setLoading] = useState(false);
    const imageInputRef = useRef();

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        try {
            const res = await axiosPublic.get('/whychooseus');
            setFeatures(res.data.cards || []); // Backend structure ke mutabiq
            setMainImage(res.data.mainImage || "");
        } catch (err) { console.error(err); }
    };

    const handleImageUpload = async (file) => {
        if (!file) return;
        const data = new FormData();
        data.append('image', file);
        setLoading(true);
        try {
            // ✅ Put request to the dedicated image route
            await axiosPrivate.put('/whychooseus/image', data);
            fetchData();
            alert("Main image updated!");
        } catch (err) { alert("Upload failed"); }
        finally { setLoading(false); }
    };

    const handleFormSubmit = async (formData) => {
        setLoading(true);
        try {
            if (currentFeature) await axiosPrivate.put(`/whychooseus/card/${currentFeature._id}`, formData);
            else await axiosPrivate.post('/whychooseus/card', formData);
            setIsFormOpen(false);
            fetchData();
        } catch (err) { alert("Error saving card"); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this card?")) {
            try {
                await axiosPrivate.delete(`/whychooseus/card/${id}`);
                fetchData();
            } catch (err) { alert("Error deleting"); }
        }
    };

    return (
        <div className="min-h-screen text-white font-['Manrope'] pb-20 px-4">
            <h1 className="text-3xl font-black italic mb-8 uppercase text-blue-500">Manage Section Content</h1>

            {/* --- GLOBAL IMAGE UPLOADER --- */}
            <div className="flex flex-col md:flex-row items-center justify-between bg-[#111827] border border-white/10 rounded-[2.5rem] p-8 mb-12 gap-6 shadow-2xl">
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-black/40 border border-white/10 relative group cursor-pointer">
                        {mainImage ? (
                            <img src={mainImage} className="w-full h-full object-cover" alt="Main Section" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-600"><ImageIcon size={30} /></div>
                        )}
                        <div onClick={() => imageInputRef.current.click()} className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <Upload size={20} />
                        </div>
                        <input type="file" ref={imageInputRef} className="hidden" onChange={(e) => handleImageUpload(e.target.files[0])} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold uppercase text-blue-400 italic">Branding Image</h2>
                        <p className="text-gray-500 text-sm italic">This image is used globally for this section.</p>
                    </div>
                </div>

                <button
                    onClick={() => { setCurrentFeature(null); setIsFormOpen(true); }}
                    disabled={features.length >= 4}
                    className={`px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg
                  ${features.length >= 4
                            ? 'bg-gray-700 cursor-not-allowed opacity-50'
                            : 'bg-blue-600 hover:bg-blue-500 active:scale-95'
                        }`}
                >
                    <Plus size={20} />
                    {features.length >= 4 ? "Limit Reached (Max 4)" : "Add New Card"}
                </button>

            </div>

            {/* --- CARDS GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map(f => (
                    <WhyChooseUsCard
                        key={f._id}
                        feature={f}
                        onDelete={handleDelete}
                        onEdit={(item) => { setCurrentFeature(item); setIsFormOpen(true); }}
                    />
                ))}
            </div>

            {loading && <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"><Loader2 className="animate-spin text-blue-500" size={50} /></div>}

            <WhyChooseUsForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleFormSubmit} loading={loading} initialData={currentFeature} />
        </div>
    );
};

export default ManageWhyChooseUs;