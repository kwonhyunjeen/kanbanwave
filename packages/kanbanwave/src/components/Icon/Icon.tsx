import clsx from 'clsx';
import { forwardRef } from 'react';
import styles from './Icon.module.css';

type IconProps = React.ComponentPropsWithoutRef<'span'> & {
  name: string;
};

const Icon = forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  const { 'aria-hidden': hidden, 'aria-label': label, className, name, ...rest } = props;

  const iconClass = clsx(styles.root, className);

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
