import React, { useEffect, useRef } from 'react';

const ScrollRotate = ({ 
    children, 
    rotationSpeed = 0.08, 
    scaleSpeed = 0.0002,  
    className = "" 
}) => {
    const elementRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            
            
            rafRef.current = requestAnimationFrame(() => {
                if (elementRef.current) {
                    const scrollY = window.scrollY;
                    
                    
                    const rotation = scrollY * rotationSpeed;
                    const scale = 1 + (scrollY * scaleSpeed);

                    
                    elementRef.current.style.transform = `rotate(${rotation}deg) scale(${scale})`;
                }
            });
        };

        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        
        handleScroll();

        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [rotationSpeed, scaleSpeed]);

    return (
        <div 
            ref={elementRef} 
            className={`will-change-transform transition-transform duration-75 ease-out ${className}`}
        >
            {children}
        </div>
    );
};

export default ScrollRotate;