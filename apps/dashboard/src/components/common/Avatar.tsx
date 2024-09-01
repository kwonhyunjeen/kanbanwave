import { cx } from '@/utils/cx';
import { forwardRef } from 'react';

type AvatarProps = React.ComponentPropsWithoutRef<'span'> & {
  src?: string;
};

const Avatar = forwardRef<HTMLSpanElement, AvatarProps>((props, ref) => {
  const { className, src, style, ...rest } = props;
  return (
    <span
      {...rest}
      ref={ref}
      className={cx(
        'inline-block aspect-square h-12 rounded-full bg-gray-200 bg-cover',
        className
      )}
      style={{ ...style, backgroundImage: src && `url(${src})` }}
    />
  );
});

Avatar.displayName = 'Avatar';
export default Avatar;
