import { useDispatch, useSelector } from 'react-redux';
import { AddItemForm, ListDroppable, Title } from 'components';
import { useCallback, useRef } from 'react';
import * as Dummy from 'dummy';
import { BoardList } from 'pages';
import * as LIST from 'store/list';
import * as CARD from 'store/card';
import { selectListOrders, selectLists } from 'store/list/selectors';
import { selectCardOrders } from 'store/card/selectors';
import { useDrop } from 'react-dnd';
import { ItemType } from 'store';

const Board = () => {
  const dispatch = useDispatch();

  const divRef = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: ItemType.LIST
  });
  drop(divRef);

  const cardOrders = useSelector(selectCardOrders);
  const listOrders = useSelector(selectListOrders);
  const lists = useSelector(selectLists);

  const onListAdd = useCallback(
    (title: string) => {
      // @todo Update to real data once server integration is completed
      const uuid = Dummy.randomUUID();
      const list = { uuid, title };
      dispatch(LIST.addListToOrders(uuid));
      dispatch(LIST.addList(list));
      dispatch(CARD.setCardOrdersFromList({ listId: list.uuid, cardIds: [] }));
    },
    [dispatch]
  );

  const onListRemove = useCallback(
    (listId: string) => () => {
      cardOrders[listId].forEach(cardId => {
        dispatch(CARD.removeCard(cardId));
      });
      dispatch(CARD.removeList(listId));
      dispatch(LIST.removeList(listId));
      dispatch(LIST.removeListFromOrders(listId));
    },
    [dispatch, cardOrders]
  );

  const onListMove = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const newOrders = listOrders.map((item, index) =>
        index === dragIndex
          ? listOrders[hoverIndex]
          : index === hoverIndex
          ? listOrders[dragIndex]
          : item
      );
      dispatch(LIST.setListOrders(newOrders));
    },
    [dispatch, listOrders]
  );

  return (
    <section className="app-base">
      <Title className="mb-4 text-white">Board</Title>
      <ListDroppable>
        <div className="flex justify-start">
          <div className="flex">
            {lists?.map((list, index) => (
              <BoardList
                key={list.uuid}
                list={list}
                index={index}
                onListMove={onListMove}
                onListRemove={onListRemove(list.uuid)}
              />
            ))}
          </div>
          <AddItemForm itemMode="list" onItemAdd={onListAdd} listsLength={lists.length} />
        </div>
      </ListDroppable>
    </section>
  );
};

export default Board;
