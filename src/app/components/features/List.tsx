import { KWList } from 'app/types';
import {
  IconButton,
  AddItemForm,
  Subtitle,
  CardDroppable,
  useKanbanCard
} from 'app/components';
import { useCallback } from 'react';
import { Card } from 'app/components';
import * as Dummy from 'app/dummy';
import { Draggable } from 'react-beautiful-dnd';

type ListProps = {
  index: number;
  list: KWList;
  onListMove?: (dragIndex: number, hoverIndex: number) => void;
  onListDelete?: () => void;
};

const List = ({ index, list, onListMove, onListDelete, ...props }: ListProps) => {
  const cardStore = useKanbanCard();
  const cards = cardStore.getAll(list.id);

  const handleCardAdd = useCallback(
    (title: string) => {
      const currentDate = Dummy.getCurrentDate();
      const card = Dummy.makeCard(
        Dummy.randomUUID(),
        Dummy.makeRandomUser(),
        title,
        Dummy.randomParagraphs(5),
        Dummy.makeDayMonthYear(currentDate),
        Dummy.makeDayMonthYear(currentDate),
        Dummy.makeRelativeDate(currentDate)
      );
      cardStore.create(list.id, card);
    },
    [cardStore, list.id]
  );

  const handleCardDelete = useCallback(
    (cardId: string) => () => {
      cardStore.delete(list.id, cardId);
    },
    [cardStore, list.id]
  );

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
                onCardDelete={handleCardDelete(card.id)}
                draggableId={card.id}
                index={index}
              />
            ))}
          </CardDroppable>
          <AddItemForm
            itemMode="card"
            onItemAdd={handleCardAdd}
            listsLength={cards?.length}
          />
        </div>
      )}
    </Draggable>
  );
};

export default List;
