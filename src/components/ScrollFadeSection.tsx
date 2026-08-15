'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollFadeSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export default function ScrollFadeSection({
  children,
  className = '',
  id,
  delay = 0,
}: ScrollFadeSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={domRef}
      id={id}
      style={{
        transitionDuration: '750ms',
        transitionDelay: delay ? `${delay}ms` : undefined,
      }}
      className={`w-full transition-all ease-out transform-gpu ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8 pointer-events-none'
      } ${isVisible ? 'pointer-events-auto' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
