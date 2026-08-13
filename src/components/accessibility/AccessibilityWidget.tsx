'use client';

import { useState, useEffect } from 'react';
import AccessibilityButton from './AccessibilityButton';
import AccessibilityPanel from './AccessibilityPanel';
import { useAccessibilityStore } from '../../lib/accessibilityStore';

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const readingGuide = useAccessibilityStore((state) => state.readingGuide);

  // Logika pergerakan Reading Guide mengikuti kursor
  useEffect(() => {
    const guideElement = document.getElementById('reading-guide-line');
    if (!readingGuide) {
      if (guideElement) guideElement.classList.add('hidden');
      return;
    }

    if (guideElement) guideElement.classList.remove('hidden');
    const handleMouseMove = (e: MouseEvent) => {
      if (guideElement) {
        guideElement.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [readingGuide]);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      <AccessibilityPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="mt-4">
        <AccessibilityButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </div>
    </div>
  );
}