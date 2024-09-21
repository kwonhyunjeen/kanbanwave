import { forwardRef, ReactNode, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';
import useForkRef from 'hooks/useForkRef';

type InputProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'size'> & {
  label?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  resize?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    label,
    helperText,
    leftIcon,
    rightIcon,
    resize = false,
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const inputCallbackRef = useForkRef(inputRef, ref);

  const resizeInput = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.style.width = '0';
      inputRef.current.style.width = `${inputRef.current.scrollWidth + 2}px`;
    }
  };

  useEffect(() => {
    if (resize && inputRef.current) {
      resizeInput();
    }
  }, [resize, rest.value]);

  const wrapperClass = clsx(styles.wrapper, {
    [styles.hasLeftIcon]: !!leftIcon,
    [styles.hasRightIcon]: !!rightIcon
  });

  return (
    <div className={clsx(styles.container, className)}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={wrapperClass}>
        {leftIcon && <span className={styles.iconWithLeft}>{leftIcon}</span>}
        <input
          {...rest}
          ref={inputCallbackRef}
          className={clsx(styles.input, className)}
        />
        {rightIcon && <span className={styles.iconWithRight}>{rightIcon}</span>}
      </div>
      {helperText && <p className={styles.helperText}>{helperText}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
