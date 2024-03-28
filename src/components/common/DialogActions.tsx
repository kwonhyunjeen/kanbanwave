import { forwardRef } from 'react';
import clsx from 'clsx';

type DialogActionsProps = React.ComponentPropsWithoutRef<'div'>;

const DialogActions = forwardRef<HTMLDivElement, DialogActionsProps>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <div
      {...rest}
      ref={ref}
      className={clsx('dialog-actions flex justify-end p-4 last:ml-2', className)}>
      {children}
    </div>
  );
});

DialogActions.displayName = 'DialogActions';
export default DialogActions;
