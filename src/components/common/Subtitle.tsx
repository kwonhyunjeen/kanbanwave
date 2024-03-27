import { ElementType, forwardRef } from 'react';
import clsx from 'clsx';
import { ReactHeadingProps } from './Title';

export type ReactParagraphProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

export type SubtitleProps = ReactHeadingProps &
  ReactParagraphProps & {
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
      ref={ref}
      className={clsx(`font-semibold ${subtitleSizeClass[size]} `, className)}
      {...rest}>
      {children}
    </Element>
  );
});

Subtitle.displayName = 'Subtitle';
export default Subtitle;
