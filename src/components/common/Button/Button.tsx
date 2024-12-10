import React, { FC } from 'react';

type PropTypes = {
  children?: React.ReactNode;
  color?: 'primary' | 'danger' | 'secondary';
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  iconSrc?: string;
};
const Button: FC<PropTypes> = ({
  children,
  onClick,
  iconSrc,
  color = 'primary',
}) => {
  return (
    <button onClick={onClick} className={`button ${color}`}>
      {iconSrc && <img src={iconSrc} alt='icon' />}
      <span>{children}</span>
    </button>
  );
};

export default Button;
