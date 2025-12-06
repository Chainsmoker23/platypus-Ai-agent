
import React, { useState, useEffect } from 'react';

const ScrollToTop: React.FC = (): React.ReactElement => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div 
      className={`fixed bottom-8 right-8 z-40 transition-all duration-500 transform ${
        isVisible 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        className="p-3 rounded-full bg-platypus-primary text-white shadow-lg hover:bg-platypus-accent hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-platypus-primary dark:focus:ring-offset-gray-900 group"
        aria-label="Scroll to top"
      >
        <svg 
            className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default ScrollToTop;
