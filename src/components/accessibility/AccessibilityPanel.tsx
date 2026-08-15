'use client';

import { useEffect, useRef } from 'react';
import { useAccessibilityStore } from '../../lib/accessibilityStore';
import { useLanguage } from '../../lib/i18n/LanguageContext';
import TextSizeGroup from './TextSizeGroup';
import ToggleButton from './ToggleButton';

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// Each section gets one glyph + one job — icons carry meaning here, not decoration.
const SECTIONS = {
  typography: 'text_fields',
  contrast: 'contrast',
  motion: 'motion_photos_off',
} as const;

function SectionHeading({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="w-5 h-5 rounded-full bg-[var(--accent)]/12 text-[var(--accent)] flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-[13px]">{icon}</span>
      </span>
      <span className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-[0.18em]">
        {label}
      </span>
      <div className="flex-1 h-px bg-[var(--border-color)]" />
    </div>
  );
}

export default function AccessibilityPanel({
  isOpen,
  onClose,
}: AccessibilityPanelProps) {
  const store = useAccessibilityStore();
  const { t } = useLanguage();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const btn = document.getElementById('accessibility-btn');
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        btn &&
        !btn.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      aria-label={t('access.title')}
      aria-modal="true"
      className="fixed z-[9995] bottom-[80px] left-3 right-3 sm:left-auto sm:right-6 sm:bottom-[90px] sm:w-[392px] max-h-[78vh] overflow-y-auto overscroll-contain bg-[var(--bg-elevated)] border border-[var(--border-color-strong)] rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.28)] animate-fade-in"
      id="accessibility-panel"
      role="dialog"
    >
      {/* Header — sticky so orientation never scrolls out of view */}
      <div className="sticky top-0 z-10 flex justify-between items-start gap-3 px-5 pt-5 pb-3.5 bg-[var(--bg-elevated)] border-b border-[var(--border-color)]">
        <div className="flex items-start gap-3">
          <span className="w-9 h-9 shrink-0 rounded-xl bg-[var(--accent)]/12 text-[var(--accent)] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">accessibility_new</span>
          </span>
          <div>
            <h3 className="font-serif text-base font-bold text-[var(--text-primary)] m-0 tracking-wide">
              {t('access.title')}
            </h3>
            <p className="text-[11px] text-[var(--text-muted)] m-0 mt-0.5 font-light leading-snug">
              {t('access.subtitle')}
            </p>
          </div>
        </div>

        <button
          aria-label={t('access.close')}
          className="w-8 h-8 shrink-0 rounded-lg border border-[var(--border-color)] bg-[var(--bg-input)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
          onClick={onClose}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      <div className="px-5 pb-5 pt-4 space-y-6">
        {/* Section 1: TIPOGRAFI & SPASI */}
        <div>
          <SectionHeading icon={SECTIONS.typography} label={t('access.sectionTypography')} />

          <div className="space-y-3">
            <TextSizeGroup
              label={t('access.fontSize')}
              options={[
                { value: 'sm', label: 'A−', subLabel: t('access.fontSizeSmall') },
                { value: 'md', label: 'A', subLabel: t('access.fontSizeMedium') },
                { value: 'lg', label: 'A+', subLabel: t('access.fontSizeLarge') },
              ]}
              selectedValue={store.textSize}
              onSelect={(val: string) => store.setTextSize(val as 'sm' | 'md' | 'lg')}
            />

            <TextSizeGroup
              label={t('access.lineHeight')}
              options={[
                { value: 'normal', label: t('access.lineHeightNormal') },
                { value: 'relaxed', label: t('access.lineHeightRelaxed') },
                { value: 'extra', label: t('access.lineHeightExtra') },
              ]}
              selectedValue={store.lineHeight}
              onSelect={(val: string) => store.setLineHeight(val as 'normal' | 'relaxed' | 'extra')}
            />

            <TextSizeGroup
              label={t('access.letterSpacing')}
              options={[
                { value: 'normal', label: t('access.lineHeightNormal') },
                { value: 'wide', label: t('access.lineHeightRelaxed') },
                { value: 'extra', label: t('access.lineHeightExtra') },
              ]}
              selectedValue={store.letterSpacing}
              onSelect={(val: string) => store.setLetterSpacing(val as 'normal' | 'wide' | 'extra')}
            />
          </div>
        </div>

        {/* Section 2: KONTRAS & WARNA */}
        <div>
          <SectionHeading icon={SECTIONS.contrast} label={t('access.sectionContrast')} />

          <div className="space-y-2">
            <ToggleButton
              label={t('access.highContrast')}
              description={t('access.highContrastDesc')}
              isActive={store.highContrast}
              onClick={() => store.toggleHighContrast()}
            />
            <ToggleButton
              label={t('access.grayscale')}
              description={t('access.grayscaleDesc')}
              isActive={store.grayscale}
              onClick={() => store.toggleGrayscale()}
            />
            <ToggleButton
              label={t('access.dyslexia')}
              description={t('access.dyslexiaDesc')}
              isActive={store.dyslexiaFriendly}
              onClick={() => store.toggleDyslexiaFriendly()}
            />
          </div>
        </div>

        {/* Section 3: GERAKAN & NAVIGASI */}
        <div>
          <SectionHeading icon={SECTIONS.motion} label={t('access.sectionMotion')} />

          <div className="space-y-2">
            <ToggleButton
              label={t('access.reduceMotion')}
              description={t('access.reduceMotionDesc')}
              isActive={store.reduceMotion}
              onClick={() => store.toggleReduceMotion()}
            />
            <ToggleButton
              label={t('access.highlightLinks')}
              description={t('access.highlightLinksDesc')}
              isActive={store.highlightLinks}
              onClick={() => store.toggleHighlightLinks()}
            />
            <ToggleButton
              label={t('access.enhancedFocus')}
              description={t('access.enhancedFocusDesc')}
              isActive={store.enhancedFocus}
              onClick={() => store.toggleEnhancedFocus()}
            />
            <ToggleButton
              label={t('access.readingGuide')}
              description={t('access.readingGuideDesc')}
              isActive={store.readingGuide}
              onClick={() => store.toggleReadingGuide()}
            />
            <ToggleButton
              label={t('access.cursorLarge')}
              description={t('access.cursorLargeDesc')}
              isActive={store.cursorLarge}
              onClick={() => store.toggleCursorLarge()}
            />
          </div>
        </div>
      </div>

      {/* Footer Reset — sticky, separated, and unambiguous about the action's scope */}
      <div className="sticky bottom-0 px-5 pt-3.5 pb-5 bg-[var(--bg-elevated)] border-t border-[var(--border-color)]">
        <button
          className="group w-full py-2.5 bg-[var(--bg-input)] hover:bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent)]/40 text-[var(--text-secondary)] hover:text-[var(--accent)] text-xs font-medium tracking-wider uppercase rounded-lg transition-all flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
          onClick={() => store.resetAll()}
          type="button"
        >
          <span className="material-symbols-outlined text-[15px] transition-transform duration-500 group-hover:-rotate-180">
            restart_alt
          </span>
          <span>{t('access.reset')}</span>
        </button>
      </div>
    </div>
  );
}