import React, { useState, useEffect } from 'react';
import { Code2, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { axiosPublic } from '../../api/axios';
import { PAGE_DEFAULTS } from '../../data/pageDefaults'; 

import ServiceLayout from './ServiceLayout';
import PrimaryButton from '../common/PrimaryButton';
import MetaData from '../common/MetaData';
import DynamicIcon from '../common/DynamicIcon';
import { useGlobalSettings } from '../../hooks/useGlobalSettings';

// ✅ IMPORT LOCAL IMAGE
import webHero from '../../assets/images/web.webp';

const WebDevelopment = () => {
    const { calendlyLink } = useGlobalSettings(); // ✅ Global dynamic link
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    const defaults = PAGE_DEFAULTS['web-development'];

    useEffect(() => {
        const fetchPageContent = async () => {
            try {
                const res = await axiosPublic.get('/service-pages/web-development');
                setPageData(res.data);
            } catch (err) {
                console.log("Using default content: No dynamic data found.");
            } finally {
                setLoading(false);
            }
        };
        fetchPageContent();
        window.scrollTo(0, 0);
    }, []);

    const d = (key, defaultValue = "") => pageData?.[key] || defaults?.[key] || defaultValue;

    const techStack = [
        { name: "React.js", icon: "⚛️" },
        { name: "Next.js", icon: "▲" },
        { name: "Node.js", icon: "🟢" },
        { name: "Tailwind CSS", icon: "🎨" },
        { name: "PostgreSQL", icon: "🐘" },
        { name: "TypeScript", icon: "📘" }
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold uppercase tracking-wider mb-8">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                            {d('badgeText')}
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold font-['Manrope'] mb-6 leading-[1.1] text-white">
                            {d('heroTitle')} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">{d('heroSubtitle')}</span>
                        </h1>
                        <p className="text-gray-400 text-xl leading-relaxed mb-10 max-w-xl">{d('heroDescription')}</p>
                        
                        <div className="flex flex-wrap gap-4">
                            <a href={calendlyLink} target="_blank" rel="noopener noreferrer">
                                <PrimaryButton className="!px-8 !py-4 text-lg">
                                    Start Your Project
                                </PrimaryButton>
                            </a>
                            <Link to="/portfolio">
                                <button className="px-8 py-4 rounded-xl border border-white/20 text-white font-medium hover:bg-white hover:text-black transition-all">
                                    View Our Work
                                </button>
                            </Link>
                        </div>

                        <div className="mt-12 flex gap-8 border-t border-white/10 pt-8">
                            <div>
                                <h4 className="text-3xl font-bold text-white">99.9%</h4>
                                <p className="text-gray-500 text-sm">Uptime Guaranteed</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold text-white">&lt;1s</h4>
                                <p className="text-gray-500 text-sm">Load Time</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/30 to-cyan-600/30 rounded-[2.5rem] blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-1000"></div>
                        <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-[#0f172a]">
                            <img src={d('heroImage', webHero)} alt="Web Hero" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000" />
                            <div className="absolute bottom-8 right-8 bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4 shadow-xl">
                                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-black"><Code2 size={24} fill="black" /></div>
                                <div>
                                    <p className="text-gray-400 text-xs font-bold uppercase">Code Quality</p>
                                    <p className="text-white text-xl font-bold">Clean & Modular</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 2. TECH STACK --- */}
            <section className="py-16 bg-[#0f172a] border-y border-white/5">
                <div className="container mx-auto px-6 lg:px-16 max-w-[1400px]">
                    <p className="text-center text-gray-400 font-medium mb-8">POWERED BY NEXT-GEN TECHNOLOGY</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {techStack.map((tech, idx) => (
                            <div key={idx} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                                <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">{tech.icon}</span>
                                <h3 className="text-sm font-bold text-white text-center">{tech.name}</h3>
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
                        {(pageData?.contentItems || defaults?.contentItems || []).map((item, idx) => (
                            <div key={idx} className="group p-10 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 hover:border-blue-500/30 hover:-translate-y-2 transition-all duration-300">
                                <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 transition-transform">
                                    <DynamicIcon name={item.iconName} size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 4. PROCESS SECTION --- */}
            <section className="py-24 bg-gradient-to-b from-[#020617] to-[#0f172a] relative overflow-hidden">
                <div className="container mx-auto px-6 lg:px-16 max-w-[1200px] relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        
                        {/* LEFT SIDE: Lifecycle (Using 'reasons' array for Title/Desc) */}
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-8">{d('reasonsTitle')}</h2>
                            <div className="space-y-6">
                                {(pageData?.reasons || defaults?.reasons || []).map((item, i) => (
                                    <div key={i} className="flex gap-6">
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 rounded-full bg-blue-500 text-black font-bold flex items-center justify-center shrink-0">
                                                {i + 1}
                                            </div>
                                            {i !== (pageData?.reasons || defaults?.reasons || []).length - 1 && <div className="w-0.5 h-full bg-white/10 my-2"></div>}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                            <p className="text-gray-400">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT SIDE: Glow Box (Using 'checklist' array for simple points) */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/20 blur-[80px]"></div>
                            <div className="relative p-8 rounded-3xl bg-[#020617] border border-blue-500/30 shadow-2xl">
                                <h3 className="text-2xl font-bold text-white mb-6">{d('checklistTitle')}</h3>
                                <ul className="space-y-5">
                                    {(pageData?.checklist || defaults?.checklist || []).map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-white font-medium">
                                            <CheckCircle2 className="text-blue-500 shrink-0" /> {item}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-10 pt-8 border-t border-white/10">
                                    <a href={calendlyLink} target="_blank" rel="noopener noreferrer">
                                        <PrimaryButton className="w-full justify-center !py-4 text-lg">Get a Technical Audit</PrimaryButton>
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
                        {(pageData?.faqs || defaults?.faqs || []).map((faq, idx) => (
                            <details key={idx} className="group bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                                <summary className="flex justify-between items-center p-6 cursor-pointer text-lg font-bold text-white hover:text-blue-400 transition-colors">
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

export default WebDevelopment;