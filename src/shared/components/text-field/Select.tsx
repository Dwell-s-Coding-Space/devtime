import { Fragment, KeyboardEvent, useEffect, useId, useRef, useState } from 'react';
import ChevronUpIcon from '@/src/shared/assets/svg/chevron-up.svg';
import { cn } from '@/src/lib/utils';

const Select = ({
  value,
  placeholder,
  options,
  onChange,
}: {
  value?: string;
  placeholder: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) => {
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedOptionIdx, setFocusedOptionIdx] = useState(-1);

  const optionId = (idx: number) => `${listboxId}-option-${idx}`;

  const openList = () => {
    setIsOpen(true);
    const selectedIdx = value ? options.indexOf(value) : 0;
    setFocusedOptionIdx(selectedIdx);
  };

  const closeList = () => {
    setIsOpen(false);
    setFocusedOptionIdx(-1);
    buttonRef.current?.focus();
  };

  const selectOption = (option: string) => {
    onChange(option);
    closeList();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        if (!isOpen) {
          openList();
        } else {
          setFocusedOptionIdx(prev => Math.min(options.length - 1, prev + 1));
        }
        break;
      }

      case 'ArrowUp': {
        e.preventDefault();
        if (!isOpen) return;
        setFocusedOptionIdx(prev => Math.max(0, prev - 1));
        break;
      }

      case 'Home': {
        e.preventDefault();
        if (!isOpen) return;
        setFocusedOptionIdx(0);
        break;
      }

      case 'End': {
        e.preventDefault();
        if (!isOpen) return;
        setFocusedOptionIdx(options.length - 1);
        break;
      }

      case 'Enter':
      case ' ': {
        e.preventDefault();
        if (!isOpen) {
          openList();
        } else {
          selectOption(options[focusedOptionIdx]);
        }
        break;
      }

      case 'Escape': {
        e.preventDefault();
        if (!isOpen) return;
        closeList();
        break;
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeList();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        role="combobox"
        type="button"
        ref={buttonRef}
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-haspopup="listbox"
        aria-activedescendant={
          isOpen && focusedOptionIdx >= 0 ? optionId(focusedOptionIdx) : undefined
        }
        onClick={isOpen ? closeList : openList}
        onKeyDown={handleKeyDown}
        className={cn(
          'body-m bg-background-gray-light flex h-11 w-full items-center gap-2 rounded-[5px] p-3 pl-4',
          value ? 'text-text-g600' : 'text-text-disabled-300'
        )}
      >
        <span className="flex-1 text-left">{value || placeholder}</span>
        <ChevronUpIcon
          className={cn(
            'text-content-secondary h-6 w-6 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <ul
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          aria-orientation="vertical"
          className="bg-background-white border-border-gray absolute z-10 mt-2 flex w-full flex-col rounded-[5px] border"
        >
          {options.map((option, idx) => {
            const isSelected = value === option;
            const isFocused = focusedOptionIdx === idx;

            return (
              <Fragment key={option}>
                <li
                  role="option"
                  id={optionId(idx)}
                  aria-selected={isSelected}
                  onMouseEnter={() => setFocusedOptionIdx(idx)}
                  onClick={() => selectOption(option)}
                  className={cn(
                    'cursor-pointer px-3 py-4',
                    isSelected && 'text-text-secondary body-b',
                    isFocused && 'outline-border-primary z-10 rounded-[5px] outline'
                  )}
                >
                  {option}
                </li>
                {idx !== options.length - 1 && <div className="bg-border-gray mx-3 h-px w-auto" />}
              </Fragment>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
