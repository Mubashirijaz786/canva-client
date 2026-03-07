import React, { useState, useEffect, useRef } from 'react';
import { axiosPrivate, axiosPublic } from '../../api/axios';
import { Upload, Video, Save, Loader2, Image as ImageIcon, X, PlayCircle } from 'lucide-react';

const ManageHero = () => {
  const [heroData, setHeroData] = useState({
    badgeText: '', heading: '', description: '', happyClientsCount: '', statsText: '',
    videoUrl: '', clientImages: []
  });

  const [videoPreview, setVideoPreview] = useState(null);
  const [clientPreviews, setClientPreviews] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [clientFiles, setClientFiles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const videoInputRef = useRef();
  const clientsInputRef = useRef();

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axiosPublic.get('/hero');
        setHeroData(res.data);
        setClientPreviews(res.data.clientImages || []);
        setVideoPreview(res.data.videoUrl || null);
      } catch {
        alert("Failed to fetch data.");
      } finally {
        setFetching(false);
      }
    };
    fetchHero();
  }, []);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleClientImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (clientPreviews.length + files.length > 3) {
      alert("Bhai, sirf 3 images allow hain!");
      return;
    }
    setClientFiles((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setClientPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    const urlToRemove = clientPreviews[index];
    setClientPreviews((prev) => prev.filter((_, i) => i !== index));

    if (!urlToRemove.startsWith('http')) {
      const previewIndexInFiles = clientPreviews
        .filter((url) => !url.startsWith('http'))
        .indexOf(urlToRemove);
      setClientFiles((prev) => prev.filter((_, i) => i !== previewIndexInFiles));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('badgeText', heroData.badgeText);
    formData.append('heading', heroData.heading);
    formData.append('description', heroData.description);
    formData.append('happyClientsCount', heroData.happyClientsCount);
    formData.append('statsText', heroData.statsText);

    if (videoFile) {
      formData.append('video', videoFile);
    } else if (!videoPreview && heroData.videoUrl) {
      formData.append('videoDeleted', 'true');
    }

    const keptExistingImages = clientPreviews.filter((url) => url.startsWith('http'));
    formData.append('existingImages', JSON.stringify(keptExistingImages));

    clientFiles.forEach((file) => {
      formData.append('clientImages', file);
    });

    try {
      const res = await axiosPrivate.put('/hero', formData);
      setHeroData(res.data);
      setClientPreviews(res.data.clientImages);
      setVideoPreview(res.data.videoUrl);
      setVideoFile(null);
      setClientFiles([]);
      alert("Hero Section Updated!");
    } catch {
      alert("Failed to update.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-blue-500" size={40} /></div>;

  return (
    <div className="min-h-screen text-white font-['Manrope'] pb-20 px-4">
      <div className="mb-10">
        <h1 className="text-3xl font-black italic uppercase tracking-tighter">Hero Section Manager</h1>
        <p className="text-gray-500 text-sm italic">Max 3 images. Video preview enabled.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <form onSubmit={handleUpdate} className="lg:col-span-7 space-y-6 bg-[#111827] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase font-black ml-2">Badge Text</label>
              <input type="text" value={heroData.badgeText} onChange={(e) => setHeroData({ ...heroData, badgeText: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase font-black ml-2">Happy Clients Count</label>
              <input type="text" value={heroData.happyClientsCount} onChange={(e) => setHeroData({ ...heroData, happyClientsCount: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-gray-500 uppercase font-black ml-2">Main Heading</label>
            <textarea value={heroData.heading} onChange={(e) => setHeroData({ ...heroData, heading: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 text-xl font-bold h-24 resize-none whitespace-pre-wrap" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-gray-500 uppercase font-black ml-2">Sub-Description</label>
            <textarea value={heroData.description} onChange={(e) => setHeroData({ ...heroData, description: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 text-gray-400 text-sm h-24 resize-none whitespace-pre-wrap" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-gray-500 uppercase font-black ml-2">Stats Teaser Text</label>
            <textarea value={heroData.statsText} onChange={(e) => setHeroData({ ...heroData, statsText: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 text-xs h-20 resize-none" />
          </div>

          <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl">
            {loading ? <Loader2 className="animate-spin" size={24} /> : <><Save size={20} /> Save Changes</>}
          </button>
        </form>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#111827] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative">
            <h3 className="text-sm font-black uppercase text-gray-500 mb-4 flex items-center gap-2"><Video size={16} /> Background Video</h3>
            <div className="aspect-video rounded-3xl overflow-hidden bg-black/40 border border-white/5 mb-4 relative group">
              {videoPreview ? (
                <>
                  <video key={videoPreview} src={videoPreview} className="w-full h-full object-cover" autoPlay loop muted />
                  <button type="button" onClick={() => { setVideoPreview(null); setVideoFile(null); }} className="absolute top-4 right-4 p-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    <X size={16} />
                  </button>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 gap-2">
                  <PlayCircle size={40} />
                  <span className="text-xs uppercase font-bold">No Video Selected</span>
                </div>
              )}
            </div>
            <input type="file" accept="video/*" ref={videoInputRef} className="hidden" onChange={handleVideoChange} />
            <button type="button" onClick={() => videoInputRef.current.click()} className="w-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
              <Upload size={18} /> {videoPreview ? "Change Video" : "Upload Video"}
            </button>
          </div>

          <div className="bg-[#111827] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
            <h3 className="text-sm font-black uppercase text-gray-500 mb-4 flex items-center gap-2"><ImageIcon size={16} /> Client Avatars ({clientPreviews.length}/3)</h3>
            <div className="grid grid-cols-4 gap-3 mb-6">
              {clientPreviews.map((img, i) => (
                <div key={i} className="relative aspect-square group">
                  <img src={img} className="w-full h-full rounded-2xl border border-white/10 object-cover shadow-lg" alt="client" />
                  <button type="button" onClick={() => removeImage(i)} className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
                    <X size={12} />
                  </button>
                </div>
              ))}
              {clientPreviews.length < 3 && (
                <button type="button" onClick={() => clientsInputRef.current.click()} className="aspect-square rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-gray-600 hover:border-blue-500/50 hover:text-blue-500 transition-all bg-white/5">
                  <Upload size={20} />
                  <span className="text-[10px] mt-1 font-bold">ADD</span>
                </button>
              )}
            </div>
            <input type="file" multiple accept="image/*" ref={clientsInputRef} className="hidden" onChange={handleClientImagesChange} />
            <p className="text-[10px] text-gray-500 text-center italic font-bold">Max 3 images allowed.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageHero;