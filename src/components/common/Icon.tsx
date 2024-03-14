import clsx from 'clsx';
import { forwardRef } from 'react';

type ReactSpanProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

export type IconProps = ReactSpanProps & { name: string };

const Icon = forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  const { name, className, ...rest } = props;
  return (
    <span
      ref={ref}
      {...rest}
      className={clsx('material-icons cursor-pointer where(text-xl) rounded', className)}>
      {name}
    </span>
  );
});

Icon.displayName = 'Icon';
export default Icon;
