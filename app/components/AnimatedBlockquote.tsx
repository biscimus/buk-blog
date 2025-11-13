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
      className={`italic border-l-4 border-l-orange-400 px-6 py-0 my-6 *:my-2 
        relative overflow-hidden
        transform transition-all duration-700 ease-out
        hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-400/20
        before:absolute before:left-0 before:top-0 before:h-full before:w-1 
        before:bg-gradient-to-b before:from-orange-300 before:via-orange-400 before:to-orange-500
        before:transform before:-translate-x-full before:transition-transform before:duration-700 before:ease-out
        hover:before:translate-x-0
        ${isVisible 
          ? 'opacity-100 translate-y-0 animate-slideInFromBottom' 
          : 'opacity-0 translate-y-8'
        }`}>
      <div className="relative z-10">
        {children}
      </div>
    </blockquote>
  );
}