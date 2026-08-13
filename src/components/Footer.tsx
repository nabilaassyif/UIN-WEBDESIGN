import Link from 'next/link';

export default function Footer() {
  const navLinks = [
    { href: '#beranda', label: 'Beranda' },
    { href: '#tentang-kami', label: 'Tentang Kami' },
    { href: '#program', label: 'Program' },
    { href: '#dokumentasi', label: 'Dokumentasi' },
    { href: '#kontak', label: 'Kontak' },
  ];

  return (
    <footer
      className="bg-surface-container-lowest w-full border-t border-white/5 py-margin-desktop px-margin-mobile md:px-margin-desktop"
      id="kontak"
    >
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-start gap-gutter">
        {/* Brand & Description */}
        <div className="max-w-xs">
          <Link
            href="#beranda"
            className="font-display-lg text-headline-md text-primary mb-6 block hover:opacity-80 transition-opacity"
          >
            KALIMANTAN
          </Link>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">
            Preserving the raw, organic soul of Kalimantan craftsmanship through disciplined
            contemporary curation.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-4">
          <span className="font-label-caps text-label-caps text-primary mb-2">Navigasi</span>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <span className="font-label-caps text-label-caps text-primary mb-2">Hubungi Kami</span>
          <a
            href="mailto:info@kalimantanheritage.org"
            className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors duration-300"
          >
            info@kalimantanheritage.org
          </a>
          <p className="font-body-md text-body-md text-on-surface-variant mt-4">
            Jl. Pahlawan No. 45
            <br />
            Palangka Raya, Kalimantan Tengah
            <br />
            Indonesia
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-container-max mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body-md text-body-md text-on-surface-variant">
          © 2024 Kalimantan Cultural Organization. Preserving Ancestral Wisdom.
        </p>
        <div className="flex gap-4">
          <a
            aria-label="Share"
            className="text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">share</span>
          </a>
        </div>
      </div>
    </footer>
  );
}