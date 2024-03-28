import { forwardRef } from 'react';
import Subtitle from './Subtitle';
import clsx from 'clsx';

type DialogTitleProps = Omit<React.ComponentPropsWithoutRef<typeof Subtitle>, 'element'>;

const DialogTitle = forwardRef<HTMLElement, DialogTitleProps>((props, ref) => {
  const { children, className, size = 'xl', ...rest } = props;
  return (
    <Subtitle {...rest} ref={ref} className={clsx('p-4', className)} size={size}>
      {children}
    </Subtitle>
  );
});

DialogTitle.displayName = 'DialogTitle';
export default DialogTitle;
