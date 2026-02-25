import React, { useState, useEffect } from 'react';
import { axiosPrivate } from '../../api/axios';
import { Plus, Trash2, Loader2, HelpCircle } from 'lucide-react';

const ManageFAQs = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ question: '', answer: '', order: 0 });

    useEffect(() => {
        fetchFAQs();
    }, []);

    const fetchFAQs = async () => {
        try {
            const res = await axiosPrivate.get('/faqs');
            setFaqs(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axiosPrivate.post('/faqs', formData);
            setFormData({ question: '', answer: '', order: 0 });
            fetchFAQs();
        } catch (err) { alert("Error adding FAQ"); }
        finally { setIsSubmitting(false); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this FAQ?")) return;
        try {
            await axiosPrivate.delete(`/faqs/${id}`);
            setFaqs(faqs.filter(f => f._id !== id));
        } catch (err) { alert("Error deleting FAQ"); }
    };

    if (loading) return <div className="h-screen flex items-center justify-center text-white"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-10 pb-20 text-white">
            <h1 className="text-3xl font-black italic tracking-tight uppercase">Manage FAQs</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* --- ADD NEW FAQ FORM --- */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] h-fit sticky top-24">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Plus size={20} className="text-blue-500" /> Add New Question
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase ml-2">Question</label>
                            <input 
                                type="text" required
                                className="w-full bg-white/5 border-none outline-none p-4 rounded-xl focus:ring-2 ring-blue-500/50 mt-1"
                                value={formData.question}
                                onChange={(e) => setFormData({...formData, question: e.target.value})}
                                placeholder="How do I..."
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase ml-2">Answer</label>
                            <textarea 
                                required rows="4"
                                className="w-full bg-white/5 border-none outline-none p-4 rounded-xl focus:ring-2 ring-blue-500/50 mt-1 resize-none"
                                value={formData.answer}
                                onChange={(e) => setFormData({...formData, answer: e.target.value})}
                                placeholder="We provide..."
                            ></textarea>
                        </div>
                        <button 
                            disabled={isSubmitting}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Save FAQ'}
                        </button>
                    </form>
                </div>

                {/* --- FAQ LIST --- */}
                <div className="lg:col-span-2 space-y-4">
                    {faqs.map((faq) => (
                        <div key={faq._id} className="bg-white/[0.02] border border-white/10 p-6 rounded-3xl flex justify-between items-start group hover:bg-white/[0.05] transition-all">
                            <div className="space-y-2">
                                <h4 className="font-bold text-lg text-blue-400">{faq.question}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                            </div>
                            <button 
                                onClick={() => handleDelete(faq._id)}
                                className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageFAQs;