import React, { useState } from 'react';
import { axiosPrivate } from '../../api/axios';
import { Download, FileJson, Loader2, ShieldCheck } from 'lucide-react';

const SitemapGenerator = () => {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        try {
            const response = await axiosPrivate.get('/sitemap/generate-full', {
                responseType: 'blob', 
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `sitemap-canvasolutions-${new Date().toISOString().split('T')[0]}.xml`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            alert("Master generation failed. Check server logs.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10 bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-blue-500/20 rounded-3xl text-blue-400">
                        <ShieldCheck size={40} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter">Global SEO Engine</h2>
                        <p className="text-blue-500 font-bold text-xs uppercase tracking-widest">Master XML Control Panel</p>
                    </div>
                </div>

                <p className="text-gray-400 max-w-xl mb-10 leading-relaxed">
                    This button will generate a comprehensive sitemap.xml for the entire Canva Solutions website 
                </p>

                <button 
                    onClick={handleDownload}
                    disabled={loading}
                    className="group relative bg-blue-600 hover:bg-blue-500 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest flex items-center gap-4 transition-all active:scale-95 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Download size={24} />}
                    {loading ? "Scanning Models..." : "Download Full Sitemap"}
                </button>
            </div>
        </div>
    );
};

export default SitemapGenerator;