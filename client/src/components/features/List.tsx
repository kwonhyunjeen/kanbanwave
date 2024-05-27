import { List as IList } from 'store/commonTypes';
import {
  IconButton,
  AddItemForm,
  Subtitle,
  ListDraggable,
  CardDroppable,
  useKanbanStorage
} from 'components';
import { useCallback } from 'react';
import { Card } from 'components';
import * as Dummy from 'dummy';

type ListProps = {
  index: number;
  list: IList;
  onListMove?: (dragIndex: number, hoverIndex: number) => void;
  onListDelete?: () => void;
};

const List = ({ index, list, onListMove, onListDelete, ...props }: ListProps) => {
  const kanbanStorage = useKanbanStorage();

  const cards = kanbanStorage.card.getAll(list.id);

  const handleCardAdd = useCallback(
    (title: string) => {
      // @todo Update to real data once server integration is completed
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
      kanbanStorage.card.create(list.id, card);
    },
    [kanbanStorage.card, list.id]
  );

  const handleCardDelete = useCallback(
    (cardId: string) => () => {
      kanbanStorage.card.delete(list.id, cardId);
    },
    [kanbanStorage.card, list.id]
  );

  return (
    <ListDraggable id={list.id} index={index} onMove={onListMove}>
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
    </ListDraggable>
  );
};

export default List;
