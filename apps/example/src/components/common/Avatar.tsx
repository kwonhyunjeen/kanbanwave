import clsx from 'clsx';
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
      className={clsx(
        'inline-block rounded-full bg-cover bg-gray-200 h-12 aspect-square',
        className
      )}
      style={{ ...style, backgroundImage: src && `url(${src})` }}
    />
  );
});

Avatar.displayName = 'Avatar';
export default Avatar;
