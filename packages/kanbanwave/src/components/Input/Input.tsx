import { forwardRef, ReactNode, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';
import useForkRef from 'hooks/useForkRef';

type InputProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'size'> & {
  helperText?: string;
  inputClassName?: string;
  label?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  preventLineBreak?: boolean;
  resize?: boolean;
  rootClassName?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    helperText,
    inputClassName,
    label,
    startIcon,
    endIcon,
    onEnter,
    onKeyDown,
    preventLineBreak,
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

  const containerClass = clsx(styles.inputContainer, {
    [styles.hasStartIcon]: !!startIcon,
    [styles.hasEndIcon]: !!endIcon
  });

  return (
    <div className={clsx(styles.root, className)}>
      {label && <label className={styles.inputLabel}>{label}</label>}
      <div className={containerClass}>
        {startIcon && <span className={styles.inputStartIcon}>{startIcon}</span>}
        <input
          {...rest}
          ref={inputCallbackRef}
          className={clsx(styles.inputField, inputClassName)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              if (preventLineBreak) {
                e.preventDefault();
              }
              onEnter?.(e);
            }
            onKeyDown?.(e);
          }}
        />
        {endIcon && <span className={styles.inputEndIcon}>{endIcon}</span>}
      </div>
      {helperText && <p className={styles.helperText}>{helperText}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
