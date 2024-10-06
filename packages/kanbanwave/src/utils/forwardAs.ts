import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode
} from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type UnknownProps = {};

type ForwardAsProps<As extends ElementType, Props = UnknownProps> = {
  as?: As;
} & {
  ref?: ComponentPropsWithRef<As>['ref'];
} & ComponentPropsWithoutRef<As> &
  Props;

type ForwardAsRenderFunction<Props> = ForwardRefRenderFunction<
  unknown,
  { as?: ElementType } & Props
>;

type ForwardAsExoticComponent<DefaultAs extends ElementType, Props = UnknownProps> = {
  <As extends ElementType = DefaultAs>(
    props: ForwardAsProps<As, Props>
  ): ReactNode | null;
  displayName?: string | undefined;
};

export default function forwardAs<DefaultAs extends ElementType, Props = UnknownProps>(
  render: ForwardAsRenderFunction<Props>
) {
  return forwardRef(render) as unknown as ForwardAsExoticComponent<DefaultAs, Props>;
}
