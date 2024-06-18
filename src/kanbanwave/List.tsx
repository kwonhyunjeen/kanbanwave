import NewCard from './NewCard';
import { KWCard, KWList } from './types';
import { IconButton, Subtitle } from 'app/components';
import CardDroppable from './CardDroppable';
import Card from './Card';
import ListDraggable from './ListDraggable';

type ListProps = {
  list: KWList;
  listIndex: number;
  cards: KWCard[];
  onListMove?: (dragIndex: number, hoverIndex: number) => void;
  onListDelete?: () => void;
  onCardAdd?: (title: string) => void;
  onCardDelete?: (cardId: string) => void;
};

const List = ({
  list,
  listIndex,
  cards,
  onListMove,
  onListDelete,
  onCardAdd,
  onCardDelete,
  ...props
}: ListProps) => {
  return (
    <ListDraggable listId={list.id} listIndex={listIndex}>
      <div {...props} className="w-64 p-2 mr-2 bg-white rounded-lg shadow-lg h-fit">
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
        <CardDroppable
          listId={list.id}
          buttonSlot={<NewCard onAdd={onCardAdd} cardsLength={cards?.length} />}
          className="flex flex-col p-2">
          {cards?.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              cardIndex={index}
              onCardDelete={() => onCardDelete?.(card.id)}
            />
          ))}
        </CardDroppable>
      </div>
    </ListDraggable>
  );
};

export default List;
