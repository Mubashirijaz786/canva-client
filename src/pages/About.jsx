import React, { useState, useEffect, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { axiosPublic } from '../api/axios'; 

// Layout Components
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FinalCTA from '../components/home/FinalCTA';
import WhatsAppButton from '../components/common/WhatsAppButton';
import ScrollToTop from '../components/common/ScrollToTop';
import MetaData from '../components/common/MetaData';
import DynamicIcon from '../components/common/DynamicIcon';
import InfiniteMarquee from '../components/common/InfiniteMarquee'; // ✅ Added

const About = () => {
    const [team, setTeam] = useState([]);
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [teamRes, aboutRes] = await Promise.all([
                    axiosPublic.get('/team'),
                    axiosPublic.get('/about-page')
                ]);
                setTeam(teamRes.data);
                setAboutData(aboutRes.data);
            } catch (err) {
                console.error("Data fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        window.scrollTo(0, 0);
    }, []);

    // ✅ Team cards ko markup mein convert kiya marquee ke liye
    const teamCards = useMemo(() => {
        return team.map((member, index) => (
            <div key={index} className="w-[300px] shrink-0 mx-4 relative group">
                <div className="relative overflow-hidden rounded-3xl aspect-[3/4] border border-white/10 bg-white/5 shadow-xl">
                    <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors duration-300 z-10"></div>
                    <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-all duration-500 transform group-hover:scale-110" 
                    />
                    <div className="absolute bottom-4 left-4 right-4 z-20 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-lg font-bold text-white">{member.name}</h3>
                        <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">{member.role}</p>
                    </div>
                </div>
            </div>
        ));
    }, [team]);

    if (loading) return <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-blue-500" /></div>;

    return (
        <div className="w-full relative bg-[#020617] min-h-screen text-white selection:bg-blue-500/30">
            
            <MetaData 
                pageName="about" 
                title="About Us | Canva Solutions" 
                description="Learn more about Canva Solutions, our vision, and the expert team behind our digital innovations."
            />

           <div className="relative w-full flex items-center justify-center p-2 sm:p-4 z-50">
                <div className="relative z-10 w-full lg:w-[98%] bg-transparent border border-transparent flex flex-col px-4 sm:px-10 lg:px-16 pt-4">
                    <Navbar />
                </div>
            </div>

            <main id="main-content">
                {/* 2. HERO SECTION */}
                <section className="relative pt-20 pb-32 px-6 lg:px-16 overflow-hidden text-center">
                    <div className="absolute inset-0 bg-blue-600/10 blur-[120px] pointer-events-none"></div>
                    <div className="container mx-auto max-w-[1000px] relative z-10">
                        <div className="inline-block border border-white/10 rounded-full px-5 py-2 text-sm font-medium text-blue-400 mb-8 bg-white/5 backdrop-blur-sm uppercase tracking-widest">
                            {aboutData?.badgeText}
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-[1.1] text-white tracking-tight">
                            {aboutData?.heroTitle} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400">
                                {aboutData?.heroSubtitle}
                            </span>
                        </h1>
                        <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
                            {aboutData?.heroDescription}
                        </p>
                    </div>
                </section>

                {/* 3. IMAGE & STATS GRID */}
                <section className="px-6 lg:px-16 pb-24 pt-6">
                    <div className="container mx-auto max-w-[1400px]">
                        <div className="relative rounded-[3rem] overflow-hidden aspect-video lg:aspect-[21/9] mb-16 group border border-white/5 shadow-2xl">
                            <img 
                                src={aboutData?.heroImage} 
                                alt="Innovation Center" 
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s]"
                            />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                            {aboutData?.stats?.map((stat, idx) => (
                                <div key={idx} className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-all duration-300 group">
                                    <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.number}</div>
                                    <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. FOUNDER SECTION */}
                <section className="py-24 bg-white/[0.02] border-y border-white/5 overflow-hidden">
                    <div className="container mx-auto px-6 lg:px-16 max-w-[1200px]">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-10 order-2 lg:order-1">
                                <div>
                                    <h3 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-3">Professional Software House</h3>
                                    <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">{aboutData?.founderMainTitle}</h2>
                                </div>

                                <div className="space-y-8">
                                    {aboutData?.founderSections?.map((sec, i) => (
                                        <div key={i} className="space-y-3">
                                            <h4 className="text-xl font-semibold text-white flex items-center gap-2">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div> {sec.title}
                                            </h4>
                                            <p className="text-gray-400 text-lg leading-relaxed font-light">{sec.description}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-8 bg-blue-600/10 border-l-4 border-blue-500 rounded-r-2xl backdrop-blur-sm shadow-xl">
                                    <h4 className="text-white font-bold text-lg mb-2">Founder’s Vision</h4>
                                    <p className="text-gray-300 italic text-lg leading-relaxed">"{aboutData?.founderVision}"</p>
                                    <p className="mt-4 text-white font-bold text-xl">— {aboutData?.founderName}</p>
                                </div>
                            </div>
                            <div className="relative order-1 lg:order-2">
                                <div className="absolute -inset-4 bg-blue-500/20 rounded-[2rem] blur-3xl -z-10"></div>
                                <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                                    <img src={aboutData?.founderImage} className="w-full h-[650px] object-cover" alt="Founder" />
                                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                                        <p className="text-white font-bold text-2xl">{aboutData?.founderName}</p>
                                        <p className="text-blue-400 font-medium uppercase text-sm">{aboutData?.founderRole}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. CORE VALUES */}
                <section className="py-24 px-6 lg:px-16">
                    <div className="container mx-auto max-w-[1400px]">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-4">{aboutData?.valuesTitle}</h2>
                            <p className="text-gray-400">{aboutData?.valuesSubtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {aboutData?.valuesList?.map((val, idx) => (
                                <div key={idx} className="p-10 rounded-[2rem] bg-[#0f172a] border border-white/10 hover:border-blue-500/30 transition-all group">
                                    <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                                        <DynamicIcon name={val.iconName} size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{val.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. TEAM SECTION WITH MARQUEE */}
                <section className="py-24 bg-gradient-to-b from-[#020617] to-[#0f172a] overflow-hidden">
                    <div className="container mx-auto px-6 lg:px-16 mb-16 text-center">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Meet The Minds</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">The talented developers, designers, and strategists behind your success.</p>
                    </div>

                    <div className="relative w-full">
                        {team.length > 4 ? (
                            <InfiniteMarquee 
                                items={teamCards} 
                                speedFactor={10} 
                            />
                        ) : (
                            <div className="flex flex-wrap justify-center gap-8 px-6">
                                {teamCards}
                            </div>
                        )}
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

export default About;