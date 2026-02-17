import { Fragment, KeyboardEvent, useCallback, useEffect, useId, useRef, useState } from 'react';

import { cn } from '@/src/shared/utils/cn';

import { ChevronUpIcon } from '../../assets/svg';

interface SelectProps {
  id: string;
  value?: string;
  placeholder: string;
  options: readonly string[];
  onChange: (value: string) => void;
}

const Select = ({ id, value, placeholder, options, onChange }: SelectProps) => {
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedOptionIdx, setFocusedOptionIdx] = useState(-1);

  const optionId = useCallback((idx: number) => `${listboxId}-option-${idx}`, [listboxId]);

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

  useEffect(() => {
    if (!isOpen || focusedOptionIdx < 0) return;
    const el = document.getElementById(optionId(focusedOptionIdx));
    el?.scrollIntoView({ block: 'nearest' });
  }, [isOpen, focusedOptionIdx, optionId]);

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        id={id}
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
          value ? 'text-text-g700' : 'text-text-placeholder'
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

      <ul
        id={listboxId}
        role="listbox"
        tabIndex={-1}
        aria-orientation="vertical"
        className={cn(
          'bg-background-white border-border-gray absolute z-10 mt-2 max-h-[400px] w-full flex-col overflow-y-auto rounded-[5px] border',
          isOpen ? 'flex' : 'hidden'
        )}
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
                  isFocused && 'bg-background-primary-light z-10 rounded-[5px] px-3'
                )}
              >
                {option}
              </li>
              {idx !== options.length - 1 && <div className="bg-border-gray mx-3 h-px w-auto" />}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default Select;
