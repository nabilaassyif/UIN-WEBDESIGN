'use client';

import { useEffect } from 'react';
import { useAccessibilityStore } from '../../lib/accessibilityStore';

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

export default function AccessibilitySync() {
  const store = useAccessibilityStore();

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const body = document.body;

    root.setAttribute('data-text-size', store.textSize);
    root.setAttribute('data-line-height', store.lineHeight);
    root.setAttribute('data-letter-spacing', store.letterSpacing);

    ALL_ACCESS_CLASSES.forEach((cls) => {
      body.classList.remove(cls);
      root.classList.remove(cls);
    });

    if (store.textSize !== 'md') {
      body.classList.add(`access-text-${store.textSize}`);
      root.classList.add(`access-text-${store.textSize}`);
    }
    if (store.lineHeight !== 'normal') {
      body.classList.add(`access-line-height-${store.lineHeight}`);
      root.classList.add(`access-line-height-${store.lineHeight}`);
    }
    if (store.letterSpacing !== 'normal') {
      body.classList.add(`access-spacing-${store.letterSpacing}`);
      root.classList.add(`access-spacing-${store.letterSpacing}`);
    }

    if (store.highContrast) {
      body.classList.add('access-high-contrast');
      root.classList.add('access-high-contrast');
    }
    if (store.grayscale) {
      body.classList.add('access-grayscale');
      root.classList.add('access-grayscale');
    }
    if (store.dyslexiaFriendly) {
      body.classList.add('access-dyslexia');
      root.classList.add('access-dyslexia');
    }
    if (store.reduceMotion) {
      body.classList.add('access-reduce-motion');
      root.classList.add('access-reduce-motion');
    }
    if (store.highlightLinks) {
      body.classList.add('access-highlight-links');
      root.classList.add('access-highlight-links');
    }
    if (store.readingGuide) {
      body.classList.add('access-reading-guide');
      root.classList.add('access-reading-guide');
    }
    if (store.cursorLarge) {
      body.classList.add('access-cursor-large');
      root.classList.add('access-cursor-large');
    }
  }, [store]);

  return null;
}