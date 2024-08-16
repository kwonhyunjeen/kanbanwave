import { forwardRef } from 'react';
import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  variant?: 'text' | 'contained' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    type = 'button',
    className,
    children,
    color = 'primary',
    variant = 'text',
    size = 'sm',
    startIcon,
    endIcon,
    ...rest
  } = props;

  const baseStyles =
    'inline-flex items-center justify-center box-border border border-solid rounded font-medium leading-[1.75] tracking-[.02857em] align-middle cursor-pointer transition-colors duration-200 focus:outline-none';

  const sizeClasses = {
    sm: 'py-[3px] px-[9px] text-[0.8125rem]',
    md: 'py-[5px] px-[15px] text-sm',
    lg: 'py-2 px-[22px] text-[0.9375rem]'
  };

  const colorClasses = {
    default: 'text-default',
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error'
  };

  const variantClasses = {
    text: 'bg-transparent border border-transparent',
    contained: 'text-white border-0 shadow-contained hover:shadow-contained-hover',
    outlined: 'bg-transparent border'
  };

  const bgClasses = {
    text: {
      default: 'hover:bg-default/[0.06]',
      primary: 'hover:bg-primary/[0.04]',
      secondary: 'hover:bg-secondary/[0.04]',
      success: 'hover:bg-success/[0.04]',
      warning: 'hover:bg-warning/[0.04]',
      error: 'hover:bg-error/[0.04]'
    },
    contained: {
      default: 'bg-default border-default hover:bg-[#747474]',
      primary: 'bg-primary border-primary hover:bg-[#1565c0]',
      secondary: 'bg-secondary border-secondary hover:bg-[#7b1fa2]',
      success: 'bg-success border-success hover:bg-[#1b5e20]',
      warning: 'bg-warning border-warning hover:bg-[#e65100]',
      error: 'bg-error border-error hover:bg-[#c62828]'
    },
    outlined: {
      default: 'border-default/[0.5] hover:border-default hover:bg-default/[0.06]',
      primary: 'border-primary/[0.5] hover:border-primary hover:bg-primary/[0.04]',
      secondary:
        'border-secondary/[0.5] hover:border-secondary hover:bg-secondary/[0.04]',
      success: 'border-success/[0.5] hover:border-success hover:bg-success/[0.04]',
      warning: 'border-warning/[0.5] hover:border-warning hover:bg-warning/[0.04]',
      error: 'border-error/[0.5] hover:border-error hover:bg-error/[0.04]'
    }
  };

  const buttonClass = clsx(
    baseStyles,
    sizeClasses[size],
    colorClasses[color],
    variantClasses[variant],
    bgClasses[variant][color],
    className
  );

  const iconStyles = clsx('inline-flex', {
    'mr-1 ml-0': startIcon,
    'ml-1 mr-0': endIcon
  });

  return (
    <button {...rest} ref={ref} className={buttonClass} type={type}>
      {startIcon && <span className={iconStyles}>{startIcon}</span>}
      {children}
      {endIcon && <span className={iconStyles}>{endIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
