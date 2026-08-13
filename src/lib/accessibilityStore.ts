import { create } from 'zustand';

type TextSize = 'sm' | 'md' | 'lg';
type LineHeight = 'normal' | 'relaxed' | 'extra';
type LetterSpacing = 'normal' | 'wide' | 'extra';

interface AccessibilityState {
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

  setTextSize: (size: TextSize) => void;
  setLineHeight: (height: LineHeight) => void;
  setLetterSpacing: (spacing: LetterSpacing) => void;
  toggleHighContrast: () => void;
  toggleGrayscale: () => void;
  toggleDyslexiaFriendly: () => void;
  toggleReduceMotion: () => void;
  toggleHighlightLinks: () => void;
  toggleEnhancedFocus: () => void;
  toggleReadingGuide: () => void;
  toggleCursorLarge: () => void;
  resetAll: () => void;
}

// PERHATIKAN DI SINI: Tambahkan () setelah <AccessibilityState>
export const useAccessibilityStore = create<AccessibilityState>()((set) => ({
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

  setTextSize: (textSize) => set({ textSize }),
  setLineHeight: (lineHeight) => set({ lineHeight }),
  setLetterSpacing: (letterSpacing) => set({ letterSpacing }),
  toggleHighContrast: () => set((state) => ({ highContrast: !state.highContrast })),
  toggleGrayscale: () => set((state) => ({ grayscale: !state.grayscale })),
  toggleDyslexiaFriendly: () => set((state) => ({ dyslexiaFriendly: !state.dyslexiaFriendly })),
  toggleReduceMotion: () => set((state) => ({ reduceMotion: !state.reduceMotion })),
  toggleHighlightLinks: () => set((state) => ({ highlightLinks: !state.highlightLinks })),
  toggleEnhancedFocus: () => set((state) => ({ enhancedFocus: !state.enhancedFocus })),
  toggleReadingGuide: () => set((state) => ({ readingGuide: !state.readingGuide })),
  toggleCursorLarge: () => set((state) => ({ cursorLarge: !state.cursorLarge })),
  resetAll: () =>
    set({
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
    }),
}));