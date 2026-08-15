'use client';

import { useState, useEffect } from 'react';
import { useAccessibilityStore } from '../../lib/accessibilityStore';
import { useLanguage } from '../../lib/i18n/LanguageContext';

interface AccessibilityButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function AccessibilityButton({
  isOpen,
  onClick,
}: AccessibilityButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const activeCount = useAccessibilityStore((state) => state.getActiveCount());
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 1800);

    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 7000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleClick = () => {
    setShowTooltip(false);
    onClick();
  };

  return (
    <div className="relative flex flex-col items-end">
      {/* Tooltip Nudge */}
      <div
        className={`absolute -top-12 right-0 bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-color-strong)] font-normal px-3.5 py-2 rounded-xl text-xs whitespace-nowrap shadow-lg transition-all duration-300 pointer-events-none ${
          showTooltip && !isOpen
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-2 scale-95'
        }`}
      >
        <span className="text-[var(--accent)] mr-1.5">✦</span>
        <span>{t('access.tooltip')}</span>
        <div className="absolute -bottom-1.5 right-6 w-2.5 h-2.5 bg-[var(--bg-elevated)] border-r border-b border-[var(--border-color-strong)] rotate-45" />
      </div>

      {/* Floating Accessibility Button */}
      <button
        aria-controls="accessibility-panel"
        aria-expanded={isOpen}
        aria-label={isOpen ? t('access.close') : t('access.open')}
        className={`relative w-14 h-14 rounded-2xl border-2 shadow-lg flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] cursor-pointer ${
          isOpen
            ? 'bg-[var(--accent)] text-[var(--accent-contrast)] border-[var(--accent)] scale-[0.96]'
            : 'bg-[var(--bg-elevated)] border-[var(--border-color-strong)] text-[var(--text-primary)] hover:border-[var(--accent)]/60 hover:text-[var(--accent)]'
        }`}
        id="accessibility-btn"
        onClick={handleClick}
        title={t('access.title')}
        type="button"
      >
        <span className="material-symbols-outlined text-[26px]">
          {isOpen ? 'close' : 'accessibility_new'}
        </span>

        {activeCount > 0 && !isOpen && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-[var(--accent)] text-[var(--accent-contrast)] font-bold text-[10px] rounded-full flex items-center justify-center border-2 border-[var(--bg-primary)]">
            {activeCount}
          </span>
        )}
      </button>
    </div>
  );
}
