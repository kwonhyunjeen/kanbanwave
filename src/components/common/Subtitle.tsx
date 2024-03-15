import { ElementType, forwardRef, HTMLAttributes } from 'react';
import clsx from 'clsx';

export type SubtitleProps = HTMLAttributes<HTMLHeadingElement> & {
  size?: 'lg' | 'xl' | '2xl';
  element?: ElementType;
};

const Subtitle = forwardRef<HTMLHeadingElement, SubtitleProps>((props, ref) => {
  const { size = '2xl', element: Element = 'h2', className, children, ...rest } = props;
  const subtitleSizeClass = {
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  };

  return (
    <Element
      ref={ref}
      className={clsx(`font-semibold ${subtitleSizeClass[size]} `, className)}
      {...rest}>
      {children}
    </Element>
  );
});

Subtitle.displayName = 'Subtitle';
export default Subtitle;
