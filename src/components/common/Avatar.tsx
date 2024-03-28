import clsx from 'clsx';

type AvatarProps = React.ComponentPropsWithoutRef<'span'> & {
  src?: string;
};

const Avatar = ({ className, src, style, ...props }: AvatarProps) => {
  return (
    <span
      {...props}
      className={clsx(
        'inline-block rounded-full bg-cover bg-gray-200 h-12 aspect-square',
        className
      )}
      style={{ backgroundImage: src && `url(${src})` }}
    />
  );
};

Avatar.displayName = 'Avatar';
export default Avatar;
