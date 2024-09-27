import { forwardRef } from 'react';
import { cx } from '@/utils/cx';

type IconProps = React.ComponentPropsWithoutRef<'span'> & {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outlined' | 'filled';
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

  const sizeClasses = {
    sm: 'text-[1.25rem]', // 20px,
    md: 'text-[1.5rem]', // 24px,
    lg: 'text-[2rem]' // 32px
  };

  const iconClass = cx(`material-symbols`, sizeClasses[size], className);

  return (
    <span
      {...rest}
      ref={ref}
      className={iconClass}
      aria-hidden={(hidden ?? label) ? undefined : true}
      aria-label={label}
      translate="no"
    >
      {name}
    </span>
  );
});

Icon.displayName = 'Icon';
export default Icon;
