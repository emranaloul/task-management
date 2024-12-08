import React, { FC } from 'react';
import './Button.css';

type PropTypes = {
  children?: React.ReactNode;
  variant: 'outlined' | 'solid';
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
const Button: FC<PropTypes> = ({ variant = 'solid', children, onClick }) => {
  return (
    <button onClick={onClick} className={`button ${variant}`}>
      {children}
    </button>
  );
};

export default Button;
