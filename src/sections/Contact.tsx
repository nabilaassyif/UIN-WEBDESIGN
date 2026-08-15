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

  const inputClass = (hasError?: boolean) =>
    `w-full bg-transparent border-0 border-b px-0 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors ${
      hasError
        ? 'border-red-400'
        : 'border-[var(--border-color)] focus:border-[var(--text-primary)]'
    }`;

  return (
    <section
      className="relative w-full min-w-full overflow-x-clip border-t border-[var(--border-color)] py-24 md:py-40"
      id="kontak"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[var(--bg-primary)]" />
      <div className="relative max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-5">
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-[var(--accent)] mb-4 block">
              {t('contact.eyebrow')}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] font-normal text-[var(--text-primary)] leading-[1.15] mb-5">
              {t('contact.heading')}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] font-light leading-relaxed mb-14 max-w-md">
              {t('contact.description')}
            </p>

            <div className="divide-y divide-[var(--border-color)] border-t border-[var(--border-color)]">
              <div className="flex items-baseline justify-between gap-6 py-5">
                <h3 className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] shrink-0">
                  {t('contact.addressTitle')}
                </h3>
                <p className="text-sm text-[var(--text-primary)] font-light text-right leading-relaxed">
                  Jl. Pahlawan No. 45, Palangka Raya, Kalimantan Tengah 73111
                </p>
              </div>

              <div className="flex items-baseline justify-between gap-6 py-5">
                <h3 className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] shrink-0">
                  {t('contact.emailTitle')}
                </h3>
                <a
                  href="mailto:info@kalimantanheritage.org"
                  className="text-sm text-[var(--text-primary)] font-light hover:text-[var(--accent)] transition-colors text-right"
                >
                  info@kalimantanheritage.org
                </a>
              </div>

              <div className="flex items-baseline justify-between gap-6 py-5">
                <h3 className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] shrink-0">
                  {t('contact.hoursTitle')}
                </h3>
                <p className="text-sm text-[var(--text-primary)] font-light text-right leading-relaxed">
                  {t('contact.hoursValue')}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {isSuccess ? (
              <div className="py-16 border-t border-[var(--border-color)]">
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[var(--text-primary)] mb-3">
                  {t('contact.successTitle')}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-md mb-8 font-light leading-relaxed">
                  {t('contact.successBody')}
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="text-xs font-medium uppercase tracking-widest text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-1 cursor-pointer hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
                  type="button"
                >
                  {t('contact.sendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border-t border-[var(--border-color)] pt-2" noValidate>
                <div className="flex items-center justify-between mb-8 mt-6">
                  <span className="text-[11px] uppercase font-medium tracking-widest text-[var(--text-muted)]">
                    {t('contact.formTitle')}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">{t('contact.required')}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7 mb-7">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="fullName"
                      className="block text-xs text-[var(--text-muted)] mb-1.5"
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
                      className={inputClass(!!errors.fullName)}
                    />
                    {errors.fullName && (
                      <span className="text-[10px] text-red-400 mt-1.5 block">{errors.fullName}</span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs text-[var(--text-muted)] mb-1.5"
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
                      className={inputClass(!!errors.email)}
                    />
                    {errors.email && (
                      <span className="text-[10px] text-red-400 mt-1.5 block">{errors.email}</span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs text-[var(--text-muted)] mb-1.5"
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
                      className={inputClass()}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="subject"
                      className="block text-xs text-[var(--text-muted)] mb-1.5"
                    >
                      {t('contact.category')}
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-transparent border-0 border-b border-[var(--border-color)] px-0 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors"
                    >
                      <option value="kemitraan" className="bg-[var(--bg-primary)] text-[var(--text-primary)]">
                        {t('contact.catKemitraan')}
                      </option>
                      <option value="koleksi" className="bg-[var(--bg-primary)] text-[var(--text-primary)]">
                        {t('contact.catKoleksi')}
                      </option>
                      <option value="lokakarya" className="bg-[var(--bg-primary)] text-[var(--text-primary)]">
                        {t('contact.catLokakarya')}
                      </option>
                      <option value="riset" className="bg-[var(--bg-primary)] text-[var(--text-primary)]">
                        {t('contact.catRiset')}
                      </option>
                      <option value="lainnya" className="bg-[var(--bg-primary)] text-[var(--text-primary)]">
                        {t('contact.catLainnya')}
                      </option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="block text-xs text-[var(--text-muted)] mb-1.5"
                    >
                      {t('contact.message')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t('contact.messagePlaceholder')}
                      className={`${inputClass(!!errors.message)} resize-none`}
                    />
                    {errors.message && (
                      <span className="text-[10px] text-red-400 mt-1.5 block">{errors.message}</span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-1 cursor-pointer hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors disabled:opacity-50"
                >
                  <span>{isSubmitting ? t('contact.submitting') : t('contact.submit')}</span>
                  {!isSubmitting && (
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}