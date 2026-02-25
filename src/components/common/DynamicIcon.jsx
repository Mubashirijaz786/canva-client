import React from 'react';
import * as LucideIcons from 'lucide-react';

const DynamicIcon = ({ name, size = 32, className = "" }) => {
    
    const iconName = name === "LinkIcon" ? "Link" : name;
    
    const IconComponent = LucideIcons[iconName];

    if (!IconComponent) {
      
        return <LucideIcons.Zap size={size} className={className} />;
    }

    return <IconComponent size={size} className={className} />;
};

export default DynamicIcon;