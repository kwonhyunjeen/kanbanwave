import { useDispatch, useSelector } from 'react-redux';
import { AddItemForm, ListDroppable, Title, List } from 'components';
import { useCallback, useRef } from 'react';
import * as Dummy from 'dummy';
import * as CARD from 'store/card';
import * as LIST from 'store/list';
import { selectListOrders, selectLists } from 'store/list/selectors';
import { selectCardOrders } from 'store/card/selectors';
import { useDrop } from 'react-dnd';
import { ItemType } from 'store';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

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
      const id = Dummy.randomUUID();
      const list = { id, title };
      dispatch(LIST.addListToBoard(id));
      dispatch(LIST.addList(list));
      dispatch(CARD.setCardFromList({ listId: list.id, cardIds: [] }));
    },
    [dispatch]
  );

  const onListRemove = useCallback(
    (listId: string) => () => {
      console.log(cardOrders);
      cardOrders[listId].forEach(cardId => {
        dispatch(CARD.removeCard(cardId));
      });
      dispatch(CARD.removeListFromCard(listId));
      dispatch(LIST.removeList(listId));
      dispatch(LIST.removeListFromBoard(listId));
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
      dispatch(LIST.setListFromBoard(newOrders));
    },
    [dispatch, listOrders]
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const droppableIdListId = result.destination?.droppableId;
      const droppableIdCardIndex = result.destination?.index;
      if (droppableIdListId === undefined || droppableIdCardIndex === undefined) {
        return;
      }

      const draggableListId = result.source.droppableId;
      const draggableCardIndex = result.source.index;

      // 같은 목록에서 카드 옮길 때: 두 카드의 index 교체
      if (droppableIdListId === draggableListId) {
        const cardIdOrders = cardOrders[droppableIdListId];
        dispatch(
          CARD.setCardFromList({
            listId: droppableIdListId,
            cardIds: cardIdOrders.map((item, index) =>
              index === draggableCardIndex
                ? cardIdOrders[droppableIdCardIndex]
                : index === droppableIdCardIndex
                ? cardIdOrders[draggableCardIndex]
                : item
            )
          })
        );
        // 다른 목록으로 카드 옮길 때: 기존 리스트에서 카드 uuid 삭제, 드롭 리스트에서 카드 uuid 추가
      } else {
        const draggableCardIdOrders = cardOrders[draggableListId];
        dispatch(
          CARD.setCardFromList({
            listId: draggableListId,
            cardIds: draggableCardIdOrders.filter(
              (notUsed, index) => index !== draggableCardIndex
            )
          })
        );
        const droppableIdCardIdOrders = cardOrders[droppableIdListId];
        dispatch(
          CARD.setCardFromList({
            listId: droppableIdListId,
            cardIds: [
              ...droppableIdCardIdOrders.slice(0, droppableIdCardIndex),
              result.draggableId,
              ...droppableIdCardIdOrders.slice(droppableIdCardIndex)
            ]
          })
        );
      }
    },
    [dispatch, cardOrders]
  );

  return (
    <section className="app-base">
      <Title className="mb-4 text-white">Board</Title>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListDroppable>
          <div className="flex justify-start">
            <div className="flex">
              {lists?.map((list, index) => (
                <List
                  key={list.id}
                  list={list}
                  index={index}
                  onListMove={onListMove}
                  onListRemove={onListRemove(list.id)}
                />
              ))}
            </div>
            <AddItemForm
              itemMode="list"
              onItemAdd={onListAdd}
              listsLength={lists.length}
            />
          </div>
        </ListDroppable>
      </DragDropContext>
    </section>
  );
};

export default Board;
