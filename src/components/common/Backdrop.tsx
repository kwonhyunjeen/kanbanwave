import Div, { ReactDivProps } from './Div';
import clsx from 'clsx';

export type BackdropProps = ReactDivProps & {
  opacityClass?: string;
};

const Backdrop = (props: BackdropProps) => {
  const { opacityClass, className, children, ...rest } = props;

  return (
    <Div
      {...rest}
      className={clsx(
        'fixed z-50 w-screen h-screen',
        opacityClass ?? 'bg-black/50',
        'flex items-center justify-center',
        className
      )}
      aria-hidden="true"
      top="0"
      left="0">
      {children}
    </Div>
  );
};

Backdrop.displayName = 'Backdrop';
export default Backdrop;
