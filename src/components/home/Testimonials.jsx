import React, { useState, useEffect } from 'react';
import { Star, Loader2 } from 'lucide-react';
import { axiosPublic } from '../../api/axios';

import reviewBg from '../../assets/images/review-background.webp'; 


const Testimonials = () => {
    const [dynamicReviews, setDynamicReviews] = useState([]);
    const [featuredReview, setFeaturedReview] = useState(null);
    const [brandingImage, setBrandingImage] = useState(""); 
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axiosPublic.get('/reviews');
                
              
                const allReviews = res.data.reviews || [];
                const globalImage = res.data.brandingImage || "";
                
                setBrandingImage(globalImage);

                
                const featured = allReviews.find(r => r.isFeatured) || allReviews[0];
                
            
                const others = allReviews.filter(r => r._id !== featured?._id);

                setFeaturedReview(featured);
                setDynamicReviews(others);
            } catch (err) {
                console.error("Error fetching testimonials:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    const isSliderActive = dynamicReviews.length > 3;
    const sliderData = isSliderActive ? [...dynamicReviews, ...dynamicReviews] : dynamicReviews;

    const renderStars = (rating = 5) => (
        <div className="flex gap-1.5 mb-6">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-600"} />
            ))}
        </div>
    );

    return (
        <section className="relative py-24 lg:py-32 overflow-hidden" id="reviews">
            <div className="absolute inset-0 z-0">
                <img src={reviewBg} alt="Background" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-[#020617]/95 mix-blend-multiply"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-16 max-w-[1600px] relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block border border-white/10 rounded-full px-5 py-2 text-sm font-medium text-blue-300 mb-6 bg-white/5 backdrop-blur-sm">Testimonials</div>
                    <h2 className="text-4xl lg:text-6xl font-semibold text-white font-['Manrope'] tracking-tight">
                        Trusted by Brands <br /> 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Worldwide</span>
                    </h2>
                </div>

                {featuredReview && (
                    <div className="bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden flex flex-col-reverse lg:flex-row mb-20 backdrop-blur-md shadow-2xl min-h-[500px]">
                        <div className="lg:w-2/5 relative min-h-[400px] lg:min-h-full group">
                          
                            <img 
                                src={brandingImage} 
                                alt="Section Branding" 
                                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                            />
                            <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
                        </div>
                        
                        <div className="lg:w-3/5 p-10 lg:p-32 flex flex-col justify-center">
                            {renderStars(featuredReview.rating)}
                            <blockquote className="text-2xl lg:text-3xl font-medium text-white leading-relaxed mb-12">
                                “{featuredReview.quote}”
                            </blockquote>
                            <div>
                                <div className="text-2xl font-bold text-white mb-2">{featuredReview.author}</div>
                                <div className="text-blue-400 text-lg font-medium">{featuredReview.role}</div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="relative w-full overflow-hidden">
                    {isSliderActive && (
                        <>
                            <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-[#020617] to-transparent z-20 pointer-events-none"></div>
                            <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-[#020617] to-transparent z-20 pointer-events-none"></div>
                        </>
                    )}
                    
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="animate-spin text-blue-500" size={40} />
                        </div>
                    ) : (
                        <div className={`flex w-fit ${isSliderActive ? 'animate-loop-scroll hover:pause' : 'justify-center mx-auto'}`}>
                            {sliderData.map((item, index) => (
                                <div key={index} className="w-[85vw] sm:w-[400px] shrink-0 px-4">
                                    <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md flex flex-col h-[400px] group relative overflow-hidden transition-all hover:bg-white/10 hover:-translate-y-2">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <div className="relative z-10 flex flex-col h-full">
                                            {renderStars(item.rating)}
                                            <blockquote className="text-gray-300 text-lg leading-relaxed flex-grow mb-6">"{item.quote}"</blockquote>
                                            <div className="mt-auto pt-6 border-t border-white/10">
                                                <div className="text-lg font-bold text-white mb-1">{item.author}</div>
                                                <div className="text-blue-400 text-sm font-medium">{item.role}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;