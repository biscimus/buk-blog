"use client";

import React, { useEffect, useRef, useState } from 'react';

interface AnimatedBlockquoteProps {
  children: React.ReactNode;
}

export default function AnimatedBlockquote({ children }: AnimatedBlockquoteProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once animated, we can disconnect to avoid re-triggering
          observer.disconnect();
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '50px 0px -50px 0px' // Start animation a bit before it's fully visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <blockquote
      ref={ref}
      className={`
        not-italic my-8 px-6 py-4 rounded-2xl
        relative
        transform transition-all duration-700 ease-out
        bg-gradient-to-br from-orange-50 to-orange-100/50 
        dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-800/50
        text-gray-800 dark:text-gray-200
        border-2 border-orange-200 dark:border-orange-900/30
        shadow-md shadow-orange-100/50 dark:shadow-orange-900/10
        hover:shadow-lg hover:shadow-orange-200/60 dark:hover:shadow-orange-900/20
        hover:scale-[1.01]
        before:content-['"'] before:absolute before:text-5xl before:font-serif 
        before:text-orange-500/40 dark:before:text-orange-400/30 
        before:left-4 before:top-1 before:leading-none
        after:content-['"'] after:absolute after:text-5xl after:font-serif 
        after:text-orange-500/40 dark:after:text-orange-400/30 
        after:right-4 after:bottom-1 after:leading-none
        ${isVisible 
          ? 'opacity-100 translate-y-0 animate-slideInFromBottom' 
          : 'opacity-0 translate-y-8'
        }`}>
      <div className="relative z-10 pl-6 pr-6 *:my-2">
        {children}
      </div>
    </blockquote>
  );
}