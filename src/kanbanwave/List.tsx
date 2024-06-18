import NewCard from './NewCard';
import { KWCard, KWList } from './types';
import { IconButton, Subtitle } from 'app/components';
import { Draggable } from 'react-beautiful-dnd';
import CardDroppable from './CardDroppable';
import Card from './Card';

type ListProps = {
  index: number;
  list: KWList;
  cards: KWCard[];
  onListMove?: (dragIndex: number, hoverIndex: number) => void;
  onListDelete?: () => void;
  onCardAdd?: (title: string) => void;
  onCardDelete?: (cardId: string) => void;
};

const List = ({
  index,
  list,
  cards,
  onListMove,
  onListDelete,
  onCardAdd,
  onCardDelete,
  ...props
}: ListProps) => {
  return (
    <Draggable draggableId={list.id} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...props}
          className="w-64 p-2 mr-2 bg-white rounded-lg shadow-lg h-fit">
          <div className="flex items-center justify-between mb-2">
            <Subtitle className="flex-1 pl-2 break-all" size="lg">
              {list.title}
            </Subtitle>
            <div className="flex justify-between ml-2">
              <IconButton
                name="remove"
                className="single-icon"
                aria-label="delete a list"
                onClick={onListDelete}
              />
            </div>
          </div>
          <CardDroppable droppableId={list.id}>
            {cards?.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                onCardDelete={() => onCardDelete?.(card.id)}
                draggableId={card.id}
                index={index}
              />
            ))}
          </CardDroppable>
          <NewCard onAdd={onCardAdd} cardsLength={cards?.length} />
        </div>
      )}
    </Draggable>
  );
};

export default List;
