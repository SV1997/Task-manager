// src/components/MultiSelect.tsx
import { useState, useRef, useEffect } from 'react';
import './MultiSelect.css';

interface MultiSelectProps {
  options: readonly string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  label?: string;
}

export const MultiSelect = ({
  options,
  selected,
  onChange,
  placeholder = 'Select options',
  label,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const handleSelectAll = () => {
    if (selected.length === options.length) {
      onChange([]);
    } else {
      onChange([...options]);
    }
  };

  const getDisplayText = () => {
    if (selected.length === 0) return placeholder;
    if (selected.length === 1) return selected[0];
    return `${selected.length} selected`;
  };

  return (
    <div className="multi-select-container" ref={containerRef}>
      {label && <label className="multi-select-label">{label}</label>}
      
      <div
        className={`multi-select-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="multi-select-text">{getDisplayText()}</span>
        <svg
          className={`multi-select-arrow ${isOpen ? 'rotate' : ''}`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="multi-select-dropdown">
          <div className="multi-select-option select-all" onClick={handleSelectAll}>
            <input
              type="checkbox"
              checked={selected.length === options.length}
              onChange={() => {}}
              className="multi-select-checkbox"
            />
            <span className="multi-select-option-text">
              {selected.length === options.length ? 'Deselect All' : 'Select All'}
            </span>
          </div>
          <div className="multi-select-divider" />
          {options.map((option) => (
            <div
              key={option}
              className="multi-select-option"
              onClick={() => handleToggle(option)}
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => {}}
                className="multi-select-checkbox"
              />
              <span className="multi-select-option-text">{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
