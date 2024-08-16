import { forwardRef } from 'react';
import clsx from 'clsx';
import Button from './Button';
import Icon from './Icon';

type IconButtonProps = Omit<
  React.ComponentPropsWithoutRef<typeof Button>,
  'size' | 'startIcon' | 'endIcon' | 'children'
> & {
  icon: string;
  size?: 'sm' | 'md' | 'lg';
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const {
    className,
    color = 'primary',
    icon,
    size = 'sm',
    variant = 'text',
    ...rest
  } = props;

  const sizeStyles = {
    sm: '!p-[3px]',
    md: '!p-[5px]',
    lg: '!p-[5px]'
  };

  const buttonClass = clsx('p-0 !min-w-0 tracking-normal', sizeStyles[size], className);

  return (
    <Button
      {...rest}
      ref={ref}
      className={buttonClass}
      color={color}
      variant={variant}
      size={size}>
      <Icon name={icon} size={size} />
    </Button>
  );
});

IconButton.displayName = 'IconButton';
export default IconButton;
