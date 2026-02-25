import React, { useState, useEffect } from 'react';
import { TrendingUp, CheckCircle2, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { axiosPublic } from '../../api/axios';
import { PAGE_DEFAULTS } from '../../data/pageDefaults';

import ServiceLayout from '../../components/services/ServiceLayout';
import PrimaryButton from '../../components/common/PrimaryButton';
import MetaData from '../../components/common/MetaData';
import DynamicIcon from '../../components/common/DynamicIcon'; // ✅ Global Icon Helper
import seoHero from '../../assets/images/SEO.webp';
import { useGlobalSettings } from '../../hooks/useGlobalSettings'; // ✅ Global Settings Hook 

const SEO = () => {
    const { calendlyLink } = useGlobalSettings(); // ✅ Use Global Settings Hook
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    const defaults = PAGE_DEFAULTS['seo'];

    // 1. FETCH DYNAMIC CONTENT
    useEffect(() => {
        const fetchPageContent = async () => {
            try {
                const res = await axiosPublic.get('/service-pages/seo');
                setPageData(res.data);
            } catch (err) {
                console.log("Using default SEO content.");
            } finally {
                setLoading(false);
            }
        };
        fetchPageContent();
        window.scrollTo(0, 0);
    }, []);

    // 2. HELPER FUNCTION
    const d = (key, fallback = "") => pageData?.[key] || defaults?.[key] || fallback;

    const tools = [
        { name: "Google Analytics 4", logo: "📊" },
        { name: "Ahrefs", logo: "🟧" },
        { name: "SEMrush", logo: "🦁" },
        { name: "Screaming Frog", logo: "🐸" },
        { name: "Google Search Console", logo: "🔍" },
        { name: "Moz Pro", logo: "Ⓜ️" }
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
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-yellow-600/5 blur-[150px] pointer-events-none"></div>
                <div className="container mx-auto max-w-[1400px] relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-bold uppercase tracking-wider mb-8">
                            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                            {d('badgeText')}
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold font-['Manrope'] mb-6 leading-[1.1] text-white">
                            {d('heroTitle')} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">{d('heroSubtitle')}</span>
                        </h1>
                        <p className="text-gray-400 text-xl leading-relaxed mb-10 max-w-xl">{d('heroDescription')}</p>
                        <div className="flex flex-wrap gap-4">
                            <a href={calendlyLink} target="_blank" rel="noopener noreferrer">
                                <PrimaryButton className="!px-8 !py-4 text-lg">Get Free Audit</PrimaryButton>
                            </a>
                            <Link to="/portfolio">
                                <button className="px-8 py-4 rounded-xl border border-white/20 text-white font-medium hover:bg-white hover:text-black transition-all">View Portfolio</button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-br from-yellow-600/30 to-orange-600/30 rounded-[2.5rem] blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-1000"></div>
                        <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-[#0f172a]">
                            <img src={d('heroImage', seoHero)} alt="SEO Hero" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000" />
                            <div className="absolute bottom-8 right-8 bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4 shadow-xl">
                                <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-black"><TrendingUp size={24} fill="black" /></div>
                                <div>
                                    <p className="text-gray-400 text-xs font-bold uppercase">Organic Traffic</p>
                                    <p className="text-white text-xl font-bold">Exponential Growth</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 2. TOOLS SECTION --- */}
            <section className="py-16 bg-[#0f172a] border-y border-white/5">
                <div className="container mx-auto px-6 lg:px-16 max-w-[1400px]">
                    <p className="text-center text-gray-400 font-medium mb-8 uppercase tracking-widest">Powered by Industry-Leading Data</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {tools.map((tool, idx) => (
                            <div key={idx} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                                <span className="text-3xl mb-3">{tool.logo}</span>
                                <h3 className="text-sm font-bold text-white text-center">{tool.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 3. OFFERINGS (Cards) --- */}
            <section className="py-32 px-6 lg:px-16">
                <div className="container mx-auto max-w-[1400px]">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">{d('offeringsTitle')}</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">{d('offeringsSubtitle')}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(pageData?.contentItems || defaults.contentItems).map((item, idx) => (
                            <div key={idx} className="group p-10 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 hover:border-yellow-500/30 hover:-translate-y-2 transition-all duration-300">
                                <div className="w-14 h-14 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 mb-8 group-hover:scale-110 transition-transform">
                                    {/* ✅ Dynamic Icon Rendering */}
                                    <DynamicIcon name={item.iconName} size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 4. PROCESS & REASONS --- */}
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
                            <div className="absolute inset-0 bg-yellow-500/20 blur-[80px]"></div>
                            <div className="relative p-8 rounded-3xl bg-[#020617] border border-yellow-500/30 shadow-2xl">
                                <h3 className="text-2xl font-bold text-white mb-6">{d('checklistTitle')}</h3>
                                <ul className="space-y-6">
                                    {(pageData?.checklist || defaults.checklist).map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 text-white">
                                            <div className="shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold text-sm">{i + 1}</div>
                                            <div className="text-gray-300 text-sm">{item}</div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-10 pt-8 border-t border-white/10">
                                    <a href={calendlyLink} target="_blank" rel="noopener noreferrer">
                                        <PrimaryButton className="w-full justify-center !py-4 text-lg">Start Ranking Higher</PrimaryButton>
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
                                <summary className="flex justify-between items-center p-6 cursor-pointer text-lg font-bold text-white hover:text-yellow-400 transition-colors">
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

export default SEO;