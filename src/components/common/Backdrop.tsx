import clsx from 'clsx';

type BackdropProps = React.ComponentPropsWithoutRef<'div'>;

const Backdrop = (props: BackdropProps) => {
  const { className, children, ...rest } = props;

  return (
    <div
      {...rest}
      className={clsx(
        'fixed w-screen h-screen top-0 left-0 bg-black/50 flex items-center justify-center',
        className
      )}>
      {children}
    </div>
  );
};

Backdrop.displayName = 'Backdrop';
export default Backdrop;
