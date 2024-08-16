import { forwardRef } from 'react';
import clsx from 'clsx';

type IconProps = React.ComponentPropsWithoutRef<'span'> & {
  name: string;
  size?: 'sm' | 'md' | 'lg';
};

const Icon = forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  const {
    'aria-hidden': hidden,
    'aria-label': label,
    className,
    name,
    size = 'md',
    ...rest
  } = props;
  const iconClass = clsx(
    'material-icons',
    {
      'text-xl': size === 'sm', // 20px
      'text-2xl': size === 'md', // 28px
      'text-[2rem]': size === 'lg' // 32px
    },
    className
  );
  return (
    <span
      {...rest}
      ref={ref}
      className={iconClass}
      aria-hidden={hidden ?? label ? undefined : true}
      aria-label={label}>
      {name}
    </span>
  );
});

Icon.displayName = 'Icon';
export default Icon;
