'use client';

interface ButtonOption {
  value: string;
  label: string;
}

interface ButtonGroupProps {
  options: ButtonOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  label: string;
}

export default function ButtonGroup({
  options,
  selectedValue,
  onSelect,
  label,
}: ButtonGroupProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-on-surface-variant mb-2 font-body-md">
        {label}
      </label>
      <div className="flex gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            className={`flex-1 py-2 rounded transition-colors font-body-md text-sm min-h-[44px] ${
              selectedValue === option.value
                ? 'border border-secondary text-secondary'
                : 'border border-white/10 hover:border-secondary hover:text-secondary'
            }`}
            type="button"
            onClick={() => onSelect(option.value)}
            aria-pressed={selectedValue === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}