import { forwardRef } from 'react';
import clsx from 'clsx';

type DialogContentProps = React.ComponentPropsWithoutRef<'div'>;

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <div {...rest} ref={ref} className={clsx('p-4', className)}>
      {children}
    </div>
  );
});

DialogContent.displayName = 'DialogContent';
export default DialogContent;
