import { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type PropType = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
};
const Dialog: FC<PropType> = ({ isOpen, children, onClose }) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const closeHandler = (e: MouseEvent) => {
      if (e.target === dialogRef.current && isOpen) {
        onClose?.();
      }
    };

    window.addEventListener('click', closeHandler);
    return () => window.removeEventListener('click', closeHandler);
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return createPortal(
    <div className='modal-overlay' ref={dialogRef}>
      <div className='modal-content'>{children}</div>
    </div>,
    document.body
  );
};

export default Dialog;
