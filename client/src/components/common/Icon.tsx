import clsx from 'clsx';
import { forwardRef } from 'react';

type IconProps = React.ComponentPropsWithoutRef<'span'> & { name: string };

const Icon = forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  const { 'aria-hidden': hidden, 'aria-label': label, className, name, ...rest } = props;
  return (
    <span
      {...rest}
      ref={ref}
      className={clsx('material-icons cursor-pointer where(text-xl) rounded', className)}
      aria-hidden={hidden ?? label ? undefined : true}
      aria-label={label}>
      {name}
    </span>
  );
});

Icon.displayName = 'Icon';
export default Icon;
