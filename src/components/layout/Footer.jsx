import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { axiosPublic } from '../../api/axios';
import logo from '../../assets/images/logo.webp';

const UpworkIcon = ({ size, className }) => (
    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/upwork.svg" alt="Upwork" width={size} height={size} className={className} style={{ filter: "invert(100%) brightness(103%)" }} />
);
// ... (Imports same rahenge)

const Footer = () => {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        axiosPublic.get('/settings').then(res => setSettings(res.data));
    }, []);

    if (!settings) return null;

    return (
        <footer className="relative bg-[#020617] text-white py-8 lg:pt-12 lg:pb-16 overflow-hidden font-['Manrope'] border-t border-white/5">
            <div className="absolute bottom-0 right-0 w-[80%] lg:w-[40%] h-[150%] bg-gradient-to-l from-blue-900/30 via-cyan-900/20 to-transparent blur-[100px] pointer-events-none"></div>
            <div className="container mx-auto px-6 lg:px-16 max-w-[1400px] relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 lg:gap-8 text-center lg:text-left">
                    
                    {/* LOGO SECTION */}
                    <div className="lg:w-1/4 flex flex-col items-center lg:items-start lg:-mt-6">
                        <img src={logo} alt="Canva Solutions" className="h-20 lg:h-32 w-auto object-contain mb-4" />
                        <p className="text-gray-400 text-sm leading-relaxed max-w-[280px]">Your Primer partner offering IT & Network, Accounting & Digital services</p>
                    </div>

                    {/* LINKS */}
                    <div className="grid grid-cols-2 lg:flex lg:flex-row gap-8 lg:gap-20 lg:w-2/5 w-full lg:pt-4">
                        <div className="flex flex-col gap-4 text-left">
                            <Link to="/" className="text-gray-400 hover:text-blue-400 font-medium">Home</Link>
                            <Link to="/services" className="text-gray-400 hover:text-blue-400 font-medium">Services</Link>
                            <Link to="/portfolio" className="text-gray-400 hover:text-blue-400 font-medium">Portfolio</Link>
                        </div>
                        <div className="flex flex-col gap-4 text-left">
                            <Link to="/about" className="text-gray-400 hover:text-blue-400 font-medium">About Us</Link>
                            <Link to="/blog" className="text-gray-400 hover:text-blue-400 font-medium">Blog</Link>
                            <Link to="/contact" className="text-gray-400 hover:text-blue-400 font-medium">Contacts</Link>
                        </div>
                    </div>

                    {/* CONTACT DYNAMIC (Looping Arrays) */}
                    <div className="flex flex-col gap-6 lg:w-1/4 items-center lg:items-start w-full lg:pt-4">
                        <div className="flex flex-col gap-5 w-full text-left">
                            <div className="flex flex-col gap-3">
                                {settings.phones?.map((p, i) => p && (
                                    <a key={i} href={`tel:${p}`} className="flex items-center gap-2 text-white font-medium hover:text-blue-400 text-xs sm:text-sm">
                                        <Phone size={14} className="text-blue-400 shrink-0" /> {p}
                                    </a>
                                ))}
                                {settings.emails?.map((e, i) => e && (
                                    <a key={i} href={`mailto:${e}`} className="flex items-center gap-2 text-gray-400 hover:text-white text-[10px] sm:text-[13px] break-all">
                                        <Mail size={14} className="text-blue-400 shrink-0" /> {e}
                                    </a>
                                ))}
                            </div>
                            <div className="flex flex-col gap-4">
                                {settings.addresses?.map((a, i) => a && (
                                    <div key={i} className="flex items-start gap-2 text-gray-400 text-[11px] sm:text-sm">
                                        <MapPin size={14} className="text-blue-400 mt-1 shrink-0" />
                                        <span className="whitespace-pre-line leading-relaxed">{a}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* SOCIALS */}
                        <div className="flex items-center gap-6 mt-2">
                            {settings.facebook && <a href={settings.facebook} target="_blank" className="text-white hover:text-blue-400"><Facebook size={20} /></a>}
                            {settings.instagram && <a href={settings.instagram} target="_blank" className="text-white hover:text-blue-400"><Instagram size={20} /></a>}
                            {settings.upwork && <a href={settings.upwork} target="_blank" className="text-white hover:opacity-80"><UpworkIcon size={20} /></a>}
                            {settings.linkedin && <a href={settings.linkedin} target="_blank" className="text-white hover:text-blue-400"><Linkedin size={20} /></a>}
                        </div>
                    </div>

                    {/* COPYRIGHT */}
                    <div className="lg:w-1/6 text-sm text-gray-500 flex flex-col items-center lg:items-end w-full lg:text-right lg:pt-4">
                        <p>Canva Solutions © {settings.copyright}.</p>
                        <p>All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;