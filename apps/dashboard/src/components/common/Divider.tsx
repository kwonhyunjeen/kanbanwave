import { cx } from '@/utils/cx';
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
      className={cx(`divider- divider${orientation}`, className)}
    />
  );
});

Divider.displayName = 'Divider';
export default Divider;
