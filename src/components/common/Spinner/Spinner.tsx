import { createPortal } from 'react-dom';
import { FC } from 'react';

type PropTypes = {
  active?: boolean;
};
const Spinner: FC<PropTypes> = ({ active }) => {
  if (!active) {
    return;
  }
  return createPortal(
    <div className='spinner-overlay'>
      <svg viewBox='25 25 50 50'>
        <circle r='20' cy='50' cx='50'></circle>
      </svg>
    </div>,
    document.body
  );
};

export default Spinner;
