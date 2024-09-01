import { forwardRef } from 'react';
import Subtitle from './Subtitle';
import { cx } from '@/utils/cx';

type DialogTitleProps = Omit<React.ComponentPropsWithoutRef<typeof Subtitle>, 'element'>;

const DialogTitle = forwardRef<HTMLElement, DialogTitleProps>((props, ref) => {
  const { children, className, size = 'xl', ...rest } = props;
  return (
    <Subtitle {...rest} ref={ref} className={cx('p-4', className)} size={size}>
      {children}
    </Subtitle>
  );
});

DialogTitle.displayName = 'DialogTitle';
export default DialogTitle;
