import { useForkRef } from '@/hooks';
import { cx } from '@/utils/cx';
import { ChangeEvent, forwardRef, useEffect, useRef } from 'react';

type TextAreaProps = React.ComponentPropsWithoutRef<'textarea'> & {};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { className, onChange, value, ...rest } = props;

  const textRef = useRef<HTMLTextAreaElement>(null);
  const textCallbackRef = useForkRef(textRef, ref);

  const resize = () => {
    if (textRef && textRef.current) {
      textRef.current.style.height = 'auto';
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e);
    resize();
  };

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
  }, []);

  return (
    <textarea
      {...rest}
      ref={textCallbackRef}
      className={cx('textarea textarea-bordered resize-none', className)}
      onChange={handleChange}
      value={value}
      rows={1}
    ></textarea>
  );
});

TextArea.displayName = 'TextArea';
export default TextArea;
