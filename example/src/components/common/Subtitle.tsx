import { ElementType, forwardRef } from 'react';
import clsx from 'clsx';

type SubtitleProps = React.ComponentPropsWithoutRef<'h2' | 'p'> & {
  size?: 'lg' | 'xl' | '2xl';
  element?: ElementType;
};

const Subtitle = forwardRef<HTMLElement, SubtitleProps>((props, ref) => {
  const { size = '2xl', element: Element = 'h2', className, children, ...rest } = props;
  const subtitleSizeClass = {
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  };

  return (
    <Element
      {...rest}
      ref={ref}
      className={clsx(`font-semibold ${subtitleSizeClass[size]}`, className)}>
      {children}
    </Element>
  );
});

Subtitle.displayName = 'Subtitle';
export default Subtitle;
