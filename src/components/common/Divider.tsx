import clsx from 'clsx';

export type DividerProps = {
  className?: string;
  orientation?: 'vertical' | 'horizontal';
};

const Divider = ({ className, orientation = 'vertical' }: DividerProps) => {
  return <div className={clsx(`divider divider-${orientation}`, className)} />;
};

Divider.displayName = 'Divider';
export default Divider;
