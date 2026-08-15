'use client';

import { useState } from 'react';
import { useLanguage } from '../lib/i18n/LanguageContext';

interface ProgramItem {
  id: string;
  title: string;
  category: string;
  schedule: string;
  location: string;
  seats: string;
  description: string;
  benefits: string[];
  imageUrl: string;
}


const PROGRAMS_DATA: ProgramItem[] = [
  {
    id: 'lokakarya-muda',
    title: 'Lokakarya Regenerasi Pengrajin Muda',
    category: 'Edukasi & Pelatihan',
    schedule: 'Setiap Sabtu & Minggu (Batch 4)',
    location: 'Rumah Budaya Betang, Palangka Raya',
    seats: 'Tersedia 15 Kursi',
    description:
      'Program bimbingan langsung bersama empu anyam dan pemahat Dayak senior untuk mentransfer teknik tradisional murni kepada generasi muda.',
    benefits: ['Bimbingan Maestro Adat', 'Bahan & Alat Disediakan', 'Sertifikasi Keterampilan Budaya'],
    imageUrl:
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'konservasi-ulin',
    title: 'Konservasi Bibit Ulin & Rotan Hutan Adat',
    category: 'Pelestarian Lingkungan',
    schedule: 'Bulan Depan • Ekspedisi 3 Hari',
    location: 'Hutan Lindung Gunung Lumut, Paser',
    seats: 'Tersedia 20 Partisipan',
    description:
      'Aksi nyata penanaman kembali 1.000 bibit pohon ulin dan suaka rotan alami bersama masyarakat adat demi keberlangsungan bahan baku kerajinan masa depan.',
    benefits: ['Aksi Nyata Konservasi Rimba', 'Living with Indigenous Community', 'Dokumentasi Ekspedisi'],
    imageUrl:
      'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'arsip-digital-motif',
    title: 'Digitalisasi & Pengarsipan Motif Sakral Dayak',
    category: 'Riset & Dokumentasi',
    schedule: 'Sepanjang Tahun 2026',
    location: 'Kalimantan Barat & Kalimantan Timur',
    seats: 'Terbuka untuk Relawan Peneliti',
    description:
      'Dokumentasi resolusi tinggi dan visualisasi 3D dari ratusan motif kain tenun dan ukiran kayu purba yang terancam punah untuk diarsipkan secara terbuka.',
    benefits: ['Akses Database Etnografi', 'Kolaborasi Antropolog', 'Publikasi Jurnal Budaya'],
    imageUrl:
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
  },
];

