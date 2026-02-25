import React, { useState, useEffect, useRef } from 'react';
import { axiosPrivate, axiosPublic } from '../../api/axios';
import { Upload, Video, Type, Users, Save, Loader2, PlayCircle, Image as ImageIcon } from 'lucide-react';

const ManageHero = () => {
    const [heroData, setHeroData] = useState({
        badgeText: '',
        heading: '',
        description: '',
        happyClientsCount: '',
        statsText: '', // ✅ Added this
        videoUrl: ''
    });
    
    const [videoFile, setVideoFile] = useState(null);
    const [clientFiles, setClientFiles] = useState(null); // ✅ Added state for multiple images
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    
    const videoInputRef = useRef();
    const clientsInputRef = useRef();

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await axiosPublic.get('/hero');
                setHeroData(res.data);
            } catch (err) { console.error("Error fetching hero data", err); }
            finally { setFetching(false); }
        };
        fetchHero();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('badgeText', heroData.badgeText);
        formData.append('heading', heroData.heading);
        formData.append('description', heroData.description);
        formData.append('happyClientsCount', heroData.happyClientsCount);
        formData.append('statsText', heroData.statsText); // ✅ Append statsText

        // Append Single Video
        if (videoFile) formData.append('video', videoFile);

        // ✅ Append Multiple Client Images
        if (clientFiles) {
            Array.from(clientFiles).forEach(file => {
                formData.append('clientImages', file);
            });
        }

        try {
            const res = await axiosPrivate.put('/hero', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setHeroData(res.data);
            setVideoFile(null);
            setClientFiles(null);
            alert("Hero Section Updated Successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to update Hero section.");
        } finally { setLoading(false); }
    };

    if (fetching) return <div className="p-20 text-center text-blue-500"><Loader2 className="animate-spin mx-auto" size={40} /></div>;

    return (
        <div className="min-h-screen text-white font-['Manrope'] pb-20 px-4">
            <div className="mb-10">
                <h1 className="text-3xl font-black italic uppercase tracking-tighter">Hero Section Manager</h1>
                <p className="text-gray-500 text-sm">Update text, background video, and stats card info.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* --- LEFT: EDIT FORM --- */}
                <form onSubmit={handleUpdate} className="lg:col-span-7 space-y-6 bg-[#111827] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 uppercase font-black ml-2">Badge Text</label>
                            <input type="text" value={heroData.badgeText} onChange={(e) => setHeroData({...heroData, badgeText: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 uppercase font-black ml-2">Happy Clients Count</label>
                            <input type="text" value={heroData.happyClientsCount} onChange={(e) => setHeroData({...heroData, happyClientsCount: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 text-sm" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 uppercase font-black ml-2">Main Heading</label>
                        <textarea value={heroData.heading} onChange={(e) => setHeroData({...heroData, heading: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 text-xl font-bold h-24 resize-none" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 uppercase font-black ml-2">Sub-Description</label>
                        <textarea value={heroData.description} onChange={(e) => setHeroData({...heroData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 text-gray-400 text-sm h-24 resize-none" />
                    </div>

                    {/* ✅ New Field: Stats Card Text */}
                    <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 uppercase font-black ml-2">Stats Card Teaser (Small Text)</label>
                        <textarea value={heroData.statsText} onChange={(e) => setHeroData({...heroData, statsText: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 text-xs h-20 resize-none" placeholder="e.g. We’re Canva Solutions — the AI-fueled agency..." />
                    </div>

                    <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl">
                        {loading ? <Loader2 className="animate-spin" size={24} /> : <><Save size={20} /> Save All Changes</>}
                    </button>
                </form>

                {/* --- RIGHT: ASSETS UPLOAD --- */}
                <div className="lg:col-span-5 space-y-6">
                    {/* Video Upload */}
                    <div className="bg-[#111827] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
                        <h3 className="text-sm font-black uppercase text-gray-500 mb-4 flex items-center gap-2"><Video size={16} /> Background Video</h3>
                        <div className="aspect-video rounded-3xl overflow-hidden bg-black/40 border border-white/5 mb-4">
                            <video key={heroData.videoUrl} src={heroData.videoUrl} className="w-full h-full object-cover opacity-60" autoPlay loop muted />
                        </div>
                        <input type="file" accept="video/*" ref={videoInputRef} className="hidden" onChange={(e) => setVideoFile(e.target.files[0])} />
                        <button onClick={() => videoInputRef.current.click()} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 text-sm">
                            <Upload size={18} /> {videoFile ? "Video Selected" : "Upload Video"}
                        </button>
                    </div>

                    {/* ✅ Multiple Client Images Upload */}
                    <div className="bg-[#111827] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
                        <h3 className="text-sm font-black uppercase text-gray-500 mb-4 flex items-center gap-2"><ImageIcon size={16} /> Client Avatars</h3>
                        <div className="flex -space-x-3 mb-4 overflow-hidden">
                            {heroData?.clientImages?.map((img, i) => (
                                <img key={i} src={img} className="w-10 h-10 rounded-full border-2 border-[#111827] object-cover" alt="client" />
                            ))}
                        </div>
                        <input type="file" multiple accept="image/*" ref={clientsInputRef} className="hidden" onChange={(e) => setClientFiles(e.target.files)} />
                        <button onClick={() => clientsInputRef.current.click()} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 text-sm text-rose-400">
                            <Upload size={18} /> {clientFiles ? `${clientFiles.length} Images Ready` : "Upload Client Photos"}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ManageHero;