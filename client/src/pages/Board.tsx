import { useDispatch, useSelector } from 'react-redux';
import { AddItemForm, ListDroppable, Title, List } from 'components';
import { useCallback, useRef } from 'react';
import * as Dummy from 'dummy';
import * as CARD from 'store/card';
import * as LIST from 'store/list';
import { useDrop } from 'react-dnd';
import { ItemType } from 'store';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useLocation } from 'react-router-dom';

const Board = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const boardTitle = location.state?.board?.title;
  const boardId = location.state?.board?.id;

  const divRef = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: ItemType.LIST
  });
  drop(divRef);

  const cardOrders = useSelector(CARD.selectCardOrders);
  const lists = useSelector(LIST.selectListsByBoardId(boardId));

  const onListAdd = useCallback(
    (title: string) => {
      // @todo Update to real data once server integration is completed
      const id = Dummy.randomUUID();
      const list = { id, title };
      dispatch(LIST.addList({ boardId, list: list }));
      dispatch(CARD.setCard({ listId: list.id, cardIds: [] }));
    },
    [dispatch, boardId]
  );

  const onListDelete = useCallback(
    (listId: string) => () => {
      cardOrders[listId].forEach(cardId => {
        dispatch(CARD.deleteCard({ listId, cardId }));
      });
      dispatch(LIST.deleteList({ boardId, listId }));
    },
    [dispatch, cardOrders, boardId]
  );

  const onListMove = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const newOrders = [...lists];
      const [draggedItem] = newOrders.splice(dragIndex, 1); // 드래그된 아이템 제거
      newOrders.splice(hoverIndex, 0, draggedItem); // 새로운 위치에 아이템 추가

      dispatch(LIST.setList({ boardId, listIds: newOrders.map(list => list.id) }));
    },
    [dispatch, lists, boardId]
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
          CARD.setCard({
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
          CARD.setCard({
            listId: draggableListId,
            cardIds: draggableCardIdOrders.filter(
              (notUsed, index) => index !== draggableCardIndex
            )
          })
        );
        const droppableIdCardIdOrders = cardOrders[droppableIdListId];
        dispatch(
          CARD.setCard({
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
      <Title className="mb-4 text-white">{boardTitle}</Title>
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
                  onListDelete={onListDelete(list.id)}
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
