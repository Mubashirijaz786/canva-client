import React, { useState, useEffect, useRef } from 'react';
import { axiosPrivate, axiosPublic } from '../../api/axios';
import { Plus, Zap, CheckCircle2, Upload, ImageIcon, Loader2 } from 'lucide-react';
import FeatureCard from '../components/whychooseus/WhyChooseUsCard'; 
import FeatureForm from '../components/whychooseus/WhyChooseUsForm'; 

const ManageWhyChooseUs = () => {
    const [features, setFeatures] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentFeature, setCurrentFeature] = useState(null); 
    const [loading, setLoading] = useState(false);
    const heroInputRef = useRef();

    useEffect(() => { fetchFeatures(); }, []);

    const fetchFeatures = async () => {
        try {
            const res = await axiosPublic.get('/whychooseus');
            setFeatures(res.data);
        } catch (err) { console.error(err); }
    };

    const handleMakeFeatured = async (id) => {
        try {
            await axiosPrivate.put(`/whychooseus/${id}`, { isFeatured: true });
            fetchFeatures();
        } catch (err) { alert("Error setting hero feature"); }
    };

    const handleGlobalImageUpload = async (file) => {
        if (!file) return;
        const data = new FormData();
        data.append('image', file);
        setLoading(true);
        try {
            const featured = features.find(f => f.isFeatured) || features[0];
            if (!featured) return alert("Pehle koi feature add karein");
            await axiosPrivate.put(`/whychooseus/${featured._id}`, data);
            fetchFeatures();
        } catch (err) { alert("Upload failed"); }
        finally { setLoading(false); }
    };

    const handleFormSubmit = async (formData) => {
        setLoading(true);
        try {
            if (currentFeature) await axiosPrivate.put(`/whychooseus/${currentFeature._id}`, formData);
            else await axiosPrivate.post('/whychooseus', formData);
            setIsFormOpen(false);
            fetchFeatures();
        } catch (err) { alert("Error saving feature"); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this feature?")) {
            try {
                await axiosPrivate.delete(`/whychooseus/${id}`);
                fetchFeatures();
            } catch (err) { alert("Error deleting"); }
        }
    };

    const activeHero = features.find(f => f.isFeatured);

    return (
        <div className="min-h-screen text-white font-['Manrope'] pb-20 px-4">
            
            {/* --- GLOBAL IMAGE UPLOADER --- */}
            <div className="flex flex-col md:flex-row items-center justify-between bg-[#111827] border border-white/10 rounded-[2.5rem] p-8 mb-12 gap-6 shadow-2xl">
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-black/40 border border-white/10 relative group cursor-pointer">
                        {activeHero?.image ? (
                            <img src={activeHero.image} className="w-full h-full object-cover" alt="Hero" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-600"><ImageIcon size={30} /></div>
                        )}
                        <div onClick={() => heroInputRef.current.click()} className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <Upload size={20} />
                        </div>
                        <input type="file" ref={heroInputRef} className="hidden" onChange={(e) => handleGlobalImageUpload(e.target.files[0])} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold uppercase tracking-tight italic text-blue-400">Section Hero Image</h2>
                        <p className="text-gray-500 text-sm">Upload the main branding image for the Why Choose Us section.</p>
                    </div>
                </div>

                <button onClick={() => { setCurrentFeature(null); setIsFormOpen(true); }} className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg">
                    <Plus size={20} /> Add New Feature
                </button>
            </div>

            {/* --- FEATURES GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map(f => (
                    <div key={f._id} className={`relative rounded-[2.5rem] transition-all border-2 overflow-hidden ${f.isFeatured ? 'border-blue-500 bg-blue-500/5' : 'border-white/5 bg-[#111827]'}`}>
                        <FeatureCard 
                            feature={f} 
                            onDelete={handleDelete} 
                            onEdit={(item) => { setCurrentFeature(item); setIsFormOpen(true); }} 
                        />
                        <div className="absolute bottom-6 right-6 z-10">
                            {f.isFeatured ? (
                                <span className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 shadow-lg">
                                    <CheckCircle2 size={12} /> Image Anchor
                                </span>
                            ) : (
                                <button 
                                    onClick={() => handleMakeFeatured(f._id)}
                                    className="bg-white/10 hover:bg-blue-600 text-gray-300 hover:text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase border border-white/10 transition-all flex items-center gap-2 backdrop-blur-md shadow-lg"
                                >
                                    <Zap size={12} /> Set as Hero
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {loading && <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"><Loader2 className="animate-spin text-blue-500" size={50} /></div>}
            
            <FeatureForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleFormSubmit} loading={loading} initialData={currentFeature} />
        </div>
    );
};

export default ManageWhyChooseUs;