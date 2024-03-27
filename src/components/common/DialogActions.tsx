import { forwardRef } from 'react';
import Div, { DivProps } from './Div';
import clsx from 'clsx';

export type DialogActionsProps = DivProps & {};

const DialogActions = forwardRef<HTMLDivElement, DialogActionsProps>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <Div
      {...rest}
      ref={ref}
      className={clsx('dialog-actions flex justify-end p-4 last:ml-2', className)}>
      {children}
    </Div>
  );
});

DialogActions.displayName = 'DialogActions';
export default DialogActions;
