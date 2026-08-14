'use client';

import { useState, useEffect } from 'react';

interface AccessibilityButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function AccessibilityButton({
  isOpen,
  onClick,
}: AccessibilityButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Efek untuk memunculkan tooltip secara otomatis
  useEffect(() => {
    // Munculkan 2 detik setelah halaman dimuat
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2000);

    // (Opsional) Sembunyikan otomatis setelah 10 detik agar layar tetap bersih
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Handler saat tombol diklik
  const handleClick = () => {
    setShowTooltip(false); // Hilangkan tooltip selamanya saat user sudah mengklik
    onClick();
  };

  return (
    <div className="relative flex flex-col items-end group">
      {/* 
        Tooltip Nudge 
        Menggunakan Tailwind 'after:' untuk membuat segitiga kecil di bawah kotak
      */}
      <div
        className={`absolute -top-14 right-0 bg-secondary text-surface-container-lowest px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap shadow-xl transition-all duration-500 pointer-events-none
          after:content-[''] after:absolute after:-bottom-2 after:right-5 after:border-4 after:border-transparent after:border-t-secondary
          ${showTooltip && !isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
        `}
      >
        Sesuaikan Tampilan ✨
      </div>

      {/* Tombol Utama */}
      <button
        aria-controls="accessibility-panel"
        aria-expanded={isOpen}
        aria-label="Sesuaikan Tampilan"
        className="w-14 h-14 rounded-full bg-surface-container-high border border-white/10 shadow-lg flex items-center justify-center text-primary hover:text-secondary hover:border-secondary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary"
        id="accessibility-btn"
        onClick={handleClick}
        title="Sesuaikan Tampilan"
        type="button"
      >
        <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
          accessibility_new
        </span>
      </button>
    </div>
  );
}