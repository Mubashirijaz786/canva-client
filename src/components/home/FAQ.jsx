import React, { useState, useEffect } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';
import { axiosPublic } from '../../api/axios'; 

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div 
            onClick={onClick}
            className={`mb-4 rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 ${
                isOpen ? 'bg-white/10 border-blue-500/30' : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
        >
            <div className="w-full flex items-center justify-between p-6">
                <span className="text-lg font-bold text-white pr-8 select-none">{question}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-blue-500 text-white rotate-180' : 'bg-white/10 text-gray-400'
                }`}>
                    <ChevronDown size={18} />
                </div>
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
                <div className="px-6 pb-6 text-gray-400 leading-relaxed">{answer}</div>
            </div>
        </div>
    );
};

const FAQ = () => {
    const [faqs, setFaqs] = useState([]);
    const [openIndex, setOpenIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    // ✅ DATABASE SE FETCH KARO
    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const res = await axiosPublic.get('/faqs');
                setFaqs(res.data);
            } catch (err) {
                console.error("FAQ fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchFAQs();
    }, []);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (loading) return <div className="py-20 text-center"><Loader2 className="animate-spin inline text-blue-500" /></div>;

    return (
        <section className="relative py-24 lg:py-32 bg-[#020617] overflow-hidden">
            <div className="container mx-auto px-6 lg:px-16 max-w-[1400px] relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    <div className="lg:col-span-5 text-left">
                        <div className="sticky top-32">
                            <div className="inline-block border border-blue-500/30 rounded-full px-4 py-2 text-xs font-medium text-blue-400 mb-6 bg-blue-500/10 backdrop-blur-sm">FAQ</div>
                            <h2 className="text-4xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.1]">
                                Got Questions? <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">We’ve Got Answers.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        {faqs.length > 0 ? faqs.map((faq, index) => (
                            <FAQItem 
                                key={faq._id}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                onClick={() => toggleFAQ(index)}
                            />
                        )) : <p className="text-gray-500">No FAQs available yet.</p>}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;