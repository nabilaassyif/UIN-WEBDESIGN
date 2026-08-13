'use client';

import { useEffect } from 'react';
import { useAccessibilityStore } from '../../lib/accessibilityStore';
import TextSizeGroup from './TextSizeGroup';
import ToggleButton from './ToggleButton';

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccessibilityPanel({
  isOpen,
  onClose,
}: AccessibilityPanelProps) {
  const store = useAccessibilityStore();

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Apply accessibility classes to body
  useEffect(() => {
    const body = document.body;

    // Remove all accessibility classes
    body.className = body.className
      .split(' ')
      .filter((c) => !c.startsWith('access-'))
      .join(' ');

    // Add active classes
    if (store.textSize !== 'md') body.classList.add(`access-text-${store.textSize}`);
    if (store.lineHeight !== 'normal') body.classList.add(`access-line-height-${store.lineHeight}`);
    if (store.letterSpacing !== 'normal') body.classList.add(`access-spacing-${store.letterSpacing}`);

    if (store.highContrast) body.classList.add('access-high-contrast');
    if (store.grayscale) body.classList.add('access-grayscale');
    if (store.dyslexiaFriendly) body.classList.add('access-dyslexia');
    if (store.reduceMotion) body.classList.add('access-reduce-motion');
    if (store.highlightLinks) body.classList.add('access-highlight-links');
    if (store.enhancedFocus) body.classList.add('access-focus');
    if (store.readingGuide) body.classList.add('access-reading-guide');
    if (store.cursorLarge) body.classList.add('access-cursor-large');
  }, [store]);

  if (!isOpen) return null;

  return (
    <div
      aria-label="Accessibility Settings"
      className="absolute bottom-20 right-0 w-[90vw] sm:w-[400px] max-h-[80vh] overflow-y-auto bg-surface-container-highest border border-white/10 rounded-xl shadow-2xl p-6"
      role="dialog"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
        <h3 className="font-headline-md text-lg text-primary m-0">Accessibility</h3>
        <button
          aria-label="Close Accessibility Panel"
          className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-secondary rounded p-1"
          onClick={onClose}
          type="button"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="space-y-8">
        {/* ========== TEXT SETTINGS ========== */}
        <div>
          <h4 className="font-label-caps text-label-caps text-secondary mb-4">Text</h4>

          <TextSizeGroup
            label="Text Size"
            options={[
              { value: 'sm', label: 'A-' },
              { value: 'md', label: 'A' },
              { value: 'lg', label: 'A+' },
            ]}
            selectedValue={store.textSize}
            onSelect={(val: string) => store.setTextSize(val as 'sm' | 'md' | 'lg')}
          />

          <TextSizeGroup
            label="Line Height"
            options={[
              { value: 'normal', label: 'Normal' },
              { value: 'relaxed', label: 'Relaxed' },
              { value: 'extra', label: 'Extra' },
            ]}
            selectedValue={store.lineHeight}
            onSelect={(val: string) => store.setLineHeight(val as 'normal' | 'relaxed' | 'extra')}
          />

          <TextSizeGroup
            label="Letter Spacing"
            options={[
              { value: 'normal', label: 'Normal' },
              { value: 'wide', label: 'Wide' },
              { value: 'extra', label: 'Extra' },
            ]}
            selectedValue={store.letterSpacing}
            onSelect={(val: string) => store.setLetterSpacing(val as 'normal' | 'wide' | 'extra')}
          />
        </div>

        {/* ========== VISUAL SETTINGS ========== */}
        <div>
          <h4 className="font-label-caps text-label-caps text-secondary mb-4">Visual</h4>
          <div className="space-y-3">
            <ToggleButton
              label="High Contrast"
              isActive={store.highContrast}
              onClick={() => store.toggleHighContrast()}
            />
            <ToggleButton
              label="Grayscale"
              isActive={store.grayscale}
              onClick={() => store.toggleGrayscale()}
            />
            <ToggleButton
              label="Dyslexia Friendly"
              isActive={store.dyslexiaFriendly}
              onClick={() => store.toggleDyslexiaFriendly()}
            />
          </div>
        </div>

        {/* ========== MOTION & NAVIGATION ========== */}
        <div>
          <h4 className="font-label-caps text-label-caps text-secondary mb-4">
            Motion & Navigation
          </h4>
          <div className="space-y-3">
            <ToggleButton
              label="Reduce Motion"
              isActive={store.reduceMotion}
              onClick={() => store.toggleReduceMotion()}
            />
            <ToggleButton
              label="Highlight Links"
              isActive={store.highlightLinks}
              onClick={() => store.toggleHighlightLinks()}
            />
            <ToggleButton
              label="Enhanced Focus"
              isActive={store.enhancedFocus}
              onClick={() => store.toggleEnhancedFocus()}
            />
            <ToggleButton
              label="Reading Guide"
              isActive={store.readingGuide}
              onClick={() => store.toggleReadingGuide()}
            />
            <ToggleButton
              label="Cursor Size (Large)"
              isActive={store.cursorLarge}
              onClick={() => store.toggleCursorLarge()}
            />
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="mt-8 pt-6 border-t border-white/5">
        <button
          className="w-full py-3 bg-primary text-background font-label-caps text-label-caps rounded hover:bg-primary/90 transition-colors min-h-[44px]"
          onClick={() => {
            store.resetAll();
            onClose();
          }}
          type="button"
        >
          Reset All
        </button>
      </div>
    </div>
  );
}