import { ReactNode, forwardRef } from 'react';
import Subtitle, { SubtitleProps } from './Subtitle';
import clsx from 'clsx';

export type DialogTitleProps = Pick<SubtitleProps, 'size'> & {
  children: ReactNode;
  className?: string;
};

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
