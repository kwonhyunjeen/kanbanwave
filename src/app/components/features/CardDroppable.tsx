import { ReactNode } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { KWItemType } from 'app/types';
import StrictModeDroppable from './StrictModeDroppable';

type CardDroppableProps = {
  children: ReactNode;
  droppableId: string;
};

const CardDroppable = ({ children, droppableId }: CardDroppableProps) => {
  return (
    <StrictModeDroppable droppableId={droppableId} type={KWItemType.CARD}>
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
    </StrictModeDroppable>
  );
};

export default CardDroppable;
