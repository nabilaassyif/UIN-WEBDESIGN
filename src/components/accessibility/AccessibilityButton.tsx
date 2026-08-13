'use client';

interface AccessibilityButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function AccessibilityButton({
  isOpen,
  onClick,
}: AccessibilityButtonProps) {
  return (
    <button
      aria-controls="accessibility-panel"
      aria-expanded={isOpen}
      aria-label="Accessibility"
      className="w-14 h-14 rounded-full bg-surface-container-high border border-white/10 shadow-lg flex items-center justify-center text-primary hover:text-secondary hover:border-secondary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary group"
      id="accessibility-btn"
      onClick={onClick}
      title="Accessibility"
      type="button"
    >
      <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
        accessibility_new
      </span>
    </button>
  );
}