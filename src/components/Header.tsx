'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useThemeStore } from '../lib/themeStore';
import { useLanguage } from '../lib/i18n/LanguageContext';
import type { TranslationKey } from '../lib/i18n/translations';

interface NavLinkItem {
  href: string;
  id: string;
  labelKey: TranslationKey;
}

const NAV_LINKS: NavLinkItem[] = [
  { href: '#beranda', id: 'beranda', labelKey: 'nav.beranda' },
  { href: '#tentang-kami', id: 'tentang-kami', labelKey: 'nav.tentangKami' },
  { href: '#program', id: 'program', labelKey: 'nav.program' },
  { href: '#dokumentasi', id: 'dokumentasi', labelKey: 'nav.dokumentasi' },
  { href: '#kontak', id: 'kontak', labelKey: 'nav.kontak' },
];

/**
 * ThemeToggle — compact pill switch with a single sliding thumb icon.
 */
function ThemeToggle({ className = '' }: { className?: string }) {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const hydrate = useThemeStore((s) => s.hydrateFromStorage);
  const { t } = useLanguage();

  useEffect(() => {
    hydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      role="switch"
      aria-checked={!isLight}
      aria-label={isLight ? t('theme.toDark') : t('theme.toLight')}
      title={isLight ? t('theme.toDark') : t('theme.toLight')}
      className={`relative inline-flex h-9 w-[68px] shrink-0 items-center rounded-full border border-[var(--border-color-strong)] bg-[var(--bg-input)] p-1 transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute top-1 left-1 flex h-7 w-7 items-center justify-center rounded-full shadow-sm transition-transform duration-300 ease-out ${
          isLight
            ? 'translate-x-0 bg-[var(--accent)] text-[var(--accent-contrast)]'
            : 'translate-x-[30px] bg-[var(--text-primary)] text-[var(--bg-primary)]'
        }`}
      >
        <span className="material-symbols-outlined text-[16px] leading-none">
          {isLight ? 'light_mode' : 'dark_mode'}
        </span>
      </span>

      <span className="flex w-full items-center justify-between px-2 pointer-events-none">
        <span
          className={`material-symbols-outlined text-[14px] transition-opacity duration-200 ${
            isLight ? 'opacity-0' : 'opacity-35 text-[var(--text-muted)]'
          }`}
        >
          light_mode
        </span>
        <span
          className={`material-symbols-outlined text-[14px] transition-opacity duration-200 ${
            isLight ? 'opacity-35 text-[var(--text-muted)]' : 'opacity-0'
          }`}
        >
          dark_mode
        </span>
      </span>
    </button>
  );
}

function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, toggleLang, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t('lang.switchTo')}
      title={t('lang.switchTo')}
      className={`h-9 px-3.5 rounded-full border border-[var(--border-color-strong)] bg-[var(--bg-input)] hover:bg-[var(--bg-secondary)] flex items-center justify-center text-[11px] font-semibold tracking-wider text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${className}`}
    >
      {lang === 'id' ? 'ID' : 'EN'}
    </button>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    NAV_LINKS.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-color)] py-4 shadow-lg'
            : 'bg-transparent border-b border-[var(--border-color)]/50 py-6'
        }`}
        id="mainNav"
      >
        <div className="max-w-[1360px] mx-auto flex justify-between items-center px-6 sm:px-10 lg:px-16 w-full">
          {/* Logo */}
          <Link
            href="#beranda"
            className="group flex items-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
            onClick={handleLinkClick}
          >
            <span className="font-serif text-xl sm:text-2xl tracking-[0.22em] text-[var(--text-primary)] uppercase font-normal group-hover:text-[var(--accent)] transition-colors">
              KALIMANTAN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 lg:gap-10 items-center" aria-label={t('nav.menuLabel')}>
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative py-1 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
                >
                  <span
                    className={`text-[12px] font-medium tracking-[0.08em] transition-colors duration-200 ${
                      isActive
                        ? 'text-[var(--text-primary)] font-semibold'
                        : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {t(link.labelKey)}
                  </span>

                  {/* Underline Indicator */}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[var(--text-primary)] transition-all duration-300 ease-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA + Theme/Language */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>



            {/* Mobile Hamburger Button */}
            <button
              aria-controls="mobile-navigation-drawer"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
            >
              <span
                className={`w-6 h-[1.5px] bg-[var(--text-primary)] block transition-transform duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-6 h-[1.5px] bg-[var(--text-primary)] block transition-opacity duration-200 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`w-6 h-[1.5px] bg-[var(--text-primary)] block transition-transform duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="fixed inset-0 z-40 md:hidden flex flex-col justify-between bg-[var(--bg-primary)]/98 backdrop-blur-xl px-6 pt-24 pb-8 transition-all animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[var(--accent)] block">
                {t('nav.menuLabel')}
              </span>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
            </div>

            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`flex items-center justify-between p-3.5 rounded-lg border transition-all ${
                    isActive
                      ? 'border-[var(--accent)]/50 bg-[var(--accent)]/10 text-[var(--accent)] font-semibold'
                      : 'border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span className="text-sm tracking-wide">{t(link.labelKey)}</span>
                  <span className="material-symbols-outlined text-[16px] opacity-60">
                    chevron_right
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="pt-6 border-t border-[var(--border-color)] flex flex-col gap-3">

            <p className="text-center text-[10px] text-[var(--text-muted)]">
              © 2024 Kalimantan Cultural Organization
            </p>
          </div>
        </div>
      )}
    </>
  );
}