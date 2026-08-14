'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  onMobileMenuClick?: () => void;
}

export default function Header({ onMobileMenuClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -60% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const navLinksIds = ['beranda', 'tentang-kami', 'program', 'dokumentasi', 'kontak'];
    navLinksIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { href: '#beranda', label: 'Beranda', id: 'beranda' },
    { href: '#tentang-kami', label: 'Tentang Kami', id: 'tentang-kami' },
    { href: '#program', label: 'Program', id: 'program' },
    { href: '#dokumentasi', label: 'Dokumentasi', id: 'dokumentasi' },
    { href: '#kontak', label: 'Kontak', id: 'kontak' },
  ];

  return (
    <header
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-700 ease-in-out ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-white/10 py-4 shadow-sm'
          : 'bg-black border-b border-white/5 py-6'
      }`}
      id="mainNav"
    >
      {/* Container diubah: Menghapus max-w dan memperlebar padding (px-8 md:px-16 lg:px-24) agar elemen terdorong ke pinggir */}
      <div className="flex justify-between items-center px-8 md:px-16 lg:px-24 w-full mx-auto">
        
        {/* Brand / Logo - Classic Look (Putih) */}
        <Link
          href="#beranda"
          className="group flex items-center"
        >
          <span className="font-serif text-2xl tracking-[0.2em] text-white uppercase">
            Kalimantan
          </span>
        </Link>

        {/* Navigation Links (Desktop) - Modern Typography (Putih/Abu-abu) */}
        <nav className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative group py-2"
              >
                <span 
                  className={`text-[12px] font-semibold tracking-[0.15em] uppercase transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                  }`}
                >
                  {link.label}
                </span>
                
                {/* Thin Elegant Classic Underline (Putih) */}
                <span 
                  className={`absolute bottom-0 left-0 h-[1px] bg-white transition-all duration-500 ease-out ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Trailing Action - Classic Outline Button (Hitam Putih) */}
        <div className="flex items-center gap-4">
          <Link
            href="#karya-pilihan"
            className="hidden md:inline-flex items-center justify-center px-7 py-2.5 border border-white bg-transparent text-[12px] font-semibold tracking-[0.1em] uppercase text-white transition-all duration-500 hover:bg-white hover:text-black"
          >
            Jelajahi Karya
          </Link>

          {/* Mobile Menu Button - Minimalist Classic Lines (Putih) */}
          <button
            aria-label="Toggle Menu"
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 focus:outline-none"
            onClick={onMobileMenuClick}
          >
            <span className="w-6 h-[1px] bg-white block transition-all"></span>
            <span className="w-6 h-[1px] bg-white block transition-all"></span>
            <span className="w-6 h-[1px] bg-white block transition-all"></span>
          </button>
        </div>
      </div>
    </header>
  );
}