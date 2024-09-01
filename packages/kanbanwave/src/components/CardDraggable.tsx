import { Draggable } from 'react-beautiful-dnd';

type CardDraggableProps = React.ComponentPropsWithoutRef<'div'> & {
  cardId: string;
  cardIndex: number;
};

const CardDraggable: React.FC<CardDraggableProps> = ({
  children,
  cardId,
  cardIndex,
  ...restProps
}) => {
  return (
    <Draggable draggableId={cardId} index={cardIndex}>
      {provided => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...restProps}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};

CardDraggable.displayName = 'CardDraggable';

export default CardDraggable;
