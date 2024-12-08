import { createPortal } from 'react-dom';
import './Dialog.css';
import { FC } from 'react';

type PropType = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
};
const Dialog: FC<PropType> = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className='modal-overlay'
      onClick={(e) => {
        e.stopPropagation();
        onClose?.();
      }}
    >
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Dialog;
