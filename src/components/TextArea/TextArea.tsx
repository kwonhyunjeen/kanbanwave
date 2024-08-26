import clsx from 'clsx';
import useForkRef from '../../hooks/useForkRef';
import { forwardRef, useEffect, useRef } from 'react';
import styles from './TextArea.module.css';

type TextAreaProps = React.ComponentPropsWithoutRef<'textarea'> & {};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { className, onChange, value, ...rest } = props;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const textCallbackRef = useForkRef(textAreaRef, ref);

  const resize = () => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = '0';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 2}px`;
    }
  };

  useEffect(() => {
    resize();
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <textarea
      {...rest}
      ref={textCallbackRef}
      value={value}
      rows={1}
      onChange={handleChange}
      className={clsx(styles.root, className)}></textarea>
  );
});

TextArea.displayName = 'TextArea';
export default TextArea;
