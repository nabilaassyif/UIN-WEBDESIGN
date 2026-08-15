'use client';

interface Option {
  value: string;
  label: string;
  subLabel?: string;
}

interface TextSizeGroupProps {
  label: string;
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default function TextSizeGroup({
  label,
  options,
  selectedValue,
  onSelect,
}: TextSizeGroupProps) {
  return (
    <div className="mb-3">
      <span className="block text-[11px] text-[var(--text-secondary)] mb-1.5">{label}</span>
      <div
        className="grid gap-1.5 p-1 bg-[var(--bg-input)] border border-[var(--border-color)] rounded-lg"
        style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
        role="group"
        aria-label={label}
      >
        {options.map((opt) => {
          const isActive = selectedValue === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              aria-pressed={isActive}
              className={`flex flex-col items-center justify-center py-2 rounded-md text-xs transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                isActive
                  ? 'bg-[var(--accent)] text-[var(--accent-contrast)] font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
              }`}
            >
              <span className="leading-none">{opt.label}</span>
              {opt.subLabel && (
                <span
                  className={`text-[9px] mt-0.5 leading-none ${
                    isActive ? 'text-[var(--accent-contrast)]/80' : 'text-[var(--text-muted)]'
                  }`}
                >
                  {opt.subLabel}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
