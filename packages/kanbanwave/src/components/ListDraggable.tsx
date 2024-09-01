import { Draggable } from 'react-beautiful-dnd';

type ListDraggableProps = React.ComponentPropsWithoutRef<'div'> & {
  listId: string;
  listIndex: number;
};

const ListDraggable: React.FC<ListDraggableProps> = ({
  children,
  listId,
  listIndex,
  ...restProps
}) => {
  return (
    <Draggable draggableId={listId} index={listIndex}>
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

ListDraggable.displayName = 'ListDraggable';

export default ListDraggable;
