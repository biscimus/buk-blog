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

  const quotationMarkStyle = "text-5xl text-[#A69B8A] dark:text-orange-400/50 select-none";

  return (
    <blockquote
      ref={ref}
      className={`
        relative flex justify-center
        px-2 my-6
        transform transition-all duration-700 ease-out
        ${isVisible 
          ? 'opacity-100 translate-y-0 animate-slideInFromBottom' 
          : 'opacity-0 translate-y-8'
        }`}>
      <span className={`self-top ${quotationMarkStyle}`}>『</span>
        {children}
      <span className={`self-end ${quotationMarkStyle}`}>』</span>
    </blockquote>
  );
}