import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import { PostTechStackResponse } from '@/src/features/mypage/mypage.schema';
import { cn } from '@/src/shared/utils/cn';

import Input from './Input';

interface AutoCompleteProps {
  placeholder: string;
  options: string[];
  onSelect: (value: string) => void;
  onAdd?: (value: string) => Promise<PostTechStackResponse>;
}

const AutoComplete = ({ placeholder, options, onSelect, onAdd }: AutoCompleteProps) => {
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [focusedOptionIdx, setFocusedOptionIdx] = useState(-1);

  const optionId = useCallback((idx: number) => `${listboxId}-option-${idx}`, [listboxId]);
  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(inputValue?.toLowerCase() || '')
  );

  const exactMatch = options.some(
    option => option.toLocaleLowerCase() === inputValue.toLowerCase()
  );

  const showAddButton = onAdd && inputValue && !exactMatch;
  const totalItems = filteredOptions.length + (showAddButton ? 1 : 0);
  const addButtonIdx = showAddButton ? totalItems - 1 : -1;

  const openList = () => {
    setIsOpen(true);
    setFocusedOptionIdx(0);
  };

  const closeList = () => {
    setIsOpen(false);
    setFocusedOptionIdx(-1);
    inputRef.current?.focus();
  };

  const selectOption = (option: string) => {
    onSelect(option);
    setInputValue('');
    closeList();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        if (!isOpen) {
          openList();
        } else {
          setFocusedOptionIdx(prev => Math.min(totalItems - 1, prev + 1));
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
        setFocusedOptionIdx(totalItems - 1);
        break;
      }

      case 'Enter': {
        e.preventDefault();
        if (!isOpen) {
          openList();
        } else {
          if (focusedOptionIdx === addButtonIdx) {
            addOption();
          } else {
            selectOption(filteredOptions[focusedOptionIdx]);
          }
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

  const addOption = async () => {
    if (!inputValue.trim() || !onAdd || isAdding) return;
    setIsAdding(true);

    try {
      await onAdd?.(inputValue.trim());
      selectOption(inputValue.trim());
    } catch {
    } finally {
      setIsAdding(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isOpen) setIsOpen(true);
    setInputValue(e.target.value);
    setFocusedOptionIdx(0);
  };

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen || focusedOptionIdx < 0) return;
    const el = document.getElementById(optionId(focusedOptionIdx));
    el?.scrollIntoView({ block: 'nearest' });
  }, [isOpen, focusedOptionIdx, optionId]);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="sr-only" aria-live="polite">
        {filteredOptions.length}개의 검색 결과
      </div>
      <Input
        role="combobox"
        type="text"
        ref={inputRef}
        value={inputValue}
        placeholder={placeholder}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-haspopup="listbox"
        aria-activedescendant={
          isOpen && focusedOptionIdx >= 0 ? optionId(focusedOptionIdx) : undefined
        }
        onClick={isOpen ? closeList : openList}
        onKeyDown={handleKeyDown}
      />
      {isOpen && (
        <ul
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          aria-orientation="vertical"
          className="bg-background-white border-border-gray absolute z-10 mt-2 flex max-h-[200px] w-full flex-col overflow-y-auto rounded-[5px] border py-2"
        >
          {filteredOptions.map((option, idx) => {
            const isFocused = focusedOptionIdx === idx;

            return (
              <li
                role="option"
                key={option}
                id={optionId(idx)}
                aria-selected={false}
                onMouseDown={() => selectOption(option)}
                onMouseEnter={() => setFocusedOptionIdx(idx)}
                className={cn(
                  'cursor-pointer px-3 py-2',
                  isFocused && 'bg-background-gray-light z-10 rounded-[5px]'
                )}
              >
                {option}
              </li>
            );
          })}
          {showAddButton && (
            <li
              role="option"
              aria-selected={false}
              id={optionId(addButtonIdx)}
              onClick={addOption}
              onMouseEnter={() => setFocusedOptionIdx(addButtonIdx)}
              className={cn(
                'body-s text-text-secondary px-3 py-2',
                focusedOptionIdx === addButtonIdx && 'bg-background-gray-light z-10 rounded-[5px]',
                isAdding && 'cursor-not-allowed opacity-50'
              )}
            >
              {isAdding ? 'Is Adding...' : '+ Add New Item'}
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
