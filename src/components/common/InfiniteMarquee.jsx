import React from 'react';

const InfiniteMarquee = ({ items, speedFactor = 5 }) => {
    
    const duration = items.length * speedFactor;

    return (
        <div className="relative flex overflow-hidden w-full group">
            {/* Side Fade Masks */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505]/95 to-transparent z-20 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505]/95 to-transparent z-20 pointer-events-none"></div>

            <div 
                // ✅ 'items-stretch' se saari lines (borders) ek barabar height ki ho jayengi
                className="flex w-fit items-stretch animate-loop-scroll"
                style={{ animationDuration: `${duration}s` }}
            >
                {[...items, ...items].map((item, index) => (
                    <div key={index} className="flex-shrink-0 flex">
                        {/* ✅ Inner div ko 'flex' diya taake card poori height pakray */}
                        {item}
                    </div>
                ))}
            </div>

            {/* ✅ Pure CSS Hover: No State = No Jump/Reset */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes loopScroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .animate-loop-scroll {
                    display: flex;
                    animation-name: loopScroll;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
                .group:hover .animate-loop-scroll {
                    animation-play-state: paused !important;
                }
            `}} />
        </div>
    );
};

export default InfiniteMarquee;