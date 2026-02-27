import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { axiosPublic } from '../../api/axios';

const WhyChooseUs = () => {
    const [features, setFeatures] = useState([]);
    const [heroImage, setHeroImage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosPublic.get('/whychooseus');
                // ✅ Naye backend structure ke mutabiq data set kar rahe hain
                if (res.data) {
                    setFeatures(res.data.cards || []);
                    setHeroImage(res.data.mainImage || "");
                }
            } catch (err) { 
                console.error("Fetch error:", err); 
            } finally { 
                setLoading(false); 
            }
        };
        fetchData();
    }, []);

    const DynamicIcon = ({ name }) => {
        const IconComponent = LucideIcons[name] || LucideIcons.Sparkles;
        return <IconComponent size={32} strokeWidth={1.5} />;
    };

    // Agar data loading par hai toh clean UI rakhte hain
    if (loading && features.length === 0) return null;

    return (
        <section className="relative py-12 lg:py-24 bg-[#020617] overflow-hidden">
            {/* Background subtle glow */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 lg:px-16 max-w-[1600px] relative z-10"> 
                
                <div className="text-center mb-24">
                    <div className="inline-block border border-white/10 rounded-full px-5 py-2 text-sm font-medium text-gray-400 mb-6 bg-white/5 backdrop-blur-sm uppercase tracking-widest">
                        Why Choose Us
                    </div>
                    <h2 className="text-4xl lg:text-7xl font-black text-white font-['Manrope'] tracking-tighter leading-tight italic uppercase">
                        Why Businesses Trust <br /> <span className="text-blue-500">Canva Solutions</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                    
                    {/* LEFT COLUMN: THE SINGLE GLOBAL IMAGE */}
                    <div className="hidden lg:block lg:col-span-5 relative group min-h-[600px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5">
                        {heroImage ? (
                            <>
                                <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay z-10"></div>
                                <img 
                                    src={heroImage} 
                                    alt="Our Expertise" 
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80"></div>
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <LucideIcons.Image size={48} className="text-white/10" />
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: FEATURE GRID (TEXT ONLY) */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                        {features.map((feature, index) => (
                            <div key={feature._id || index} 
                                className="relative p-10 rounded-[2.5rem] bg-white/5 border border-white/10 transition-all duration-500 group overflow-hidden flex flex-col justify-between min-h-[320px] hover:bg-white/10 hover:border-blue-500/40 hover:-translate-y-2 shadow-xl"
                            >
                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative z-10 flex flex-col items-start h-full">
                                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                                        <DynamicIcon name={feature.iconName} />
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight tracking-tight group-hover:text-blue-400 transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-400 text-lg leading-relaxed line-clamp-4">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;