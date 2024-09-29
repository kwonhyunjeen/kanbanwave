import clsx from 'clsx';
import useForkRef from '../../hooks/useForkRef';
import { forwardRef, useEffect, useRef } from 'react';
import styles from './TextArea.module.css';

type TextAreaProps = React.ComponentPropsWithoutRef<'textarea'> & {
  onEnter?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  preventLineBreak?: boolean;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { className, onEnter, onKeyDown, preventLineBreak, value, ...rest } = props;
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

  return (
    <textarea
      {...rest}
      ref={textCallbackRef}
      value={value}
      rows={1}
      className={clsx(styles.root, className)}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          if (preventLineBreak) {
            e.preventDefault();
          }
          onEnter?.(e);
        }
        onKeyDown?.(e);
      }}
    ></textarea>
  );
});

TextArea.displayName = 'TextArea';
export default TextArea;
