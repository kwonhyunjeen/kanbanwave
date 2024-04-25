import { CardMgmtState, CardOrdersState, List } from 'store/commonTypes';
import { IconButton, AddItemForm, Subtitle } from 'components';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'store/AppState';
import ListCard from './ListCard';
import * as Dummy from 'dummy';
import * as CM from 'store/cardMgmt';
import * as CO from 'store/cardOrders';

type BoardListProps = {
  list: List;
  onRemoveList?: () => void;
};

const BoardList = ({ list, onRemoveList, ...props }: BoardListProps) => {
  const dispatch = useDispatch();

  const cardOrders = useSelector<AppState, CardOrdersState>(state => state.cardOrders);
  const cardMgmt = useSelector<AppState, CardMgmtState>(state => state.cardMgmt);
  const cards = cardOrders[list.uuid]?.map(uuid => cardMgmt[uuid]);

  const onCardAdd = useCallback(
    (title: string) => {
      const currentDate = Dummy.getCurrentDate();
      const card = Dummy.makeCard(
        Dummy.randomUUID(),
        Dummy.makeRandomUser(),
        title,
        Dummy.randomParagraphs(5),
        Dummy.makeDayMonthYear(currentDate),
        Dummy.makeRelativeDate(currentDate)
      );
      dispatch(CM.addCard(card));
      dispatch(CO.appendCardToList({ listId: list.uuid, cardId: card.uuid }));
    },
    [dispatch, list.uuid]
  );

  const onCardRemove = useCallback(
    (cardId: string) => () => {
      dispatch(CM.removeCard(cardId));
      dispatch(CO.removeCardFromList({ listId: list.uuid, cardId: cardId }));
    },
    [dispatch, list.uuid]
  );

  return (
    <div {...props} className="p-2 mr-2 bg-white rounded-lg shadow-lg min-w-64 h-fit ">
      <div className="flex items-center justify-between mb-2">
        <Subtitle className="flex-1 w-32 pl-2" size="lg">
          {list.title}
        </Subtitle>
        <div className="flex justify-between ml-2">
          <IconButton
            name="remove"
            className="w-8 bg-transparent border-0 shadow-transparent tn-xs"
            aria-label="delete a list"
            onClick={onRemoveList}
          />
        </div>
      </div>
      {cards?.map(card => (
        <ListCard key={card.uuid} card={card} onCardRemove={onCardRemove(card.uuid)} />
      ))}
      <AddItemForm itemMode="card" onItemAdd={onCardAdd} listsLength={cards?.length} />
    </div>
  );
};

export default BoardList;
