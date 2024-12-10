import { FC, ReactNode } from 'react';
type PropTypes = {
  children: ReactNode;
  onDelete?: () => void;
};
const Chip: FC<PropTypes> = ({ children, onDelete }) => {
  return (
    <div className='chip'>
      {children}
      {onDelete && (
        <span className='delete-btn' onClick={onDelete}>
          x
        </span>
      )}
    </div>
  );
};

export default Chip;
