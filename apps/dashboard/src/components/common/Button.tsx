import { cloneElement, forwardRef, ReactElement } from 'react';
import { cx } from '@/utils/cx';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
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
    sm: 'py-[4px] px-[10px] text-[0.8125rem]',
    md: 'py-[6px] px-[16px] text-sm',
    lg: 'py-[8px] px-[22px] text-[0.9375rem]'
  };

  const colorClasses = {
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
      primary: 'hover:bg-primary/[0.07]',
      secondary: 'hover:bg-secondary/[0.07]',
      success: 'hover:bg-success/[0.07]',
      warning: 'hover:bg-warning/[0.07]',
      error: 'hover:bg-error/[0.07]'
    },
    contained: {
      primary: 'bg-primary border-primary hover:bg-[#1565c0]',
      secondary: 'bg-secondary border-secondary hover:bg-[#747474]',
      success: 'bg-success border-success hover:bg-[#1b5e20]',
      warning: 'bg-warning border-warning hover:bg-[#e65100]',
      error: 'bg-error border-error hover:bg-[#c62828]'
    },
    outlined: {
      primary: 'border-primary/[0.5] hover:border-primary hover:bg-primary/[0.07]',
      secondary:
        'border-secondary/[0.5] hover:border-secondary hover:bg-secondary/[0.07]',
      success: 'border-success/[0.5] hover:border-success hover:bg-success/[0.07]',
      warning: 'border-warning/[0.5] hover:border-warning hover:bg-warning/[0.07]',
      error: 'border-error/[0.5] hover:border-error hover:bg-error/[0.07]'
    }
  };

  const buttonClass = cx(
    baseStyles,
    sizeClasses[size],
    colorClasses[color],
    variantClasses[variant],
    bgClasses[variant][color],
    className
  );

  const iconSizes = {
    sm: '18px',
    md: '20px',
    lg: '22px'
  };

  const iconSize = iconSizes[size];

  const iconStyles = cx('inline-flex', {
    'text-[1.125rem]': size === 'sm',
    'text-[1.25rem]': size === 'md',
    'text-[1.375rem]': size === 'lg',
    'mr-1 ml-0': startIcon,
    'ml-1 mr-0': endIcon
  });

  return (
    <button {...rest} ref={ref} className={buttonClass} type={type}>
      {startIcon && (
        <span className={iconStyles}>
          {cloneElement(startIcon as ReactElement, { size: iconSize })}
        </span>
      )}
      {children}
      {endIcon && (
        <span className={iconStyles}>
          {cloneElement(endIcon as ReactElement, { size: iconSize })}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
