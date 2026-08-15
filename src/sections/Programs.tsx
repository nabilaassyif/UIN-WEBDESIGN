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

  return (
    <section
      className="relative w-full min-w-full overflow-x-clip border-t border-[var(--border-color)] py-24 md:py-36"
      id="program"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[var(--bg-primary)]" />
      <div className="relative max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[var(--accent)] mb-3 block">
              {t('programs.eyebrow')}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[var(--text-primary)]">
              {t('programs.heading')}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md font-light leading-relaxed">
            {t('programs.description')}
          </p>
        </div>

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROGRAMS_DATA.map((prog) => (
            <div
              key={prog.id}
              className="border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[var(--border-color-strong)] transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl group"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-[var(--bg-tertiary)]">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                  style={{ backgroundImage: `url('${prog.imageUrl}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-transparent to-transparent opacity-90" />
                <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-[var(--overlay-scrim)] backdrop-blur-md border border-[var(--border-color)] text-[9px] uppercase font-semibold text-[var(--accent)] tracking-widest">
                  {prog.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-serif text-xl font-normal text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent)] transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-5 font-light">
                    {prog.description}
                  </p>

                  <div className="space-y-2 py-3 border-y border-[var(--border-color)]/60 text-[11px] text-[var(--text-secondary)] mb-5 font-light">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px] text-[var(--accent)]">
                        calendar_month
                      </span>
                      <span>{prog.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px] text-[var(--accent)]">
                        location_on
                      </span>
                      <span>{prog.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px] text-[var(--accent)]">
                        group
                      </span>
                      <span className="text-[var(--accent)] font-normal">{prog.seats}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {prog.benefits.map((b, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 bg-white/5 border border-[var(--border-color)] text-[var(--text-muted)]"
                      >
                        ✓ {b}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleOpenRsvp(prog)}
                  className="w-full py-2.5 border border-[var(--border-color-strong)] bg-transparent hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] hover:border-[var(--text-primary)] text-[var(--text-primary)] text-xs font-medium uppercase tracking-[0.1em] transition-all duration-300 rounded-[2px] flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
                  type="button"
                >
                  <span>{t('programs.registerBtn')}</span>
                  <span className="text-sm">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal RSVP */}
      {selectedProgram && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[var(--overlay-scrim)] backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg bg-[var(--bg-tertiary)] border border-[var(--border-color-strong)] rounded-xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] cursor-pointer"
              aria-label={t('artworks.closeDialog')}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            {!isSubmitted ? (
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[var(--accent)] block mb-1">
                  {t('programs.rsvpEyebrow')}
                </span>
                <h3 className="font-serif text-2xl font-normal text-[var(--text-primary)] mb-2">
                  {selectedProgram.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mb-6 font-light">
                  {selectedProgram.schedule} &bull; {selectedProgram.location}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                      {t('programs.fullName')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder={t('contact.fullNamePlaceholder')}
                      className={`w-full bg-[var(--bg-input)] border rounded-[2px] px-3.5 py-2 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]/50 ${
                        formErrors.name ? 'border-red-400' : 'border-[var(--border-color)]'
                      }`}
                    />
                    {formErrors.name && (
                      <span className="text-[10px] text-red-400 mt-1 block">{formErrors.name}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                      {t('programs.email')} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="nama@domain.com"
                      className={`w-full bg-[var(--bg-input)] border rounded-[2px] px-3.5 py-2 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]/50 ${
                        formErrors.email ? 'border-red-400' : 'border-[var(--border-color)]'
                      }`}
                    />
                    {formErrors.email && (
                      <span className="text-[10px] text-red-400 mt-1 block">{formErrors.email}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                      {t('programs.phone')}
                    </label>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="+62 8xx xxxx xxxx"
                      className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-[2px] px-3.5 py-2 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                      {t('programs.motivation')}
                    </label>
                    <textarea
                      rows={3}
                      value={formNote}
                      onChange={(e) => setFormNote(e.target.value)}
                      placeholder={t('programs.motivationPlaceholder')}
                      className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-[2px] p-3 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]/50 resize-none font-light"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity rounded-[2px] mt-4 cursor-pointer"
                  >
                    {t('programs.submit')}
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <span className="material-symbols-outlined text-4xl text-[var(--accent)] mb-3 block">
                  check_circle
                </span>
                <h3 className="font-serif text-2xl font-normal text-[var(--text-primary)] mb-2">
                  {t('programs.successTitle')}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-sm mx-auto mb-6 font-light">
                  {formName && (
                    <>
                      <strong className="text-[var(--text-primary)]">{formName}</strong>
                      {', '}
                    </>
                  )}
                  <strong className="text-[var(--accent)]">{selectedProgram.title}</strong>
                  {' → '}
                  <strong className="text-[var(--text-primary)]">{formEmail}</strong>
                </p>
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold uppercase tracking-wider rounded-[2px] cursor-pointer"
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
