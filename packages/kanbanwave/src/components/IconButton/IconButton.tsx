import { forwardRef } from 'react';
import clsx from 'clsx';
import Button from '../Button/Button';
import styles from './IconButton.module.css';
import Icon from '../Icon/Icon';

type IconButtonProps = Omit<
  React.ComponentPropsWithoutRef<typeof Button>,
  'size' | 'startIcon' | 'endIcon' | 'children'
> & {
  icon: string;
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const { className, icon, ...rest } = props;

  const buttonClass = clsx(styles.root, className);

  return (
    <Button {...rest} ref={ref} className={buttonClass}>
      <Icon name={icon} />
    </Button>
  );
});

IconButton.displayName = 'IconButton';
export default IconButton;
