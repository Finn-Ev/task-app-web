import React from 'react';
import './Button.styles.scss';

const Button = ({ style, onClick, children, type }) => {
  return (
    <button className="button" style={{ ...style }} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
