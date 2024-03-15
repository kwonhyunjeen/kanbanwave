import clsx from 'clsx';
import Div, { DivProps } from './Div';

export type AvatarProps = DivProps & {
  size?: string;
};

const Avatar = ({ className, src, style, size, ...props }: AvatarProps) => {
  const avatarSize = size ?? '3rem';
  return (
    <Div
      {...props}
      className={clsx('rounded-full bg-cover bg-gray-200', className)}
      src={src}
      style={style}
      width={avatarSize}
      height={avatarSize}
    />
  );
};

Avatar.displayName = 'Avatar';
export default Avatar;
