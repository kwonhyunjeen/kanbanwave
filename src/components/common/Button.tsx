import { forwardRef } from 'react';
import clsx from 'clsx';

type ButtonProps = React.ComponentPropsWithoutRef<'button'>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { type = 'button', className, children, ...rest } = props;
  return (
    <button {...rest} ref={ref} className={clsx('btn btn-sm', className)} type={type}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
