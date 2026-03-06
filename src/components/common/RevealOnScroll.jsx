import React from 'react';
import { useInView } from 'react-intersection-observer';

const RevealOnScroll = ({ children, threshold = 0.1, delay = 0 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: threshold
  });

  return (
    <div
      ref={ref}

      className={`
                transition-all duration-1000 ease-out transform
                ${inView ?
      'opacity-100 translate-y-0' :
      'opacity-0 translate-y-12'}
            `
      }
      style={{ transitionDelay: `${delay}ms` }}>
      
            {children}
        </div>);

};

export default RevealOnScroll;