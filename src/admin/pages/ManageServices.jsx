import React, { useState, useEffect } from 'react';
import { axiosPrivate, axiosPublic } from '../../api/axios';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';
import IconPicker from '../layouts/IconPicker'; // ✅ Aapka IconPicker use ho raha hai

const ManageServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axiosPublic.get('/services').then(res => setServices(res.data || []));
    }, []);

    const addService = () => setServices([...services, { title: '', desc: '', iconName: 'Code', link: '/services', color: 'blue' }]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('services', JSON.stringify(services));

        try {
            await axiosPrivate.put('/services', formData);
            alert("✅ Services Updated!");
        } catch (err) { alert("❌ Error!"); }
        finally { setLoading(false); }
    };

    return (
        <div className="max-w-5xl pb-20 text-white font-['Manrope']">
            <h1 className="text-3xl font-black italic mb-8 uppercase text-blue-500">Manage Services Grid</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {services.map((service, i) => (
                    <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-4 relative group">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder="Title" className="bg-white/5 p-4 rounded-xl border border-white/10 outline-none" value={service.title} onChange={e => {
                                const up = [...services]; up[i].title = e.target.value; setServices(up);
                            }} />
                            <IconPicker selectedIcon={service.iconName} onChange={(icon) => {
                                const up = [...services]; up[i].iconName = icon; setServices(up);
                            }} />
                        </div>
                        <textarea placeholder="Description" className="w-full bg-white/5 p-4 rounded-xl border border-white/10 outline-none h-24 resize-none" value={service.desc} onChange={e => {
                            const up = [...services]; up[i].desc = e.target.value; setServices(up);
                        }} />
                        <button type="button" onClick={() => setServices(services.filter((_, idx) => idx !== i))} className="text-red-500 absolute top-4 right-4"><Trash2 size={20}/></button>
                    </div>
                ))}
                
                <div className="flex gap-4">
                    <button type="button" onClick={addService} className="flex items-center gap-2 bg-white/5 px-6 py-4 rounded-xl border border-white/10"><Plus size={20}/> Add Card</button>
                    <button className="bg-blue-600 px-10 py-4 rounded-xl font-bold flex items-center gap-2">
                        {loading ? <Loader2 className="animate-spin"/> : <><Save size={20}/> Publish Changes</>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ManageServices;