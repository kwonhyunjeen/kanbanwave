import { cx } from '@/utils/cx';
import { forwardRef } from 'react';

type TitleProps = React.ComponentPropsWithoutRef<'h1'> & {
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
      {...rest}
      ref={ref}
      className={cx(`font-bold ${titleSizeClass[size]}`, className)}
    >
      {children}
    </h1>
  );
});

Title.displayName = 'Title';
export default Title;
