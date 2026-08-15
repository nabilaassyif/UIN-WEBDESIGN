'use client';

import { useState } from 'react';
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

  return (
    <section
      className="relative w-full min-w-full overflow-x-clip border-t border-[var(--border-color)] py-24 md:py-36"
      id="dokumentasi"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[var(--bg-primary)]" />
      <div className="relative max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[var(--accent)] mb-3 block">
              {t('documentation.eyebrow')}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[var(--text-primary)]">
              {t('documentation.heading')}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md font-light leading-relaxed">
            {t('documentation.description')}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCUMENTATION_PHOTOS.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoIndex(idx)}
              className="group relative overflow-hidden border border-[var(--border-color)] bg-[var(--bg-secondary)] aspect-[4/3] cursor-pointer shadow-xl hover:border-[var(--border-color-strong)] transition-all duration-500"
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
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                style={{ backgroundImage: `url('${photo.imageUrl}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/30 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 bg-[var(--overlay-scrim)] backdrop-blur-md border border-[var(--border-color)] text-[9px] uppercase font-semibold tracking-wider text-[var(--accent)]">
                  {photo.category}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 transform translate-y-0.5 group-hover:translate-y-0 transition-transform">
                <h3 className="font-serif text-base font-normal text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-1">
                  {photo.title}
                </h3>
                <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                  <span>{photo.location}</span>
                  <span className="text-[var(--accent)]">{t('documentation.enlarge')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[var(--overlay-scrim)] backdrop-blur-xl animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-6 right-6 z-50 w-9 h-9 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center text-[var(--text-primary)] transition-colors cursor-pointer"
            aria-label={t('documentation.closeLightbox')}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center text-[var(--text-primary)] transition-colors cursor-pointer"
            aria-label={t('documentation.prevPhoto')}
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">chevron_left</span>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center text-[var(--text-primary)] transition-colors cursor-pointer"
            aria-label={t('documentation.nextPhoto')}
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">chevron_right</span>
          </button>

          <div className="relative max-w-4xl w-full bg-[var(--bg-tertiary)] rounded-xl overflow-hidden border border-[var(--border-color-strong)] shadow-2xl flex flex-col">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[var(--bg-input)] overflow-hidden">
              <div
                className="w-full h-full bg-contain bg-no-repeat bg-center"
                style={{ backgroundImage: `url('${activePhoto.imageUrl}')` }}
              />
            </div>
            <div className="p-5 sm:p-6 bg-[var(--bg-tertiary)] border-t border-[var(--border-color)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-[9px] uppercase font-bold tracking-widest text-[var(--accent)] block mb-1">
                  {activePhoto.category} &bull; {activePhoto.year}
                </span>
                <h3 className="font-serif text-lg font-normal text-[var(--text-primary)] mb-1">
                  {activePhoto.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] font-light max-w-xl">
                  {activePhoto.description}
                </p>
              </div>
              <div className="text-[11px] text-[var(--accent)] shrink-0">
                {activePhoto.location}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
