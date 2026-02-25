import React, { useState, useEffect } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom'; 
import { axiosPublic } from '../../api/axios'; // ✅ Backend connection

import PrimaryButton from '../common/PrimaryButton';
import SecondaryButton from '../common/SecondaryButton';

const FeaturedWork = () => {
    // ✅ 1. DYNAMIC STATES
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ 2. FETCH LATEST 3 PROJECTS
    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await axiosPublic.get('/projects');
                // Sirf pehle 3 projects dikhane ke liye slice use kiya
                setProjects(res.data.slice(0, 3));
            } catch (err) {
                console.error("Error fetching featured work:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    return (
        <section className="relative py-6 lg:py-6 bg-[#020617] overflow-hidden">
            
            {/* --- HEADER --- */}
            <div className="container mx-auto px-6 lg:px-16 max-w-[1500px] relative z-10 text-center mb-16 lg:mb-40">
                <div className="inline-block border border-white/10 rounded-full px-5 py-2 text-sm font-medium text-gray-400 mb-8 bg-white/5 backdrop-blur-sm">
                    Featured Projects
                </div>
                <h2 className="text-4xl lg:text-7xl font-semibold text-white font-['Manrope'] tracking-tight leading-[1.1]">
                    Work That Speaks for Itself
                </h2>
            </div>

            {/* --- PROJECTS LIST --- */}
            <div className="flex flex-col gap-20 lg:gap-24 w-full">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-blue-500" size={40} />
                    </div>
                ) : (
                    projects.map((project, index) => (
                        <div key={project._id} className="flex flex-col lg:flex-row items-center w-full">
                            
                            {/* --- TEXT SECTION --- */}
                            <div className="w-full lg:w-[45%] flex flex-col justify-center items-center lg:items-start 
                                px-6 lg:px-0 
                                lg:pl-[max(4rem,calc((100vw-1500px)/2+4rem))] 
                                pb-8 lg:pb-0 z-10"
                            >
                                <div className="max-w-xl text-center lg:text-left">
                                    <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-black bg-[#FFE5A3] rounded-full mb-6 uppercase">
                                        {project.category} {/* Backend field is category */}
                                    </span>
                                    
                                    <h3 className="text-3xl lg:text-6xl font-medium text-white leading-[1.1] mb-4 lg:mb-6 tracking-tight">
                                        {project.title}
                                    </h3>
                                    
                                    <p className="text-gray-400 text-base lg:text-xl leading-relaxed">
                                        {project.desc} {/* Backend field is desc */}
                                    </p>

                                    <div className="flex justify-center lg:justify-start mt-8 lg:mt-10">
                                        <a 
                                            href={project.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                        >
                                            <SecondaryButton className="!px-6 !py-3 lg:!px-8 lg:!py-4 !text-sm lg:!text-base !rounded-xl !border-white/20 hover:!bg-white hover:!text-black transition-all">
                                                See Project <ArrowRight size={18} className="ml-2" />
                                            </SecondaryButton>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* --- IMAGE SECTION --- */}
                            <div className="w-full lg:w-[55%] relative group pl-4 lg:pl-0"> 
                                <div className="absolute -inset-4 bg-gradient-to-l from-blue-600/10 to-purple-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                
                                <div className="relative overflow-hidden bg-[#0f172a] shadow-2xl
                                    rounded-l-[1.5rem] lg:rounded-l-[3rem] rounded-r-none 
                                    border-l border-y border-white/10 border-r-0
                                ">
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="w-full h-[350px] lg:h-[750px] object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                                </div>
                            </div>

                        </div>
                    ))
                )}
            </div>

            {/* --- BOTTOM CTA --- */}
            <div className="container mx-auto px-6 lg:px-16 max-w-[1500px] mt-16 lg:mt-28 flex justify-center">
                <Link to="/Portfolio">
                    <PrimaryButton className="!px-10 !py-5 text-lg">
                        See More Projects
                    </PrimaryButton>
                </Link>
            </div>

        </section>
    );
};

export default FeaturedWork;