import clsx from 'clsx';
import { forwardRef } from 'react';

type DividerProps = React.ComponentPropsWithoutRef<'div'> & {
  orientation?: 'vertical' | 'horizontal';
};

const Divider = forwardRef<HTMLDivElement, DividerProps>((props, ref) => {
  const { className, orientation = 'vertical', ...rest } = props;
  return (
    <div
      {...rest}
      ref={ref}
      className={clsx(`divider divider-${orientation}`, className)}
    />
  );
});

Divider.displayName = 'Divider';
export default Divider;
