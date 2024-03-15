import clsx from 'clsx';
import { CSSProperties, forwardRef } from 'react';

export type ReactDivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

type WidthHeight = {
  width?: string;
  height?: string;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
};

type Position = {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
};

export type DivProps = ReactDivProps &
  WidthHeight &
  Position & {
    src?: string;
  };

const Div = forwardRef<HTMLDivElement, DivProps>((props, ref) => {
  const {
    style: _style,
    width,
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    left,
    right,
    top,
    bottom,
    src,
    className,
    children,
    ...rest
  } = props;
  const style: CSSProperties = {
    ..._style,
    width,
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    left,
    right,
    top,
    bottom,
    backgroundImage: src && `url(${src})`
  };
  return (
    <div
      ref={ref}
      className={clsx('box-sizing', src && 'bg-gray-200', className)}
      style={style}
      {...rest}>
      {children}
    </div>
  );
});

Div.displayName = 'Div';
export default Div;
