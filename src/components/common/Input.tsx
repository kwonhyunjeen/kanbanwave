import { forwardRef, useMemo } from 'react';
import clsx from 'clsx';

type InputVariant = {
  variant?: 'outlined' | 'standard';
};

type InputProps = React.ComponentPropsWithoutRef<'input'> &
  InputVariant & {
    wrapperClassName?: string;
    inputClassName?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  };

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    variant = 'outlined',
    wrapperClassName,
    inputClassName,
    leftIcon,
    rightIcon,
    ...rest
  } = props;

  const wrapperClasses = useMemo(
    () =>
      clsx(
        'relative flex items-center transition duration-300 ease-in-out',
        variant === 'outlined'
          ? 'border rounded hover:border-emerald-700'
          : 'border-b  hover:border-emerald-700',
        'border-gray-300',
        wrapperClassName
      ),
    [variant, wrapperClassName]
  );

  const inputClasses = useMemo(
    () =>
      clsx(
        'flex-1 block w-full px-3 py-2 focus:outline-none',
        variant === 'outlined' && 'border-0 rounded',
        inputClassName
      ),
    [variant, inputClassName]
  );

  return (
    <div className={wrapperClasses}>
      {leftIcon && <div className="flex items-center px-3">{leftIcon}</div>}
      <input {...rest} ref={ref} className={inputClasses} />
      {rightIcon && <div className="flex items-center px-3">{rightIcon}</div>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
