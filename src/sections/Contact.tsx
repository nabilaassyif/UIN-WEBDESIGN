'use client';

import { useState } from 'react';
import { useLanguage } from '../lib/i18n/LanguageContext';

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    subject: 'kemitraan',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.fullName.trim()) {
      errs.fullName = t('contact.errorFullName');
    } else if (formData.fullName.trim().length < 3) {
      errs.fullName = t('contact.errorFullNameShort');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = t('contact.errorEmailRequired');
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = t('contact.errorEmailInvalid');
    }

    if (!formData.message.trim()) {
      errs.message = t('contact.errorMessageRequired');
    } else if (formData.message.trim().length < 10) {
      errs.message = t('contact.errorMessageShort');
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: 'kemitraan',
        message: '',
      });
    }, 700);
  };

  return (
    <section
      className="relative w-full min-w-full overflow-x-clip border-t border-[var(--border-color)] py-24 md:py-36"
      id="kontak"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[var(--bg-primary)]" />
      <div className="relative max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column */}
        <div className="lg:col-span-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[var(--accent)] mb-3 block">
            {t('contact.eyebrow')}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[var(--text-primary)] leading-[1.2] mb-4">
            {t('contact.heading')}
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed mb-8">
            {t('contact.description')}
          </p>

          {/* Contact Details */}
          <div className="space-y-4">
            <div className="p-4 border border-[var(--border-color)] bg-[var(--bg-secondary)] flex items-start gap-4">
              <div className="w-9 h-9 bg-white/5 border border-[var(--border-color)] flex items-center justify-center text-[var(--accent)] shrink-0">
                <span className="material-symbols-outlined text-[18px]">location_on</span>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-wider text-[var(--text-primary)] font-medium">
                  {t('contact.addressTitle')}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5 font-light">
                  Jl. Pahlawan No. 45, Palangka Raya, Kalimantan Tengah 73111, Indonesia
                </p>
              </div>
            </div>

            <div className="p-4 border border-[var(--border-color)] bg-[var(--bg-secondary)] flex items-start gap-4">
              <div className="w-9 h-9 bg-white/5 border border-[var(--border-color)] flex items-center justify-center text-[var(--accent)] shrink-0">
                <span className="material-symbols-outlined text-[18px]">mail</span>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-wider text-[var(--text-primary)] font-medium">
                  {t('contact.emailTitle')}
                </h3>
                <a
                  href="mailto:info@kalimantanheritage.org"
                  className="text-xs text-[var(--accent)] hover:underline mt-0.5 block"
                >
                  info@kalimantanheritage.org
                </a>
              </div>
            </div>

            <div className="p-4 border border-[var(--border-color)] bg-[var(--bg-secondary)] flex items-start gap-4">
              <div className="w-9 h-9 bg-white/5 border border-[var(--border-color)] flex items-center justify-center text-[var(--accent)] shrink-0">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-wider text-[var(--text-primary)] font-medium">
                  {t('contact.hoursTitle')}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5 font-light">
                  {t('contact.hoursValue')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-6">
          <div className="p-6 sm:p-8 border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-2xl">
            {isSuccess ? (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-4xl text-[var(--accent)] mb-3 block">
                  check_circle
                </span>
                <h3 className="font-serif text-2xl font-normal text-[var(--text-primary)] mb-2">
                  {t('contact.successTitle')}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto mb-6 font-light leading-relaxed">
                  {t('contact.successBody')}
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2.5 bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold uppercase tracking-wider rounded-[2px] cursor-pointer"
                  type="button"
                >
                  {t('contact.sendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs uppercase font-bold tracking-widest text-[var(--accent)]">
                    {t('contact.formTitle')}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">{t('contact.required')}</span>
                </div>

                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5"
                  >
                    {t('contact.fullName')} *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={t('contact.fullNamePlaceholder')}
                    className={`w-full bg-[var(--bg-input)] border rounded-[2px] px-3.5 py-2.5 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors ${
                      errors.fullName ? 'border-red-400' : 'border-[var(--border-color)]'
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-[10px] text-red-400 mt-1 block">{errors.fullName}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5"
                    >
                      {t('contact.email')} *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nama@domain.com"
                      className={`w-full bg-[var(--bg-input)] border rounded-[2px] px-3.5 py-2.5 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors ${
                        errors.email ? 'border-red-400' : 'border-[var(--border-color)]'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[10px] text-red-400 mt-1 block">{errors.email}</span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5"
                    >
                      {t('contact.phone')}
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+62 8xx xxxx xxxx"
                      className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-[2px] px-3.5 py-2.5 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5"
                  >
                    {t('contact.category')}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-[2px] px-3.5 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors"
                  >
                    <option value="kemitraan" className="bg-[var(--bg-input)] text-[var(--text-primary)]">
                      {t('contact.catKemitraan')}
                    </option>
                    <option value="koleksi" className="bg-[var(--bg-input)] text-[var(--text-primary)]">
                      {t('contact.catKoleksi')}
                    </option>
                    <option value="lokakarya" className="bg-[var(--bg-input)] text-[var(--text-primary)]">
                      {t('contact.catLokakarya')}
                    </option>
                    <option value="riset" className="bg-[var(--bg-input)] text-[var(--text-primary)]">
                      {t('contact.catRiset')}
                    </option>
                    <option value="lainnya" className="bg-[var(--bg-input)] text-[var(--text-primary)]">
                      {t('contact.catLainnya')}
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5"
                  >
                    {t('contact.message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.messagePlaceholder')}
                    className={`w-full bg-[var(--bg-input)] border rounded-[2px] p-3 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors resize-none font-light ${
                      errors.message ? 'border-red-400' : 'border-[var(--border-color)]'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-[10px] text-red-400 mt-1 block">{errors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity rounded-[2px] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>{t('contact.submitting')}</span>
                  ) : (
                    <>
                      <span>{t('contact.submit')}</span>
                      <span className="text-sm">→</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
