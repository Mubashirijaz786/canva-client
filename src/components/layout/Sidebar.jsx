import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Linkedin, Loader2 } from 'lucide-react';
import { axiosPublic } from '../../api/axios'; // ✅ Backend se data mangwane ke liye

// ✅ Custom Upwork Icon
const UpworkIcon = ({ size, className }) => (
  <img 
    src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/upwork.svg" 
    alt="Upwork"
    width={size} 
    height={size}
    className={className}
    style={{ 
      filter: "invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%)" 
    }}
  />
);

const Sidebar = () => {
  const [settings, setSettings] = useState(null);

  // --- FETCH SETTINGS FROM BACKEND ---
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axiosPublic.get('/settings');
        setSettings(res.data);
      } catch (err) {
        console.error("Sidebar links fetch error:", err);
      }
    };
    fetchSettings();
  }, []);

  // Jab tak data load na ho, sidebar na dikhao ya khali rakho
  if (!settings) return null;

  // Menu items array jo dynamic links use karega
  const menuItems = [
    { 
      id: 3, 
      label: "Facebook", 
      icon: Facebook, 
      link: settings.facebook 
    },
    { 
      id: 4, 
      label: "Instagram", 
      icon: Instagram, 
      link: settings.instagram 
    },
    { 
      id: 5, 
      label: "LinkedIn", 
      icon: Linkedin, 
      link: settings.linkedin 
    },
    { 
      id: 6, 
      label: "Upwork", 
      icon: UpworkIcon, 
      link: settings.upwork 
    },
  ].filter(item => item.link); // ✅ Sirf wohi icons dikhao jinka link admin ne dala hai

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 p-2 animate-in fade-in slide-in-from-right-4 duration-700">
      {menuItems.map((item) => (
        <a 
          key={item.id}
          href={item.link}
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative flex items-center justify-end"
        >
          {/* Sliding Label (Left Side) */}
          <span className="
            absolute right-14 
            opacity-0 translate-x-4 
            group-hover:opacity-100 group-hover:translate-x-0 
            transition-all duration-300 ease-out
            bg-white text-slate-800 text-xs font-bold 
            py-1.5 px-3 rounded-lg shadow-lg
            whitespace-nowrap
            z-0
          ">
            {item.label}
            <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45"></span>
          </span>

          {/* Square Icon Container */}
          <div className={`
            w-12 h-12 
            rounded-xl 
            flex items-center justify-center 
            bg-white/10 backdrop-blur-md 
            border border-white/20
            text-white/80
            shadow-lg shadow-black/10
            transform transition-all duration-300
            group-hover:bg-white/20 
            group-hover:text-white 
            group-hover:scale-110 
            group-hover:-rotate-3
            group-hover:border-white/40
            cursor-pointer
            relative z-10
          `}>
            <item.icon size={22} className={item.label === "Upwork" ? "" : "stroke-[2px]"} />
          </div>
        </a>
      ))}
    </div>
  );
};

export default Sidebar;