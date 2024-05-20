import { List as IList } from 'store/commonTypes';
import {
  IconButton,
  AddItemForm,
  Subtitle,
  ListDraggable,
  CardDroppable
} from 'components';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'components';
import * as Dummy from 'dummy';
import * as CARD from 'store/card';

type ListProps = {
  index: number;
  list: IList;
  onListMove?: (dragIndex: number, hoverIndex: number) => void;
  onListDelete?: () => void;
};

const List = ({ index, list, onListMove, onListDelete, ...props }: ListProps) => {
  const dispatch = useDispatch();

  const cards = useSelector(CARD.selectCardsByListId(list.id));

  const onCardAdd = useCallback(
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
      dispatch(CARD.addCard({ listId: list.id, card }));
    },
    [dispatch, list.id]
  );

  const onCardRemove = useCallback(
    (cardId: string) => () => {
      dispatch(CARD.deleteCard({ listId: list.id, cardId: cardId }));
    },
    [dispatch, list.id]
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
              onCardRemove={onCardRemove(card.id)}
              draggableId={card.id}
              index={index}
            />
          ))}
        </CardDroppable>
        <AddItemForm itemMode="card" onItemAdd={onCardAdd} listsLength={cards?.length} />
      </div>
    </ListDraggable>
  );
};

export default List;
