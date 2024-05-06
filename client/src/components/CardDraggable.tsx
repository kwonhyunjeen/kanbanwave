import { ReactNode } from 'react';
import { Draggable } from 'react-beautiful-dnd';

type CardDraggableProps = {
  children: ReactNode;
  draggableId: string; // 카드의 uuid
  index: number; // 카드가 담긴 배열에서의 특정 위치
};

const CardDraggable = ({ children, draggableId, index }: CardDraggableProps) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {provided => {
        return (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}>
            {children}
          </div>
        );
      }}
    </Draggable>
  );
};

export default CardDraggable;
