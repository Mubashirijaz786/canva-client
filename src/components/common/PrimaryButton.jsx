import React from 'react';
import { ArrowRight } from 'lucide-react';

const PrimaryButton = ({
  children,
  onClick,
  className = "",
  icon = true,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`
                px-8 py-4 
                rounded-lg 
                text-base font-semibold 
                min-w-[200px] 
                flex items-center justify-center gap-2 
                border border-transparent 

                
                bg-gradient-to-r from-blue-500 to-cyan-500 
                text-white 
                shadow-xl shadow-blue-500/20 

                
                hover:bg-white           
                hover:text-black     
                hover:border-blue-600    
                hover:shadow-blue-500/40 
                
                
                hover-slide-right
                transition-all duration-300 
                
                ${className} 
            `}
      {...props}>
      
            {icon && <ArrowRight size={18} />}
            {children}
        </button>);

};

export default PrimaryButton;