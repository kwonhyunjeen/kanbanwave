import clsx from 'clsx';
import { useForkRef } from 'app/hooks';
import { ChangeEvent, forwardRef, useCallback, useRef } from 'react';

type TextAreaProps = React.ComponentPropsWithoutRef<'textarea'> & {};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { className, onChange, value, ...rest } = props;

  const textRef = useRef<HTMLTextAreaElement>(null);
  const textCallbackRef = useForkRef(textRef, ref);

  const resize = useCallback(() => {
    if (textRef && textRef.current) {
      textRef.current.style.height = 'auto';
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e);
    resize();
  };

  return (
    <textarea
      {...rest}
      ref={textCallbackRef}
      className={clsx('resize-none textarea textarea-bordered', className)}
      onChange={handleChange}
      value={value}
      rows={1}></textarea>
  );
});

TextArea.displayName = 'TextArea';
export default TextArea;
