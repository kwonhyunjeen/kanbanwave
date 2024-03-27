import { ReactNode, forwardRef } from 'react';
import Div, { DivProps } from './Div';
import clsx from 'clsx';

export type DialogContentProps = DivProps & {
  children: ReactNode;
  className?: string;
};

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <Div {...rest} ref={ref} className={clsx('p-4', className)}>
      {children}
    </Div>
  );
});

DialogContent.displayName = 'DialogContent';
export default DialogContent;
