import { ReactNode } from 'react';
import { KWItemType } from './types';
import StrictModeDroppable from './StrictModeDroppable';

type CardDroppableProps = React.ComponentPropsWithoutRef<'div'> & {
  children: ReactNode;
  droppableId: string;
};

const CardDroppable: React.FC<CardDroppableProps> = ({
  children,
  droppableId,
  ...restProps
}) => {
  return (
    <StrictModeDroppable droppableId={droppableId} type={KWItemType.CARD}>
      {provided => (
        <div {...provided.droppableProps} ref={provided.innerRef} {...restProps}>
          {children}
          {provided.placeholder}
        </div>
      )}
    </StrictModeDroppable>
  );
};

CardDroppable.displayName = 'CardDroppable';

export default CardDroppable;
