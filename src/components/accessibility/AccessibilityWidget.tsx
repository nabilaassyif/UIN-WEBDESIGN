'use client';

import { useState, useEffect } from 'react';
import AccessibilityButton from './AccessibilityButton';
import AccessibilityPanel from './AccessibilityPanel';
import { useAccessibilityStore } from '../../lib/accessibilityStore';
import { useThemeStore } from '../../lib/themeStore';
import { useLanguage } from '../../lib/i18n/LanguageContext';

const ALL_ACCESS_CLASSES = [
  'access-text-sm',
  'access-text-lg',
  'access-line-height-relaxed',
  'access-line-height-extra',
  'access-spacing-wide',
  'access-spacing-extra',
  'access-high-contrast',
  'access-grayscale',
  'access-dyslexia',
  'access-reduce-motion',
  'access-highlight-links',
  'access-focus',
  'access-reading-guide',
  'access-cursor-large',
];

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const store = useAccessibilityStore();
  const readingGuide = store.readingGuide;
  const hydrateFromStorage = store.hydrateFromStorage;
  const hydrateTheme = useThemeStore((state) => state.hydrateFromStorage);
  const { t } = useLanguage();

  useEffect(() => {
    hydrateFromStorage();
    hydrateTheme();
  }, [hydrateFromStorage, hydrateTheme]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const body = document.body;

    ALL_ACCESS_CLASSES.forEach((cls) => body.classList.remove(cls));

    if (store.textSize !== 'md') body.classList.add(`access-text-${store.textSize}`);
    if (store.lineHeight !== 'normal') body.classList.add(`access-line-height-${store.lineHeight}`);
    if (store.letterSpacing !== 'normal') body.classList.add(`access-spacing-${store.letterSpacing}`);

    if (store.highContrast) body.classList.add('access-high-contrast');
    if (store.grayscale) body.classList.add('access-grayscale');
    if (store.dyslexiaFriendly) body.classList.add('access-dyslexia');
    if (store.reduceMotion) body.classList.add('access-reduce-motion');
    if (store.highlightLinks) body.classList.add('access-highlight-links');
    if (store.readingGuide) body.classList.add('access-reading-guide');
    if (store.cursorLarge) body.classList.add('access-cursor-large');
  }, [store]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const guideElement = document.getElementById('reading-guide-line');

    if (!readingGuide) {
      if (guideElement) guideElement.classList.add('hidden');
      return;
    }

    if (guideElement) {
      guideElement.classList.remove('hidden');
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (guideElement) {
        guideElement.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [readingGuide]);

  return (
    <aside
      aria-label={t('access.title')}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9990] flex flex-col items-end"
    >
      <AccessibilityPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <AccessibilityButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
    </aside>
  );
}