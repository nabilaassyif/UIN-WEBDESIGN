'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../lib/i18n/LanguageContext';

interface DocPhoto {
  id: string;
  title: string;
  location: string;
  year: string;
  description: string;
  imageUrl: string;
  category: string;
}

// Note: photo captions stay in Indonesian for now (editorial field notes).
// Only the surrounding UI chrome is translated via useLanguage().
const DOCUMENTATION_PHOTOS: DocPhoto[] = [
  {
    id: 'doc-1',
    title: 'Kehangatan Komunitas di Rumah Betang Tradisional',
    location: 'Kapuas Hulu, Kalimantan Barat',
    year: '2025',
    category: 'Arsitektur & Komunitas',
    description:
      'Suasana kebersamaan para tetua adat dan pengrajin di selasar Rumah Betang panjang berkonstruksi kayu ulin berusia lebih dari satu abad.',
    imageUrl:
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'doc-2',
    title: 'Pemilahan & Penjemuran Serat Rotan Alami',
    location: 'Kutai Barat, Kalimantan Timur',
    year: '2025',
    category: 'Proses Bahan Baku',
    description:
      'Batang rotan segah yang baru dipanen dibersihkan dari duri dan dijemur di bawah sinar matahari pagi sebelum diserut menjadi serat anyaman halus.',
    imageUrl:
      'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'doc-3',
    title: 'Penenunan Serat Doyo dengan Alat Gedogan',
    location: 'Tanjung Isuy, Kalimantan Timur',
    year: '2026',
    category: 'Kriya Tekstil',
    description:
      'Maestro tenun Dayak Benuaq memasang benang lungsi serat daun doyo pada perkakas tenun kayu tradisional tanpa sambungan paku.',
    imageUrl:
      'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'doc-4',
    title: 'Ritual Sakral Penempaan Mandau Dayak',
    location: 'Palangka Raya, Kalimantan Tengah',
    year: '2025',
    category: 'Pusaka Tradisi',
    description:
      'Pandai besi adat melantunkan mantra syukur saat membakar bilah baja dalam bara tempurung kelapa untuk menghasilkan pamor bilah pusaka.',
    imageUrl:
      'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'doc-5',
    title: 'Pewarnaan Nabati Alami dengan Daun Tarum',
    location: 'Sintang, Kalimantan Barat',
    year: '2026',
    category: 'Pewarna Alami',
    description:
      'Fermentasi pasta daun tarum menghasilkan nuansa biru indigo pekat yang ramah lingkungan dan awet menempel pada benang tenun puluhan tahun.',
    imageUrl:
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'doc-6',
    title: 'Ekspedisi Konservasi Rimba Ulin Purba',
    location: 'Meratus, Kalimantan Selatan',
    year: '2025',
    category: 'Ekspedisi Rimba',
    description:
      'Tim kurator bersama polisi hutan adat menjelajahi tegakan pohon ulin purba untuk mencatat koordinat suaka pelestarian botani.',
    imageUrl:
      'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1000&q=80',
  },
];

// Varying aspect ratios so the columns feel like an organic masonry wall
// rather than a uniform grid.
const ASPECT_CYCLE = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[4/5]', 'aspect-square'];

export default function DocumentationSection() {
  const { t } = useLanguage();
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex - 1 + DOCUMENTATION_PHOTOS.length) % DOCUMENTATION_PHOTOS.length);
  };

  const handleNext = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex + 1) % DOCUMENTATION_PHOTOS.length);
  };

  const activePhoto = activePhotoIndex !== null ? DOCUMENTATION_PHOTOS[activePhotoIndex] : null;

  useEffect(() => {
    if (activePhotoIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePhotoIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePhotoIndex]);

  return (
    <section
      className="relative w-full min-w-full overflow-x-clip border-t border-[var(--border-color)] py-24 md:py-36"
      id="dokumentasi"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[var(--bg-primary)]" />
      <div className="relative max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-10 border-b border-[var(--border-color)]">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-[var(--accent)] mb-4 block">
              {t('documentation.eyebrow')}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[var(--text-primary)] leading-[1.15]">
              {t('documentation.heading')}
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] max-w-md font-light leading-relaxed">
            {t('documentation.description')}
          </p>
        </div>

        {/* Masonry Gallery */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {DOCUMENTATION_PHOTOS.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoIndex(idx)}
              className={`group relative overflow-hidden bg-[var(--bg-secondary)] mb-6 break-inside-avoid cursor-pointer ${ASPECT_CYCLE[idx % ASPECT_CYCLE.length]}`}
              role="button"
              tabIndex={0}
              aria-label={`${t('documentation.enlarge')}: ${photo.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActivePhotoIndex(idx);
                }
              }}
            >
              <div
                className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700 ease-out"
                style={{ backgroundImage: `url('${photo.imageUrl}')` }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <span className="absolute top-4 left-4 font-serif text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {String(idx + 1).padStart(2, '0')}
              </span>

              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-[9px] uppercase tracking-widest text-white/70 block mb-1">
                  {photo.category}
                </span>
                <h3 className="font-serif text-sm text-white leading-snug">
                  {photo.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/97 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-6 right-6 z-50 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label={t('documentation.closeLightbox')}
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 text-white/50 hover:text-white transition-colors cursor-pointer"
            aria-label={t('documentation.prevPhoto')}
            type="button"
          >
            <span className="material-symbols-outlined text-[32px]">chevron_left</span>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 text-white/50 hover:text-white transition-colors cursor-pointer"
            aria-label={t('documentation.nextPhoto')}
            type="button"
          >
            <span className="material-symbols-outlined text-[32px]">chevron_right</span>
          </button>

          {/* Image stage */}
          <div className="flex-1 flex items-center justify-center px-6 sm:px-20 pt-16 pb-6 min-h-0">
            <img
              src={activePhoto.imageUrl}
              alt={activePhoto.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Caption bar */}
          <div className="shrink-0 px-6 sm:px-10 pb-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="text-[10px] uppercase tracking-widest text-white/50 block mb-1.5">
                {String(activePhotoIndex! + 1).padStart(2, '0')} / {String(DOCUMENTATION_PHOTOS.length).padStart(2, '0')}
                {'  \u00b7  '}
                {activePhoto.category} &bull; {activePhoto.year}
              </span>
              <h3 className="font-serif text-lg sm:text-xl text-white mb-1.5">
                {activePhoto.title}
              </h3>
              <p className="text-xs text-white/50 font-light leading-relaxed hidden sm:block">
                {activePhoto.description}
              </p>
            </div>
            <span className="text-[11px] text-white/60 shrink-0">
              {activePhoto.location}
            </span>
          </div>

          {/* Thumbnail filmstrip */}
          <div className="shrink-0 flex gap-2 px-6 sm:px-10 pb-6 overflow-x-auto">
            {DOCUMENTATION_PHOTOS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActivePhotoIndex(i)}
                className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 overflow-hidden cursor-pointer transition-all duration-300 ${
                  i === activePhotoIndex ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                }`}
                aria-label={p.title}
                type="button"
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${p.imageUrl}')` }}
                />
                {i === activePhotoIndex && (
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}