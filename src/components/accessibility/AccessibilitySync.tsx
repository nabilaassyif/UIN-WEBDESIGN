// src/components/accessibility/AccessibilitySync.tsx
'use client';

import { useEffect } from 'react';
import { useAccessibilityStore } from '../../lib/accessibilityStore';

export default function AccessibilitySync() {
  const {
    textSize,
    lineHeight,
    letterSpacing,
    highContrast,
    grayscale,
    dyslexiaFriendly,
    reduceMotion,
    highlightLinks,
    enhancedFocus,
    readingGuide,
    cursorLarge,
  } = useAccessibilityStore();

  useEffect(() => {
    const root = document.documentElement;

    // Set data attributes untuk styling global
    root.setAttribute('data-text-size', textSize);
    root.setAttribute('data-line-height', lineHeight);
    root.setAttribute('data-letter-spacing', letterSpacing);

    // Toggle class untuk fitur boolean
    root.classList.toggle('high-contrast', highContrast);
    root.classList.toggle('access-grayscale', grayscale);
    root.classList.toggle('dyslexia-font', dyslexiaFriendly);
    root.classList.toggle('reduce-motion', reduceMotion);
    root.classList.toggle('highlight-links', highlightLinks);
    root.classList.toggle('enhanced-focus', enhancedFocus);
    root.classList.toggle('reading-guide-active', readingGuide);
    root.classList.toggle('cursor-large', cursorLarge);
  }, [
    textSize,
    lineHeight,
    letterSpacing,
    highContrast,
    grayscale,
    dyslexiaFriendly,
    reduceMotion,
    highlightLinks,
    enhancedFocus,
    readingGuide,
    cursorLarge,
  ]);

  return null; // Komponen ini murni untuk logic sinkronisasi
}