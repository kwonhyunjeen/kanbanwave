import { List } from 'store/commonTypes';
import { IconButton, AddItemForm, Subtitle, ListDraggable } from 'components';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListCard from './ListCard';
import * as Dummy from 'dummy';
import * as CARD from 'store/card';
import { selectCards } from 'store/card/selectors';

type BoardListProps = {
  index: number;
  list: List;
  onListMove?: (dragIndex: number, hoverIndex: number) => void;
  onListRemove?: () => void;
};

const BoardList = ({
  index,
  list,
  onListMove,
  onListRemove,
  ...props
}: BoardListProps) => {
  const dispatch = useDispatch();

  const cards = useSelector(selectCards)(list.uuid);

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
        Dummy.makeRelativeDate(currentDate)
      );
      dispatch(CARD.addCard(card));
      dispatch(CARD.appendCardToList({ listId: list.uuid, cardId: card.uuid }));
    },
    [dispatch, list.uuid]
  );

  const onCardRemove = useCallback(
    (cardId: string) => () => {
      dispatch(CARD.removeCard(cardId));
      dispatch(CARD.removeCardFromList({ listId: list.uuid, cardId: cardId }));
    },
    [dispatch, list.uuid]
  );

  return (
    <ListDraggable id={list.uuid} index={index} onMove={onListMove}>
      <div {...props} className="w-64 p-2 mr-2 bg-white rounded-lg shadow-lg h-fit">
        <div className="flex items-center justify-between mb-2">
          <Subtitle className="flex-1 pl-2 break-all" size="lg">
            {list.title}
          </Subtitle>
          <div className="flex justify-between ml-2">
            <IconButton
              name="remove"
              className="w-8 bg-transparent border-0 shadow-transparent tn-xs"
              aria-label="delete a list"
              onClick={onListRemove}
            />
          </div>
        </div>
        {cards?.map(card => (
          <ListCard key={card.uuid} card={card} onCardRemove={onCardRemove(card.uuid)} />
        ))}
        <AddItemForm itemMode="card" onItemAdd={onCardAdd} listsLength={cards?.length} />
      </div>
    </ListDraggable>
  );
};

export default BoardList;
