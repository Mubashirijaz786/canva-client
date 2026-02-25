import React, { useState, useEffect } from 'react';
import { axiosPrivate, axiosPublic } from '../../api/axios';
import { Save, Loader2, Phone, Mail, MapPin, Share2, Plus, Trash2, Calendar, MessageCircle } from 'lucide-react';

const ManageSettings = () => {
    const [config, setConfig] = useState({
        emails: [''], phones: [''], addresses: [''],
        facebook: '', instagram: '', linkedin: '', upwork: '', copyright: '',
        calendlyLink: '', whatsappNumber: '' , whatsappMessage: '', // ✅ Added for Global Links
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axiosPublic.get('/settings').then(res => {
            if (res.data) {
                setConfig({
                    ...res.data,
                    emails: Array.isArray(res.data.emails) ? res.data.emails : [res.data.email || ''],
                    phones: Array.isArray(res.data.phones) ? res.data.phones : [res.data.phone || ''],
                    addresses: Array.isArray(res.data.addresses) ? res.data.addresses : [res.data.address || ''],
                    calendlyLink: res.data.calendlyLink || '',
                    whatsappNumber: res.data.whatsappNumber || '',
                    whatsappMessage: res.data.whatsappMessage || ''
                    
                });
            }
        });
    }, []);

    const addField = (field) => setConfig({ ...config, [field]: [...config[field], ''] });

    const removeField = (field, index) => {
        const updated = config[field].filter((_, i) => i !== index);
        setConfig({ ...config, [field]: updated.length > 0 ? updated : [''] });
    };

    const handleArrayChange = (field, index, val) => {
        const updated = [...config[field]];
        updated[index] = val;
        setConfig({ ...config, [field]: updated });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosPrivate.put('/settings', config);
            alert("✅ Site Ecosystem & Global Links Updated!");
        } catch (err) { 
            alert("❌ Update Failed"); 
        } finally { 
            setLoading(false); 
        }
    };

    return (
        <div className="max-w-5xl animate-in fade-in duration-500 pb-20 px-4">
            <h1 className="text-3xl font-black italic text-white mb-8">Ecosystem Settings</h1>
            
            <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* --- ✅ NEW: GLOBAL LINKS SECTION (Calendly & WhatsApp) --- */}
                <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-white/10 p-8 rounded-[2.5rem] space-y-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <Share2 size={120} />
                    </div>
                    
                    <h3 className="flex items-center gap-2 text-green-400 font-bold uppercase text-xs tracking-widest">
                        <Share2 size={16}/> Global Conversion Links
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 font-black uppercase flex items-center gap-2 ml-1">
                                <Calendar size={12} className="text-blue-400"/> Calendly Booking URL
                            </label>
                            <input 
                                type="text" 
                                value={config.calendlyLink} 
                                onChange={e => setConfig({...config, calendlyLink: e.target.value})} 
                                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-blue-500 transition-all"
                                placeholder="https://calendly.com/your-profile" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 font-black uppercase flex items-center gap-2 ml-1">
                                <MessageCircle size={12} className="text-green-400"/> WhatsApp Number
                            </label>
                            <input 
                                type="text" 
                                value={config.whatsappNumber} 
                                onChange={e => setConfig({...config, whatsappNumber: e.target.value})} 
                                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-green-500 transition-all"
                                placeholder="e.g. 923123456789" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 font-black uppercase flex items-center gap-2 ml-1">
                                <MessageCircle size={12} className="text-green-400"/> WhatsApp Message
                            </label>
                            <input 
                                type="text" 
                                value={config.whatsappMessage} 
                                onChange={e => setConfig({...config, whatsappMessage: e.target.value})} 
                                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-green-500 transition-all"
                                placeholder="e.g. Hello! I'm interested in your services." 
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Multi-Contact Section */}
                    <div className="p-8 bg-white/[0.03] border border-white/10 rounded-[2.5rem] space-y-6">
                        <h3 className="flex items-center gap-2 text-blue-400 font-bold uppercase text-xs tracking-widest"><Phone size={16}/> Business Contacts</h3>
                        
                        <div className="space-y-3">
                            <label className="text-[10px] text-gray-500 font-black uppercase">Phone Numbers</label>
                            {config.phones.map((p, i) => (
                                <div key={i} className="flex gap-2">
                                    <input type="text" value={p} onChange={e => handleArrayChange('phones', i, e.target.value)} className="flex-grow bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-blue-500 text-sm" />
                                    <button type="button" onClick={() => removeField('phones', i)} className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition-all"><Trash2 size={18}/></button>
                                </div>
                            ))}
                            <button type="button" onClick={() => addField('phones')} className="text-blue-500 text-xs font-bold flex items-center gap-1 hover:underline"><Plus size={14}/> Add Phone</button>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] text-gray-500 font-black uppercase">Emails</label>
                            {config.emails.map((m, i) => (
                                <div key={i} className="flex gap-2">
                                    <input type="email" value={m} onChange={e => handleArrayChange('emails', i, e.target.value)} className="flex-grow bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-blue-500 text-sm" />
                                    <button type="button" onClick={() => removeField('emails', i)} className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition-all"><Trash2 size={18}/></button>
                                </div>
                            ))}
                            <button type="button" onClick={() => addField('emails')} className="text-blue-500 text-xs font-bold flex items-center gap-1 hover:underline"><Plus size={14}/> Add Email</button>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] text-gray-500 font-black uppercase">Locations</label>
                            {config.addresses.map((a, i) => (
                                <div key={i} className="flex gap-2">
                                    <textarea value={a} onChange={e => handleArrayChange('addresses', i, e.target.value)} className="flex-grow bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none h-20 text-sm resize-none" />
                                    <button type="button" onClick={() => removeField('addresses', i)} className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition-all"><Trash2 size={18}/></button>
                                </div>
                            ))}
                            <button type="button" onClick={() => addField('addresses')} className="text-blue-500 text-xs font-bold flex items-center gap-1 hover:underline"><Plus size={14}/> Add Location</button>
                        </div>
                    </div>

                    {/* Socials Section */}
                    <div className="p-8 bg-white/[0.03] border border-white/10 rounded-[2.5rem] space-y-4">
                        <h3 className="flex items-center gap-2 text-purple-400 font-bold uppercase text-xs tracking-widest"><Share2 size={16}/> Social Presence</h3>
                        <div className="space-y-4">
                            {['facebook', 'instagram', 'linkedin', 'upwork', 'copyright'].map((field) => (
                                <div key={field} className="space-y-1">
                                    <label className="text-[10px] text-gray-500 font-black uppercase ml-1">{field}</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-purple-500 text-sm" 
                                        value={config[field]} 
                                        onChange={e => setConfig({...config, [field]: e.target.value})} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <button disabled={loading} className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 text-white px-12 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs flex items-center gap-3 shadow-xl active:scale-95 transition-all">
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20}/> Push Updates</>}
                </button>
            </form>
        </div>
    );
};

export default ManageSettings;