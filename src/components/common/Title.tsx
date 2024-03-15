import clsx from 'clsx';
import { forwardRef } from 'react';

export type ReactHeadingProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export type TitleProps = ReactHeadingProps & {
  size?: '3xl' | '4xl' | '5xl' | '6xl';
};

export const Title = forwardRef<HTMLHeadingElement, TitleProps>((props, ref) => {
  const { size = '3xl', className, children, ...rest } = props;
  const titleSizeClass = {
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl'
  };
  return (
    <h1
      ref={ref}
      {...rest}
      className={clsx(`font-bold ${titleSizeClass[size]}`, className)}>
      {children}
    </h1>
  );
});

Title.displayName = 'Title';
export default Title;
