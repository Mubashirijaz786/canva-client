import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { axiosPublic } from '../api/axios'; 

// Import Layout Components
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FinalCTA from '../components/home/FinalCTA';
import WhatsAppButton from '../components/common/WhatsAppButton';
import ScrollToTop from '../components/common/ScrollToTop';
import MetaData from '../components/common/MetaData';

const Portfolio = () => {
    // ✅ DYNAMIC STATES
    const [projects, setProjects] = useState([]);
    const [config, setConfig] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");

    // ✅ FETCH DATA
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projRes, configRes] = await Promise.all([
                    axiosPublic.get('/projects'),
                    axiosPublic.get('/portfolio-config')
                ]);
                setProjects(projRes.data);
                setConfig(configRes.data);
            } catch (err) {
                console.error("Error fetching portfolio data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        window.scrollTo(0, 0);
    }, []);

    const dynamicCategories = ["All", ...new Set(projects.map(p => p.category))];

    const filteredProjects = activeCategory === "All" 
        ? projects 
        : projects.filter(p => p.category === activeCategory);

    return (
        <div className="w-full relative bg-[#020617] min-h-screen text-white selection:bg-blue-500/30">
            
            <MetaData pageName="portfolio" />

            <div className="relative w-full flex items-center justify-center p-2 sm:p-4 z-50">
                <div className="relative z-10 w-full lg:w-[98%] bg-transparent border border-transparent flex flex-col px-4 sm:px-10 lg:px-16 pt-4">
                    <Navbar />
                </div>
            </div>

            <main id="main-content">
                {/* 2. HERO SECTION */}
                <section className="relative pt-20 pb-24 px-6 lg:px-16 overflow-hidden">
                    <div className="absolute inset-0 bg-blue-600/10 blur-[120px] pointer-events-none"></div>
                    
                    <div className="container mx-auto max-w-[1200px] relative z-10 text-center">
                        <div className="inline-block border border-white/10 rounded-full px-5 py-2 text-sm font-medium text-gray-400 mb-8 bg-white/5 backdrop-blur-sm">
                            {config?.badgeText || "Selected Works 2024-2026"}
                        </div>
                        <h1 className="text-5xl lg:text-8xl font-bold font-['Manrope'] mb-8 leading-[1.1] text-white tracking-tight">
                            {config?.heroTitle || "We Don't Just Write Code."} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
                                {config?.herosubtitle || "We Build Legacies."}
                            </span>
                        </h1>
                        <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                            {config?.heroDescription || "Explore a curated selection of our finest work. From enterprise-grade software to award-winning creative campaigns."}
                        </p>
                    </div>
                </section>

                {/* 3. FILTER TABS */}
                <section className="pb-16 px-6 lg:px-16 py-3 lg:py-3">
                    <div className="container mx-auto max-w-[1400px] flex justify-center">
                        <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
                            {dynamicCategories.map((cat, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`
                                        px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300
                                        ${activeCategory === cat 
                                            ? "bg-blue-600 text-white shadow-lg scale-105" 
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                        }
                                    `}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. PROJECTS GRID - No full page blink now */}
                <section className="pb-32 px-6 lg:px-16 min-h-[400px]">
                    <div className="container mx-auto max-w-[1400px]">
                        
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <Loader2 className="animate-spin text-blue-500" size={48} />
                                <p className="text-gray-500 font-medium animate-pulse">Loading amazing projects...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredProjects.map((project) => (
                                    <a 
                                        key={project._id} 
                                        href={project.link || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative rounded-[2rem] bg-[#0f172a] border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl block"
                                    >
                                        <div className="h-[280px] w-full overflow-hidden relative">
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                                            <img 
                                                src={project.image} 
                                                alt={project.title} 
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                                            />
                                            <div className="absolute top-6 left-6 z-20 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white">
                                                {project.category}
                                            </div>
                                            <div className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
                                                <ArrowUpRight size={20} />
                                            </div>
                                        </div>

                                        <div className="p-8 relative z-20 bg-[#0f172a]">
                                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                                {project.desc}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags?.map((tag, i) => (
                                                    <span key={i} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 text-xs font-medium">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* 5. STATS SECTION */}
                <section className="py-24 bg-white/5 border-y border-white/5">
                    <div className="container mx-auto px-6 lg:px-16 max-w-[1400px]">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                            {config?.stats?.length > 0 ? (
                                config.stats.map((stat, i) => (
                                    <div key={i}>
                                        <div className="text-5xl lg:text-6xl font-bold text-white mb-2">{stat.number}</div>
                                        <div className="text-blue-400 font-medium tracking-wider uppercase text-sm">{stat.label}</div>
                                    </div>
                                ))
                            ) : (
                                <>
                                    <div><div className="text-5xl lg:text-6xl font-bold text-white mb-2">150+</div><div className="text-blue-400 font-medium tracking-wider uppercase text-sm">Projects Delivered</div></div>
                                    <div><div className="text-5xl lg:text-6xl font-bold text-white mb-2">98%</div><div className="text-blue-400 font-medium tracking-wider uppercase text-sm">Client Retention</div></div>
                                    <div><div className="text-5xl lg:text-6xl font-bold text-white mb-2">12+</div><div className="text-blue-400 font-medium tracking-wider uppercase text-sm">Industry Awards</div></div>
                                    <div><div className="text-5xl lg:text-6xl font-bold text-white mb-2">5y+</div><div className="text-blue-400 font-medium tracking-wider uppercase text-sm">Years Excellence</div></div>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                <FinalCTA />
            </main>

            <Footer />
            <WhatsAppButton />
            <ScrollToTop />
        </div>
    );
};

export default Portfolio;