import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const disabledClass = disabled ? 'btn-disabled' : '';
  const fullClassName = `${baseClass} ${variantClass} ${disabledClass} ${className}`.trim();

  return (
    <button
      type={type}
      className={fullClassName}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
