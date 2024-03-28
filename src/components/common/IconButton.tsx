import { forwardRef } from 'react';
import Button from './Button';
import clsx from 'clsx';
import Icon from './Icon';

type IconButtonProps = React.ComponentPropsWithoutRef<typeof Button> &
  React.ComponentPropsWithoutRef<typeof Icon> & {
    btnClassName?: string;
    iconClassName?: string;
    iconPosition?: 'start' | 'end';
  };

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const {
    btnClassName,
    iconPosition = 'start',
    iconClassName,
    name,
    children,
    ...rest
  } = props;
  return (
    <Button {...rest} ref={ref} className={clsx(btnClassName)}>
      {iconPosition === 'start' && <Icon name={name} className={iconClassName} />}
      {children}
      {iconPosition === 'end' && <Icon name={name} className={iconClassName} />}
    </Button>
  );
});

IconButton.displayName = 'IconButton';
export default IconButton;
