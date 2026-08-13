import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-24 pb-section-gap px-margin-mobile md:px-margin-desktop overflow-hidden"
      id="beranda"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          aria-hidden="true"
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDgottfiz9I38_XqhHUmRyD0fnQiFn7BIQslBm5AlOq9gQgQgP6_16nKcI9ao3FOXuoPTrUer6giUibJuMZPS42xo0RxnmWx1fE-_QziptRTQsy8HC3m79Qk2tsB2svjtYG5gz0o4N4NPccdFVraNrD2SrRHpc0ykzfvpJXj8nCHeEDAeJWsHJpcI7LLxlLLYYqSf2dlFDHsqLcZSmY0F57zMFdolKxcC_FhVF2A92rT8u5UHFuNpKP')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-container-max mx-auto flex flex-col items-center text-center mt-20">
        <span className="font-label-caps text-label-caps text-secondary tracking-[0.2em] mb-6 block">
          CRAFT & HERITAGE
        </span>
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary max-w-5xl mb-8 leading-tight">
          Warisan yang Dibuat untuk Masa Kini
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-12">
          Preserving the soul of Kalimantan's ancestral craftsmanship. A curated collection of woven
          rattan, carved ironwood, and natural pigments, presented with quiet reverence and
          contemporary discipline.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6">
          <Link
            href="#tentang-kami"
            className="px-8 py-4 bg-primary text-background font-label-caps text-label-caps hover:bg-primary/90 transition-colors duration-300"
          >
            Kisah Kami
          </Link>
          <Link
            href="#karya-pilihan"
            className="px-8 py-4 border border-white/10 text-primary font-label-caps text-label-caps hover:bg-white/5 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            Karya Pilihan{' '}
            <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
              arrow_right_alt
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}