export default function ProgramsSection() {
  const { t } = useLanguage();
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formNote, setFormNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string }>({});

  const handleOpenRsvp = (program: ProgramItem) => {
    setSelectedProgram(program);
    setIsSubmitted(false);
    setFormErrors({});
  };

  const handleCloseModal = () => {
    setSelectedProgram(null);
    setIsSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; email?: string } = {};

    if (!formName.trim()) {
      errors.name = t('programs.errorName');
    }
    if (!formEmail.trim() || !formEmail.includes('@')) {
      errors.email = t('programs.errorEmail');
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitted(true);
  };

  const inputClass = (hasError?: boolean) =>
    `w-full bg-transparent border-0 border-b px-0 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors ${
      hasError
        ? 'border-red-400'
        : 'border-[var(--border-color)] focus:border-[var(--text-primary)]'
    }`;

  return (
    <section
      className="relative w-full min-w-full overflow-x-clip border-t border-[var(--border-color)] py-24 md:py-36"
      id="program"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[var(--bg-primary)]" />
      <div className="relative max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-10 border-b border-[var(--border-color)]">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-[var(--accent)] mb-4 block">
              {t('programs.eyebrow')}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[var(--text-primary)] leading-[1.15]">
              {t('programs.heading')}
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] max-w-md font-light leading-relaxed">
            {t('programs.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-[var(--border-color)]">
          {PROGRAMS_DATA.map((prog, idx) => (
            <div
              key={prog.id}
              className={`group flex flex-col ${idx > 0 ? 'md:pl-8' : ''} ${
                idx < PROGRAMS_DATA.length - 1 ? 'md:pr-8' : ''
              } ${idx > 0 ? 'pt-10 md:pt-0' : ''}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--bg-secondary)] mb-5">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-[1.03] transition-transform duration-700 filter brightness-[0.92] group-hover:brightness-100"
                  style={{ backgroundImage: `url('${prog.imageUrl}')` }}
                />
              </div>

              <div className="flex flex-col flex-1">
                <span className="text-[10px] uppercase font-medium tracking-widest text-[var(--accent)] mb-2 block">
                  {prog.category}
                </span>
                <h3 className="font-serif text-xl font-normal text-[var(--text-primary)] mb-3 leading-snug">
                  {prog.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 font-light">
                  {prog.description}
                </p>

                <div className="text-xs text-[var(--text-secondary)] font-light mb-5 space-y-1">
                  <p>{prog.schedule} &middot; {prog.location}</p>
                  <p className="text-[var(--accent)]">{prog.seats}</p>
                </div>

                <p className="text-[11px] text-[var(--text-muted)] font-light leading-relaxed mb-8">
                  {prog.benefits.join('  /  ')}
                </p>

                <button
                  onClick={() => handleOpenRsvp(prog)}
                  className="group/btn mt-auto inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-1 self-start cursor-pointer hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
                  type="button"
                >
                  <span>{t('programs.registerBtn')}</span>
                  <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProgram && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg bg-[var(--bg-primary)] border border-[var(--border-color)] p-8 sm:p-10 max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleCloseModal}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors focus:outline-none cursor-pointer"
              aria-label={t('artworks.closeDialog')}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            {!isSubmitted ? (
              <div>
                <span className="text-[11px] uppercase font-medium tracking-widest text-[var(--accent)] block mb-2">
                  {t('programs.rsvpEyebrow')}
                </span>
                <h3 className="font-serif text-2xl font-normal text-[var(--text-primary)] mb-2 leading-snug">
                  {selectedProgram.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mb-8 font-light pb-8 border-b border-[var(--border-color)]">
                  {selectedProgram.schedule} &bull; {selectedProgram.location}
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-[var(--text-muted)] mb-1.5">
                        {t('programs.fullName')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder={t('contact.fullNamePlaceholder')}
                        className={inputClass(!!formErrors.name)}
                      />
                      {formErrors.name && (
                        <span className="text-[10px] text-red-400 mt-1.5 block">{formErrors.name}</span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs text-[var(--text-muted)] mb-1.5">
                        {t('programs.email')} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="nama@domain.com"
                        className={inputClass(!!formErrors.email)}
                      />
                      {formErrors.email && (
                        <span className="text-[10px] text-red-400 mt-1.5 block">{formErrors.email}</span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs text-[var(--text-muted)] mb-1.5">
                        {t('programs.phone')}
                      </label>
                      <input
                        type="tel"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="+62 8xx xxxx xxxx"
                        className={inputClass()}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs text-[var(--text-muted)] mb-1.5">
                        {t('programs.motivation')}
                      </label>
                      <textarea
                        rows={3}
                        value={formNote}
                        onChange={(e) => setFormNote(e.target.value)}
                        placeholder={t('programs.motivationPlaceholder')}
                        className={`${inputClass()} resize-none`}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="group/btn inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-1 cursor-pointer hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
                  >
                    <span>{t('programs.submit')}</span>
                    <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="py-6">
                <h3 className="font-serif text-2xl font-normal text-[var(--text-primary)] mb-3">
                  {t('programs.successTitle')}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8 font-light">
                  {formName && (
                    <>
                      <span className="text-[var(--text-primary)]">{formName}</span>
                      {', '}
                    </>
                  )}
                  <span className="text-[var(--accent)]">{selectedProgram.title}</span>
                  {' → '}
                  <span className="text-[var(--text-primary)]">{formEmail}</span>
                </p>
                <button
                  onClick={handleCloseModal}
                  className="text-xs font-medium uppercase tracking-widest text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-1 cursor-pointer hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
                  type="button"
                >
                  {t('programs.done')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}