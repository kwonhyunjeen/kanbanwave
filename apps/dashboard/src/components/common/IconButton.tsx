import { forwardRef } from 'react';
import Button from './Button';
import Icon from './Icon';
import { cx } from '@/utils/cx';

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
    sm: 'p-[4px]',
    md: 'p-[6px]',
    lg: 'p-[6px]'
  };

  const buttonClass = cx('min-w-0 tracking-normal', sizeStyles[size], className);

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
