'use client';

import { createStore } from './store-utils';

export type TextSize = 'sm' | 'md' | 'lg';
export type LineHeight = 'normal' | 'relaxed' | 'extra';
export type LetterSpacing = 'normal' | 'wide' | 'extra';

interface PersistedSettings {
  textSize: TextSize;
  lineHeight: LineHeight;
  letterSpacing: LetterSpacing;
  highContrast: boolean;
  grayscale: boolean;
  dyslexiaFriendly: boolean;
  reduceMotion: boolean;
  highlightLinks: boolean;
  enhancedFocus: boolean;
  readingGuide: boolean;
  cursorLarge: boolean;
}

interface AccessibilityState extends PersistedSettings {
  setTextSize: (value: TextSize) => void;
  setLineHeight: (value: LineHeight) => void;
  setLetterSpacing: (value: LetterSpacing) => void;
  toggleHighContrast: () => void;
  toggleGrayscale: () => void;
  toggleDyslexiaFriendly: () => void;
  toggleReduceMotion: () => void;
  toggleHighlightLinks: () => void;
  toggleEnhancedFocus: () => void;
  toggleReadingGuide: () => void;
  toggleCursorLarge: () => void;
  resetAll: () => void;
  getActiveCount: () => number;
  hydrateFromStorage: () => void;
}

const STORAGE_KEY = 'kalimantan-accessibility-settings';

const defaultSettings: PersistedSettings = {
  textSize: 'md',
  lineHeight: 'normal',
  letterSpacing: 'normal',
  highContrast: false,
  grayscale: false,
  dyslexiaFriendly: false,
  reduceMotion: false,
  highlightLinks: false,
  enhancedFocus: false,
  readingGuide: false,
  cursorLarge: false,
};

function persist(settings: PersistedSettings) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    /* ignore quota/availability errors */
  }
}

function extractSettings(state: AccessibilityState): PersistedSettings {
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
  } = state;
  return {
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
  };
}

export const useAccessibilityStore = createStore<AccessibilityState>((set, get) => ({
  ...defaultSettings,

  setTextSize: (value) => {
    set({ textSize: value });
    persist(extractSettings(get()));
  },
  setLineHeight: (value) => {
    set({ lineHeight: value });
    persist(extractSettings(get()));
  },
  setLetterSpacing: (value) => {
    set({ letterSpacing: value });
    persist(extractSettings(get()));
  },
  toggleHighContrast: () => {
    set((s) => ({ highContrast: !s.highContrast }));
    persist(extractSettings(get()));
  },
  toggleGrayscale: () => {
    set((s) => ({ grayscale: !s.grayscale }));
    persist(extractSettings(get()));
  },
  toggleDyslexiaFriendly: () => {
    set((s) => ({ dyslexiaFriendly: !s.dyslexiaFriendly }));
    persist(extractSettings(get()));
  },
  toggleReduceMotion: () => {
    set((s) => ({ reduceMotion: !s.reduceMotion }));
    persist(extractSettings(get()));
  },
  toggleHighlightLinks: () => {
    set((s) => ({ highlightLinks: !s.highlightLinks }));
    persist(extractSettings(get()));
  },
  toggleEnhancedFocus: () => {
    set((s) => ({ enhancedFocus: !s.enhancedFocus }));
    persist(extractSettings(get()));
  },
  toggleReadingGuide: () => {
    set((s) => ({ readingGuide: !s.readingGuide }));
    persist(extractSettings(get()));
  },
  toggleCursorLarge: () => {
    set((s) => ({ cursorLarge: !s.cursorLarge }));
    persist(extractSettings(get()));
  },

  resetAll: () => {
    set({ ...defaultSettings });
    persist(defaultSettings);
  },

  getActiveCount: () => {
    const s = get();
    let count = 0;
    if (s.textSize !== 'md') count++;
    if (s.lineHeight !== 'normal') count++;
    if (s.letterSpacing !== 'normal') count++;
    if (s.highContrast) count++;
    if (s.grayscale) count++;
    if (s.dyslexiaFriendly) count++;
    if (s.reduceMotion) count++;
    if (s.highlightLinks) count++;
    if (s.enhancedFocus) count++;
    if (s.readingGuide) count++;
    if (s.cursorLarge) count++;
    return count;
  },

  hydrateFromStorage: () => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<PersistedSettings>;
        set(parsed);
      }
    } catch {
      /* ignore malformed storage */
    }
  },
}));
