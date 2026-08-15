'use client';

import { createStore } from './store-utils';

export type Theme = 'dark' | 'light';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  hydrateFromStorage: () => void;
}

const STORAGE_KEY = 'kalimantan-theme';

function applyThemeToDom(theme: Theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
}

function persistTheme(theme: Theme) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
  }
}

export const useThemeStore = createStore<ThemeState>((set, get) => ({
  
  theme: 'dark',

  toggleTheme: () => {
    const next: Theme = get().theme === 'dark' ? 'light' : 'dark';
    set({ theme: next });
    applyThemeToDom(next);
    persistTheme(next);
  },

  setTheme: (theme) => {
    set({ theme });
    applyThemeToDom(theme);
    persistTheme(theme);
  },

  hydrateFromStorage: () => {
    if (typeof window === 'undefined') return;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
      let theme: Theme;
      if (saved === 'dark' || saved === 'light') {
        theme = saved;
      } else {
        const prefersLight =
          typeof window.matchMedia === 'function' &&
          window.matchMedia('(prefers-color-scheme: light)').matches;
        theme = prefersLight ? 'light' : 'dark';
      }
      set({ theme });
      applyThemeToDom(theme);
    } catch {
    }
  },
}));
