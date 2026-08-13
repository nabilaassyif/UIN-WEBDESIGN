'use client';

interface ToggleButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function ToggleButton({ label, isActive, onClick }: ToggleButtonProps) {
  return (
    <button
      className={`w-full flex items-center justify-between p-3 border rounded hover:border-secondary hover:text-secondary transition-colors font-body-md text-sm min-h-[44px] group ${
        isActive ? 'border-secondary text-secondary' : 'border-white/10'
      }`}
      onClick={onClick}
      type="button"
      aria-pressed={isActive}
    >
      <span>{label}</span>
      
      {/* Wadah Toggle */}
      <div
        className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${
          isActive ? 'bg-secondary' : 'bg-surface-container'
        }`}
      >
        {/* Lingkaran (Knob) Toggle */}
        <div
          className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform duration-300 ${
            isActive ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
    </button>
  );
}