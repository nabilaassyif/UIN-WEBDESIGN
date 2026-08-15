'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
    <div className="flex items-center gap-1.5 mb-2.5">
      <span className="material-symbols-outlined text-[14px] text-[var(--accent)]">
        {icon}
      </span>
      <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-[0.14em]">
        {label}
      </span>
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

  const panel = (
    <div
      ref={panelRef}
      aria-label={t('access.title')}
      aria-modal="true"
      className="fixed z-[9995] bottom-[80px] left-3 right-3 sm:left-auto sm:right-6 sm:bottom-[90px] sm:w-[380px] max-h-[76vh] overflow-y-auto overscroll-contain bg-[var(--bg-elevated)] border border-[var(--border-color-strong)] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-fade-in"
      id="accessibility-panel"
      role="dialog"
      // Belt-and-suspenders against the grayscale filter's fixed-position bug:
      // filter/transform on an ancestor creates a new containing block for
      // position:fixed descendants. Rendering via portal escapes any wrapper
      // that isn't <html>/<body> itself. If your grayscale toggle applies
      // filter to <html> or <body> directly, move it to an inner wrapper
      // (e.g. #app-content) instead — that's the real fix.
      style={{ isolation: 'isolate' }}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 flex justify-between items-center gap-3 px-4 pt-4 pb-3 bg-[var(--bg-elevated)] border-b border-[var(--border-color)]">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 shrink-0 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
            <span className="material-symbols-outlined text-[17px]">accessibility_new</span>
          </span>
          <div>
            <h3 className="font-serif text-[15px] font-bold text-[var(--text-primary)] m-0 tracking-wide leading-tight">
              {t('access.title')}
            </h3>
            <p className="text-[10.5px] text-[var(--text-muted)] m-0 font-light leading-snug">
              {t('access.subtitle')}
            </p>
          </div>
        </div>

        <button
          aria-label={t('access.close')}
          className="w-7 h-7 shrink-0 rounded-full text-[var(--text-muted)] hover:bg-[var(--bg-input)] hover:text-[var(--text-primary)] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
          onClick={onClose}
          type="button"
        >
          <span className="material-symbols-outlined text-[17px]">close</span>
        </button>
      </div>

      <div className="px-4 pb-4 pt-3.5 space-y-4">
        {/* TIPOGRAFI & SPASI */}
        <div>
          <SectionHeading icon={SECTIONS.typography} label={t('access.sectionTypography')} />
          <div className="space-y-2">
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

        <div className="h-px bg-[var(--border-color)]" />

        {/* KONTRAS & WARNA */}
        <div>
          <SectionHeading icon={SECTIONS.contrast} label={t('access.sectionContrast')} />
          <div className="space-y-1.5">
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

        <div className="h-px bg-[var(--border-color)]" />

        {/* NAVIGASI & ALAT BANTU */}
        <div>
          <SectionHeading icon={SECTIONS.motion} label={t('access.sectionMotion')} />
          <div className="space-y-1.5">
            <ToggleButton
              label={t('access.highlightLinks')}
              description={t('access.highlightLinksDesc')}
              isActive={store.highlightLinks}
              onClick={() => store.toggleHighlightLinks()}
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

      {/* Footer Reset */}
      <div className="sticky bottom-0 px-4 pt-3 pb-4 bg-[var(--bg-elevated)] border-t border-[var(--border-color)]">
        <button
          className="group w-full py-2 text-[var(--text-muted)] hover:text-[var(--accent)] text-[11px] font-medium tracking-wider uppercase rounded-lg transition-colors flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
          onClick={() => store.resetAll()}
          type="button"
        >
          <span className="material-symbols-outlined text-[14px] transition-transform duration-500 group-hover:-rotate-180">
            restart_alt
          </span>
          <span>{t('access.reset')}</span>
        </button>
      </div>
    </div>
  );

  // Portal to document.body: escapes any filtered/transformed wrapper that
  // isn't <html>/<body> itself. See note above if grayscale filter is on
  // <html>/<body> directly — that needs fixing at the source, not here.
  return typeof document !== 'undefined' ? createPortal(panel, document.body) : panel;
}