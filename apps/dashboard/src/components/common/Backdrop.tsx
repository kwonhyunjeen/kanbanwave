import { cx } from '@/utils/cx';
import { forwardRef } from 'react';

type BackdropProps = React.ComponentPropsWithoutRef<'div'>;

const Backdrop = forwardRef<HTMLDivElement, BackdropProps>((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <div
      {...rest}
      ref={ref}
      className={cx(
        'fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black/50',
        className
      )}
    >
      {children}
    </div>
  );
});

Backdrop.displayName = 'Backdrop';
export default Backdrop;
