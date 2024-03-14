import { forwardRef } from 'react';
import clsx from 'clsx';

export type ReactButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type ButtonProps = ReactButtonProps & {};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { type = 'button', className, children, ...rest } = props;
  return (
    <button ref={ref} className={clsx('btn btn-sm', className)} type={type} {...rest}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
