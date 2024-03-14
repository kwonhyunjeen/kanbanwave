import { forwardRef } from 'react';
import Button, { ButtonProps } from './Button';
import Icon, { IconProps } from './Icon';
import clsx from 'clsx';

export type IconButtonProps = ButtonProps &
  IconProps & {
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
    <Button ref={ref} className={clsx(btnClassName)} {...rest}>
      {iconPosition === 'start' && <Icon name={name} className={iconClassName} />}
      {children}
      {iconPosition === 'end' && <Icon name={name} className={iconClassName} />}
    </Button>
  );
});

IconButton.displayName = 'IconButton';
export default IconButton;
