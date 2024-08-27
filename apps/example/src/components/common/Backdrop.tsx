import clsx from 'clsx';
import { forwardRef } from 'react';

type BackdropProps = React.ComponentPropsWithoutRef<'div'>;

const Backdrop = forwardRef<HTMLDivElement, BackdropProps>((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <div
      {...rest}
      ref={ref}
      className={clsx(
        'fixed w-screen h-screen top-0 left-0 bg-black/50 flex items-center justify-center',
        className
      )}>
      {children}
    </div>
  );
});

Backdrop.displayName = 'Backdrop';
export default Backdrop;
