import React, { useState, useEffect } from 'react';
import { axiosPrivate, axiosPublic } from '../../api/axios';
import { Upload, Trash2, Loader2, Save, Image as ImageIcon, Plus } from 'lucide-react';

const ManageTrustedBy = () => {
    const [data, setData] = useState({
        topText: '',
        badgeText: '',
        heading: '',
        logos: [], // URLs from DB
        sideImage: ''
    });
    
    // Naye files handle karne ke liye alag states
    const [newLogos, setNewLogos] = useState([]); 
    const [newSideImage, setNewSideImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosPublic.get('/trusted-by');
                if (res.data) setData(res.data);
            } catch (err) { console.error(err); }
            finally { setFetching(false); }
        };
        fetchData();
    }, []);

    // ✅ Naye logos add karne ka function
    const handleLogoSelect = (e) => {
        const files = Array.from(e.target.files);
        setNewLogos((prev) => [...prev, ...files]);
    };

    // ✅ Kisi bhi logo ko temporary list se remove karna
    const removeNewLogo = (index) => {
        setNewLogos((prev) => prev.filter((_, i) => i !== index));
    };

    // ✅ Database wale purane logos ko remove karna
    const removeExistingLogo = (url) => {
        setData((prev) => ({
            ...prev,
            logos: prev.logos.filter((l) => l !== url)
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('topText', data.topText);
        formData.append('badgeText', data.badgeText);
        formData.append('heading', data.heading);

        // Purane bache hue logos (string array)
        formData.append('existingLogos', JSON.stringify(data.logos));

        // Nayi files
        if (newSideImage) formData.append('sideImage', newSideImage);
        newLogos.forEach(file => formData.append('logos', file));

        try {
            await axiosPrivate.put('/trusted-by', formData);
            alert("Trusted By Section Updated!");
            window.location.reload();
        } catch (err) { alert("Error updating data"); }
        finally { setLoading(false); }
    };

    if (fetching) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-500" size={40} /></div>;

    return (
        <div className="min-h-screen text-white p-4 lg:p-8 font-['Manrope']">
            <h1 className="text-3xl font-black italic uppercase mb-8 text-blue-400 tracking-tighter">Manage Trusted By Section</h1>

            <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Text Fields Section */}
                <div className="space-y-6 bg-[#111827] p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-gray-500 ml-2 tracking-widest">Top Slider Text</label>
                        <input type="text" value={data.topText} onChange={(e) => setData({...data, topText: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all font-medium"/>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-gray-500 ml-2 tracking-widest">Badge Text</label>
                        <input type="text" value={data.badgeText} onChange={(e) => setData({...data, badgeText: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all font-medium"/>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-gray-500 ml-2 tracking-widest">Heading</label>
                        <textarea value={data.heading} onChange={(e) => setData({...data, heading: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none h-32 resize-none focus:border-blue-500 transition-all font-medium"/>
                    </div>

                    <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl disabled:opacity-50">
                        {loading ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Update All Data</>}
                    </button>
                </div>

                <div className="space-y-8">
                    {/* Side Image Replacement */}
                    <div className="bg-[#111827] p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><ImageIcon size={20} className="text-blue-400"/> Side Image (Preview)</h3>
                        <div className="flex items-center gap-6">
                            <img src={newSideImage ? URL.createObjectURL(newSideImage) : data.sideImage} className="w-32 h-32 object-contain bg-black/40 rounded-2xl border border-white/10 p-2" alt="Preview" />
                            <label className="cursor-pointer bg-white/5 hover:bg-white/10 border border-dashed border-white/20 p-6 rounded-2xl flex-grow text-center transition-all group">
                                <Upload className="mx-auto mb-2 text-blue-400 group-hover:scale-110 transition-transform" />
                                <span className="text-xs text-gray-400">Replace Main Image</span>
                                <input type="file" className="hidden" onChange={(e) => setNewSideImage(e.target.files[0])} />
                            </label>
                        </div>
                    </div>

                    {/* ✅ LOGOS MANAGEMENT WITH HORIZONTAL SCROLL */}
                    <div className="bg-[#111827] p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold">Partner Logos</h3>
                            <label className="cursor-pointer bg-blue-600 hover:bg-blue-500 p-2 px-4 rounded-xl transition-all shadow-lg flex items-center gap-2 text-xs font-bold uppercase tracking-tighter">
                                <Plus size={16} /> Add More
                                <input type="file" multiple className="hidden" onChange={handleLogoSelect} />
                            </label>
                        </div>
                        
                        {/* Scroll Container */}
                        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar flex-nowrap items-center">
                            {/* Purane Logos (From Database) */}
                            {data.logos.map((logo, idx) => (
                                <div key={`old-${idx}`} className="relative group shrink-0 w-24 h-24 bg-white rounded-xl p-2 flex items-center justify-center shadow-lg border-2 border-transparent hover:border-blue-500 transition-all">
                                    <img src={logo} className="max-h-full object-contain" alt="Logo" />
                                    <button type="button" onClick={() => removeExistingLogo(logo)} className="absolute -top-2 -right-2 p-1.5 bg-red-600 text-white rounded-full opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity z-30 shadow-md">
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            ))}

                            {/* Naye selected logos (Pending Upload) */}
                            {newLogos.map((file, idx) => (
                                <div key={`new-${idx}`} className="relative group shrink-0 w-24 h-24 bg-blue-500/10 border border-blue-500/30 rounded-xl p-2 flex items-center justify-center shadow-lg">
                                    <img src={URL.createObjectURL(file)} className="max-h-full object-contain opacity-60" alt="New Logo" />
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <span className="text-[8px] font-black text-blue-400 uppercase bg-black/40 px-1 rounded">New</span>
                                    </div>
                                    <button type="button" onClick={() => removeNewLogo(idx)} className="absolute -top-2 -right-2 p-1.5 bg-red-600 text-white rounded-full z-30 shadow-md">
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Custom Scrollbar Styles */}
                        <style dangerouslySetInnerHTML={{ __html: `
                            .custom-scrollbar::-webkit-scrollbar {
                                height: 6px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-track {
                                background: rgba(255, 255, 255, 0.05);
                                border-radius: 10px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-thumb {
                                background: rgba(59, 130, 246, 0.4);
                                border-radius: 10px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                                background: rgba(59, 130, 246, 0.7);
                            }
                        `}} />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ManageTrustedBy;