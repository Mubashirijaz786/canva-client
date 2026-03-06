import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosPublic } from '../../api/axios';
import {
  ShoppingCart,
  Search,
  PenTool,
  Palette,
  Share2,
  Smartphone,
  Monitor,
  Cpu } from
'lucide-react';

const ServicesDropdown = () => {
  const [slugMap, setSlugMap] = useState({});


  const services = [
  { id: 'e-commerce', name: "E-Commerce", icon: ShoppingCart },
  { id: 'seo', name: "SEO Services", icon: Search },
  { id: 'content-writing', name: "Content Writing", icon: PenTool },
  { id: 'graphic-design', name: "Graphic Designing", icon: Palette },
  { id: 'social-media', name: "Social Media", icon: Share2 },
  { id: 'app-development', name: "Mobile App Dev", icon: Smartphone },
  { id: 'web-development', name: "Web Development", icon: Monitor },
  { id: 'custom-software', name: "Custom Software", icon: Cpu }];


  useEffect(() => {
    const fetchDynamicSlugs = async () => {
      try {
        const res = await axiosPublic.get('/service-pages/all/slugs');
        const mapping = {};

        res.data.forEach((item) => {
          mapping[item.pageId] = item.slug;
        });
        setSlugMap(mapping);
      } catch (err) {
        console.error("Dropdown Slug Fetch Error:", err);
      }
    };
    fetchDynamicSlugs();
  }, []);

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-4 z-50">
            
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0f172a] border-t border-l border-white/10 rotate-45 z-0"></div>

            <div className="relative bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-10">
                
                <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                <div className="p-2 flex flex-col">
                    {services.map((service, index) => {

            const finalSlug = slugMap[service.id] || service.id;

            return (
              <React.Fragment key={index}>
                                <Link
                  to={`/services/${finalSlug}`}
                  className="group/item flex items-center gap-4 px-4 py-3 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200">
                  
                                    <div className="p-2 rounded-lg bg-white/5 text-blue-400 group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors duration-300">
                                        <service.icon size={18} />
                                    </div>

                                    <span className="font-medium group-hover/item:translate-x-1 transition-transform duration-300">
                                        {service.name}
                                    </span>
                                </Link>

                                {index < services.length - 1 &&
                <div className="h-px w-[90%] mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                }
                            </React.Fragment>);

          })}
                </div>
            </div>
        </div>);

};

export default ServicesDropdown;