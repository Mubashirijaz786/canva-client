import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../common/PrimaryButton';
import InfiniteMarquee from '../common/InfiniteMarquee'; // ✅ Just added this
import { axiosPublic } from '../../api/axios';
import { Loader2 } from 'lucide-react';
import loopBackground from '../../assets/images/loop-background.webp';
import defaultLoopImage from '../../assets/images/loop.webp';

const TrustedBy = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosPublic.get('/trusted-by');
                setData(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // ✅ Logo elements ko memoize kiya taake list clean rahe
    const logoItems = useMemo(() => {
        const list = data?.logos?.length > 0 ? data.logos : [];
        return list.map((logo, index) => (
            <div key={index} className="mx-4 lg:mx-6 shrink-0">
                <div className="bg-white border border-white rounded-2xl p-4 shadow-sm flex items-center justify-center w-[140px] h-[80px] sm:w-[200px] sm:h-[110px]">
                    <img
                        src={logo}
                        alt="Partner"
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
            </div>
        ));
    }, [data]);

    if (loading) return <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-blue-500" /></div>;

    return (
        <section className="relative py-16 lg:py-24 overflow-hidden">
            <div className="absolute inset-0 w-full h-full z-0">
                <img src={loopBackground} alt="BG" className="w-full h-full object-cover scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
            </div>

            <div className="relative z-10 w-full mb-16 lg:mb-24">
                <div className="text-center container mx-auto px-4">
                    <p className="text-gray-400 text-sm sm:text-base font-medium mb-8 lg:mb-12 tracking-wide uppercase">
                        {data?.topText || "More than 100+ companies trust us worldwide"}
                    </p>
                </div>

                {/* ✅ Purane div ki jagah sirf animation component lga dya hai */}
                <InfiniteMarquee 
                    items={logoItems} 
                    speedFactor={5} 
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    <div className="relative flex justify-center lg:justify-start group order-2 lg:order-1">
                        <div className="relative z-10 w-3/4 sm:w-full max-w-[350px] lg:max-w-[450px]">
                            <img src={data?.sideImage || defaultLoopImage} alt="Loop" className="w-full h-auto object-contain drop-shadow-2xl" />
                        </div>
                    </div>

                    <div className="text-center lg:text-left pl-0 lg:pl-10 order-1 lg:order-2">
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] sm:text-xs font-medium text-gray-300 mb-6 lg:mb-8">
                            {data?.badgeText || "More About Our Company"}
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6 font-['Manrope'] leading-[1.2] tracking-tight">
                            {data?.heading?.split('<br />').map((text, i) => (
                                <React.Fragment key={i}>{text} <br className="hidden sm:block" /></React.Fragment>
                            )) || "All-in-One Service Provider"}
                        </h2>

                        <div className="mt-8 lg:mt-10 flex justify-center lg:justify-start">
                            <Link to="/services">
                                <PrimaryButton className="w-full sm:w-auto justify-center px-8 py-3 text-lg">
                                    Find Out More
                                </PrimaryButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustedBy;