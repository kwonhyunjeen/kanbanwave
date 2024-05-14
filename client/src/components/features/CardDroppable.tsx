import { ReactNode } from 'react';
import { Droppable } from 'react-beautiful-dnd';

type CardDroppableProps = {
  children: ReactNode;
  droppableId: string;
};

const CardDroppable = ({ children, droppableId }: CardDroppableProps) => {
  return (
    <Droppable droppableId={droppableId}>
      {provided => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col p-2">
            {children}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

export default CardDroppable;
