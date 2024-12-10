import { Children, FC, useCallback, useEffect, useRef, useState } from 'react';
import Chip from '../Chip/Chip';

type PropTypes = {
  options: string[];
  selectedItems: string[];
  onSelectedChange: (items: string[]) => void;
  placeholder?: string;
  label?: string;
  errorMessage?: string;
};

const Select: FC<PropTypes> = ({
  options,
  selectedItems,
  onSelectedChange,
  placeholder,
  label,
  errorMessage,
}) => {
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const listStateHandler = useCallback(
    (e: MouseEvent) => {
      if (!selectRef.current?.contains(e.target as Node) && isOpen) {
        setIsOpen(false);
      } else if (selectRef.current?.contains(e.target as Node) && !isOpen) {
        setIsOpen(true);
      }
    },
    [isOpen]
  );
  useEffect(() => {
    window.addEventListener('click', listStateHandler);
    return () => window.removeEventListener('click', listStateHandler);
  }, [listStateHandler]);
  function clickHandler(item: string): void {
    if (selectedItems.includes(item)) {
      const newSelectedItems = selectedItems.filter((i) => i !== item);
      onSelectedChange(newSelectedItems);
    } else {
      onSelectedChange([...selectedItems, item]);
    }
  }

  return (
    <>
      <div className='select' ref={selectRef}>
        {label && <label className='floating-label'>{label}</label>}
        {selectedItems.length > 0 ? (
          Children.toArray(
            selectedItems.map((item) => (
              <Chip onDelete={() => clickHandler(item)}>{item}</Chip>
            ))
          )
        ) : (
          <span className='placeholder'>{placeholder}</span>
        )}
        {isOpen && (
          <div className='dropdown-list'>
            <ul>
              {Children.toArray(
                options.map((item) => (
                  <li
                    className={selectedItems.includes(item) ? 'selected' : ''}
                    onClick={() => clickHandler(item)}
                  >
                    {item}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
      {errorMessage && (
        <span className='error-message danger'>{errorMessage}</span>
      )}
    </>
  );
};

export default Select;
