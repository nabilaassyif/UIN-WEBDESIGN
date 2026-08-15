'use client';

import Link from 'next/link';
import { useLanguage } from '../lib/i18n/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 px-6 sm:px-10 lg:px-16 overflow-hidden bg-[var(--bg-primary)]"
      id="beranda"
    >
      <div className="absolute inset-0 z-0">
        <div
          aria-hidden="true"
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity scale-100"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDgottfiz9I38_XqhHUmRyD0fnQiFn7BIQslBm5AlOq9gQgQgP6_16nKcI9ao3FOXuoPTrUer6giUibJuMZPS42xo0RxnmWx1fE-_QziptRTQsy8HC3m79Qk2tsB2svjtYG5gz0o4N4NPccdFVraNrD2SrRHpc0ykzfvpJXj8nCHeEDAeJWsHJpcI7LLxlLLYYqSf2dlFDHsqLcZSmY0F57zMFdolKxcC_FhVF2A92rT8u5UHFuNpKP')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/70 to-[var(--bg-primary)]/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-[var(--bg-primary)]/60 to-[var(--bg-primary)]" />
      </div>

      <div className="relative z-10 w-full max-w-[1000px] mx-auto flex flex-col items-center text-center">
        <span className="text-[11px] sm:text-xs font-semibold tracking-[0.35em] text-[var(--accent)] mb-6 block uppercase">
          {t('hero.eyebrow')}
        </span>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-normal text-[var(--text-primary)] max-w-4xl mb-8 leading-[1.08] tracking-tight">
          {t('hero.titleLine1')} <br className="hidden sm:block" />
          {t('hero.titleLine2')}
        </h1>

        <p className="font-sans text-sm sm:text-base md:text-[17px] text-[var(--text-secondary)] max-w-2xl mb-12 leading-relaxed font-light">
          {t('hero.description')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
          <Link
            href="#tentang-kami"
            className="w-full sm:w-auto px-8 py-3.5 bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 hover:opacity-90 rounded-[2px] text-center"
          >
            {t('hero.ctaPrimary')}
          </Link>

          <Link
            href="#karya-pilihan"
            className="group w-full sm:w-auto px-8 py-3.5 border border-[var(--border-color-strong)] bg-transparent text-[var(--text-primary)] text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 hover:border-[var(--accent)]/60 hover:bg-white/5 rounded-[2px] flex items-center justify-center gap-2"
          >
            <span>{t('hero.ctaSecondary')}</span>
            <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
