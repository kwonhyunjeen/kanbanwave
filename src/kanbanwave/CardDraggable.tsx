import { ReactNode } from 'react';
import { Draggable } from 'react-beautiful-dnd';

type CardDraggableProps = React.ComponentPropsWithoutRef<'div'> & {
  children: ReactNode;
  draggableId: string; // 카드의 uuid
  index: number; // 카드가 담긴 배열에서의 특정 위치
};

const CardDraggable: React.FC<CardDraggableProps> = ({
  children,
  draggableId,
  index,
  ...restProps
}) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...restProps}>
          {children}
        </div>
      )}
    </Draggable>
  );
};

CardDraggable.displayName = 'CardDraggable';

export default CardDraggable;
