import React, { useState, useEffect } from 'react';
import { Zap, CheckCircle2, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { axiosPublic } from '../../api/axios';
import { PAGE_DEFAULTS } from '../../data/pageDefaults';

import ServiceLayout from '../../components/services/ServiceLayout';
import PrimaryButton from '../../components/common/PrimaryButton';
import MetaData from '../../components/common/MetaData';
import DynamicIcon from '../../components/common/DynamicIcon'; // ✅ Global Icon Helper
import ecommerceHero from '../../assets/images/E-commerce.webp'; 
import { useGlobalSettings } from '../../hooks/useGlobalSettings';

const Ecommerce = () => {
    const { calendlyLink } = useGlobalSettings(); 
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    const defaults = PAGE_DEFAULTS['e-commerce'];

    useEffect(() => {
        const fetchPageContent = async () => {
            try {
                const res = await axiosPublic.get('/service-pages/e-commerce');
                setPageData(res.data);
            } catch (err) {
                console.log("Using default E-commerce content.");
            } finally {
                setLoading(false);
            }
        };
        fetchPageContent();
        window.scrollTo(0, 0);
    }, []);

    const d = (key, fallback = "") => pageData?.[key] || defaults?.[key] || fallback;

    const platforms = [
        { name: "Shopify Plus", logo: "🛍️", desc: "Best for scalable D2C brands." },
        { name: "WooCommerce", logo: "📦", desc: "Flexible & customizable for WordPress." },
        { name: "Magento", logo: "🟧", desc: "Enterprise-level power & complexity." },
        { name: "Custom MERN", logo: "⚛️", desc: "Total control with React & Node.js." }
    ];


    return (
        <ServiceLayout>
            <MetaData 
                title={d('metaTitle')} 
                description={d('metaDescription')}
                keywords={d('metaKeywords')}
            />
            
            {/* --- 1. HERO SECTION --- */}
            <section className="relative pt-24 pb-32 px-6 lg:px-16 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/5 blur-[150px] pointer-events-none"></div>
                <div className="container mx-auto max-w-[1400px] relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-bold uppercase tracking-wider mb-8">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            {d('badgeText')}
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold font-['Manrope'] mb-6 leading-[1.1] text-white">
                            {d('heroTitle')} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">{d('heroSubtitle')}</span>
                        </h1>
                        <p className="text-gray-400 text-xl leading-relaxed mb-10 max-w-xl">{d('heroDescription')}</p>
                        <div className="flex flex-wrap gap-4">
                            <a href={calendlyLink} target="_blank" rel="noopener noreferrer">
                                <PrimaryButton className="!px-8 !py-4 text-lg">Build My Store</PrimaryButton>
                            </a>
                            <Link to="/portfolio">
                                <button className="px-8 py-4 rounded-xl border border-white/20 text-white font-medium hover:bg-white hover:text-black transition-all">View Case Studies</button>
                            </Link>
                        </div>
                        <div className="mt-12 flex gap-8 border-t border-white/10 pt-8">
                            <div><h4 className="text-3xl font-bold text-white">200+</h4><p className="text-gray-500 text-sm">Stores Launched</p></div>
                            <div><h4 className="text-3xl font-bold text-white">$50M+</h4><p className="text-gray-500 text-sm">Revenue Generated</p></div>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-br from-green-600/30 to-blue-600/30 rounded-[2.5rem] blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-1000"></div>
                        <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-[#0f172a]">
                            <img src={d('heroImage', ecommerceHero)} alt="E-commerce Hero" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000" />
                            <div className="absolute bottom-8 right-8 bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4 shadow-xl">
                                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-black"><Zap size={24} fill="black" /></div>
                                <div>
                                    <p className="text-gray-400 text-xs font-bold uppercase">Conversion Rate</p>
                                    <p className="text-white text-xl font-bold">+145%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 2. PLATFORMS SECTION --- */}
            <section className="py-16 bg-[#0f172a] border-y border-white/5">
                <div className="container mx-auto px-6 lg:px-16 max-w-[1400px]">
                    <p className="text-center text-gray-400 font-medium mb-8 uppercase tracking-widest">Powering Stores on Top Platforms</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {platforms.map((plat, idx) => (
                            <div key={idx} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-center">
                                <span className="text-4xl mb-3">{plat.logo}</span>
                                <h3 className="text-lg font-bold text-white">{plat.name}</h3>
                                <p className="text-xs text-gray-500 mt-1">{plat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 3. OFFERINGS --- */}
            <section className="py-32 px-6 lg:px-16">
                <div className="container mx-auto max-w-[1400px]">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">{d('offeringsTitle')}</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">{d('offeringsSubtitle')}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(pageData?.contentItems || defaults.contentItems).map((item, idx) => (
                            <div key={idx} className="group p-10 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 hover:border-green-500/30 hover:-translate-y-2 transition-all duration-300">
                                <div className="w-14 h-14 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 mb-8 group-hover:scale-110 transition-transform">
                                    <DynamicIcon name={item.iconName} size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 4. PROBLEM vs SOLUTION --- */}
            <section className="py-24 bg-gradient-to-b from-[#020617] to-[#0f172a] relative overflow-hidden">
                <div className="container mx-auto px-6 lg:px-16 max-w-[1200px] relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-8">{d('reasonsTitle')}</h2>
                            <div className="space-y-6">
                                {(pageData?.reasons || defaults.reasons).map((reason, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                                        <div className="text-red-500 mt-1">✕</div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg">{reason.title}</h4>
                                            <p className="text-gray-400 text-sm">{reason.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-green-500/20 blur-[80px]"></div>
                            <div className="relative p-8 rounded-3xl bg-[#020617] border border-green-500/30 shadow-2xl">
                                <h3 className="text-2xl font-bold text-white mb-6">{d('checklistTitle')}</h3>
                                <ul className="space-y-5">
                                    {(pageData?.checklist || defaults.checklist).map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-white font-medium">
                                            <CheckCircle2 className="text-green-500 shrink-0" /> {item}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-10 pt-8 border-t border-white/10">
                                    <a href={calendlyLink} target="_blank" rel="noopener noreferrer">
                                        <PrimaryButton className="w-full justify-center !py-4 text-lg">Scale Your Revenue</PrimaryButton>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 5. FAQ SECTION --- */}
            <section className="py-24 px-6 lg:px-16 pb-32">
                <div className="container mx-auto max-w-[1000px]">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {(pageData?.faqs || defaults.faqs).map((faq, idx) => (
                            <details key={idx} className="group bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                                <summary className="flex justify-between items-center p-6 cursor-pointer text-lg font-bold text-white hover:text-green-400 transition-colors">
                                    {faq.question}
                                    <span className="text-2xl transition-transform group-open:rotate-45">+</span>
                                </summary>
                                <div className="px-6 pb-6 text-gray-400 leading-relaxed whitespace-pre-wrap">{faq.answer}</div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
        </ServiceLayout>
    );
};

export default Ecommerce;