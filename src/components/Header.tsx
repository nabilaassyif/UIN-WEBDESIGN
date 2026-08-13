'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  onMobileMenuClick?: () => void;
}

export default function Header({ onMobileMenuClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#beranda', label: 'Beranda' },
    { href: '#tentang-kami', label: 'Tentang Kami' },
    { href: '#program', label: 'Program' },
    { href: '#dokumentasi', label: 'Dokumentasi' },
    { href: '#kontak', label: 'Kontak' },
  ];

  return (
    <header
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 ease-in-out border-b ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-lg border-white/5'
          : 'bg-background/80 backdrop-blur-md border-white/10'
      }`}
      id="mainNav"
    >
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-6 w-full max-w-container-max mx-auto">
        {/* Brand */}
        <Link
          href="#beranda"
          className="font-display-lg text-headline-md tracking-tighter text-primary hover:opacity-80 transition-opacity"
        >
          KALIMANTAN
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex gap-gutter items-center">
          {navLinks.map((link, idx) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-label-caps text-label-caps transition-all duration-300 hover:text-primary ${
                idx === 0
                  ? 'text-primary border-b border-primary pb-1'
                  : 'text-on-surface-variant'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Trailing Action */}
        <Link
          href="#karya-pilihan"
          className="hidden md:inline-flex items-center justify-center px-6 py-3 border border-white/10 text-primary font-label-caps text-label-caps hover:bg-white/5 transition-colors duration-300"
        >
          Jelajahi Karya
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          aria-label="Menu"
          className="md:hidden text-primary p-2"
          onClick={onMobileMenuClick}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  );
}