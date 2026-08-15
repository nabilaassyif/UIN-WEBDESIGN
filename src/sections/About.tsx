'use client';

import { useLanguage } from '../lib/i18n/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();

  const stats = [
    { number: '6', label: t('about.stat1Label') },
    { number: '100+', label: t('about.stat2Label') },
    { number: '3', label: t('about.stat3Label') },
  ];

  return (
    <section
      className="relative w-full min-w-full overflow-x-clip border-t border-[var(--border-color)] py-24 md:py-36"
      id="tentang-kami"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[var(--bg-primary)]" />
      <div className="relative max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-[var(--border-color)] bg-[var(--bg-tertiary)]">
              <div
                role="img"
                aria-label="Detail anyaman rotan tradisional Kalimantan"
                className="w-full h-full bg-cover bg-center object-cover filter brightness-90 hover:brightness-100 transition-all duration-700"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDP2vcPKeFLeYYmgA6toV2sx3DxDAVXAD3AmX9AQ-DoM3z8M048lt8KPLdfBLPFS9lyOF0epnFXzCzEAEVT8v-OlyqZ-2pE3RmjjjFbaaFQAsSZlHdJPOGMSHb3kwMjhzHaoyI7relNrZ2EwLd_w1NuKe4_eH9ourHZces8Eo7-yLWl1FcsqRZnvaruDIBqJCNORp9Bp-ek-cj-3B7oANoD2gbWgB8ZjpAf1NAmC6SLCgxdFVF9HX8r')`,
                }}
              />
            </div>

            <div className="absolute -bottom-6 -right-3 sm:-bottom-8 sm:right-6 bg-[var(--bg-elevated)] border border-[var(--border-color)] px-8 py-6 shadow-2xl z-10 min-w-[170px]">
              <div className="font-serif text-3xl sm:text-4xl font-normal text-[var(--accent)] mb-1">
                50+
              </div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--text-secondary)] font-medium">
                {t('about.statMaster')}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center pt-8 lg:pt-0">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[var(--text-primary)] leading-[1.2] mb-8">
              {t('about.heading')}
            </h2>

            <div className="space-y-6 text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed mb-12">
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
            </div>

            <div className="pt-8 border-t border-[var(--border-color)] grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-3xl sm:text-4xl font-normal text-[var(--text-primary)] mb-1">
                    {stat.number}
                  </div>
                  <div className="text-[11px] sm:text-xs text-[var(--text-secondary)] font-light">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
