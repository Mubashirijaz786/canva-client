import React from 'react';
import * as LucideIcons from 'lucide-react';

const IconPicker = ({ selectedIcon, onChange, label = "Select Icon" }) => {
    
    // ✅ "Zap" ko ek hi baar rakha hai aur list clean kar di hai
    const popularIcons = [
        "Sparkles", "Rocket", "Box", "Flame", "Zap", "Shield", "Star", 
        "Target", "Activity", "Briefcase", "Cpu", "Globe", "Heart", 
        "Layers", "Layout", "Lightbulb", "MousePointer", "Settings", "Smile", 
        "Trophy", "User", "Video", "Crown", "Code", "Link", "Smartphone"
    ];

    return (
        <div className="space-y-2">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black ml-2 italic">
                {label}
            </label>
            <div className="relative group">
                <select 
                    value={selectedIcon}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer pr-12"
                >
                    {popularIcons.map((icon, index) => (
                        // ✅ Key mein index add kardo taake error kabhi na aaye
                        <option key={`${icon}-${index}`} value={icon} className="bg-[#0f172a] text-white">
                            {icon}
                        </option>
                    ))}
                </select>
                
                {/* Right Side Icon Preview */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-blue-400 bg-[#0f172a] p-1 rounded-lg">
                    {/* ✅ Fallback icon handle kiya hai agar selectedIcon na mile */}
                    {React.createElement(LucideIcons[selectedIcon] || LucideIcons.HelpCircle, { size: 20 })}
                </div>
            </div>
        </div>
    );
};

export default IconPicker;