import { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  color?: 'primary' | 'secondary';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    type = 'button',
    className,
    children,
    color = 'secondary',
    startIcon,
    endIcon,
    ...rest
  } = props;

  const buttonClass = clsx(
    styles.root,
    styles[`color${color.charAt(0).toUpperCase() + color.slice(1)}`],
    className
  );

  return (
    <button {...rest} ref={ref} className={buttonClass} type={type}>
      {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
      {children}
      {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
