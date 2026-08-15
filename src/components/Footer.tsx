'use client';

import Link from 'next/link';
import { useLanguage } from '../lib/i18n/LanguageContext';
import type { TranslationKey } from '../lib/i18n/translations';

export default function Footer() {
  const { t } = useLanguage();

  const navLinks: { href: string; labelKey: TranslationKey }[] = [
    { href: '#beranda', labelKey: 'nav.beranda' },
    { href: '#tentang-kami', labelKey: 'nav.tentangKami' },
    { href: '#program', labelKey: 'nav.program' },
    { href: '#dokumentasi', labelKey: 'nav.dokumentasi' },
    { href: '#kontak', labelKey: 'nav.kontak' },
  ];

  return (
    <footer
      className="bg-[var(--bg-primary)] w-full border-t border-[var(--border-color)] pt-20 pb-12 px-6 sm:px-10 lg:px-16"
      id="kontak-footer"
    >
      <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-12 pb-16">
        {/* Brand & Description (Col 1-5) */}
        <div className="lg:col-span-5 max-w-sm">
          <Link
            href="#beranda"
            className="font-serif text-xl sm:text-2xl tracking-[0.2em] text-[var(--text-primary)] uppercase block mb-4 hover:text-[var(--accent)] transition-colors"
          >
            KALIMANTAN
          </Link>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-light leading-relaxed">
            {t('footer.description')}
          </p>
        </div>

        {/* Navigation Links (Col 6-8) */}
        <div className="lg:col-span-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)] mb-4">
            {t('footer.navTitle')}
          </div>
          <ul className="space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-light block"
                >
                  {t(link.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info (Col 9-12) */}
        <div className="lg:col-span-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)] mb-4">
            {t('footer.contactTitle')}
          </div>
          <div className="space-y-3 text-xs text-[var(--text-secondary)] font-light">
            <a
              href="mailto:info@kalimantanheritage.org"
              className="hover:text-[var(--accent)] transition-colors block text-[var(--text-secondary)]"
            >
              info@kalimantanheritage.org
            </a>
            <p className="leading-relaxed text-[var(--text-muted)] pt-1">
              Jl. Pahlawan No. 45
              <br />
              Palangka Raya, Kalimantan Tengah
              <br />
              Indonesia
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1360px] mx-auto pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[var(--text-muted)] font-light">
        <p>{t('footer.copyright')}</p>
        <div className="flex items-center gap-4">
          <button
            aria-label={t('footer.shareAria')}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] cursor-pointer"
            onClick={() => {
              if (navigator.share) {
                navigator
                  .share({
                    title: 'KALIMANTAN — Craft & Heritage',
                    url: window.location.href,
                  })
                  .catch(() => {});
              }
            }}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
