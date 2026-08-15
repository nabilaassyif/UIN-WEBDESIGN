'use client';

interface ToggleButtonProps {
  label: string;
  description?: string;
  isActive: boolean;
  onClick: () => void;
}

export default function ToggleButton({
  label,
  description,
  isActive,
  onClick,
}: ToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`w-full flex items-center justify-between gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
        isActive
          ? 'border-[var(--accent)]/60 bg-[var(--accent)]/10 shadow-[inset_0_0_0_1px_rgba(255,179,159,0.08)]'
          : 'border-[var(--border-color)] bg-[var(--bg-input)] hover:border-[var(--border-color-strong)] hover:bg-[var(--bg-secondary)]'
      }`}
    >
      <span className="min-w-0">
        <span
          className={`block text-xs font-medium leading-snug ${
            isActive ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'
          }`}
        >
          {label}
        </span>
        {description && (
          <span className="block text-[10px] text-[var(--text-muted)] mt-1 font-light leading-snug">
            {description}
          </span>
        )}
      </span>

      <span
        aria-hidden="true"
        className={`relative shrink-0 w-10 h-[22px] rounded-full border transition-colors ${
          isActive
            ? 'bg-[var(--accent)] border-[var(--accent)]'
            : 'bg-[var(--bg-tertiary)] border-[var(--border-color-strong)]'
        }`}
      >
        <span
          className={`absolute top-[2px] left-[2px] w-4 h-4 rounded-full bg-[var(--bg-elevated)] shadow-sm transition-transform duration-200 ${
            isActive ? 'translate-x-[18px]' : 'translate-x-0'
          }`}
        />
      </span>
    </button>
  );
}
