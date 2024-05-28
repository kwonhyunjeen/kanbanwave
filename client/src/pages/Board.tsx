import { AddItemForm, ListDroppable, Title, List, useKanbanStorage } from 'components';
import { useCallback, useRef } from 'react';
import * as Dummy from 'dummy';
import { useDrop } from 'react-dnd';
import { ItemType } from 'store';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useLocation } from 'react-router-dom';

const Board = () => {
  const location = useLocation();

  const boardTitle = location.state?.board?.title;
  const boardId = location.state?.board?.id;

  const kanbanStorage = useKanbanStorage();

  const divRef = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: ItemType.LIST
  });
  drop(divRef);

  const lists = kanbanStorage.list.getAll(boardId);

  const handleListAdd = useCallback(
    (title: string) => {
      // @todo Update to real data once server integration is completed
      const id = Dummy.randomUUID();
      const list = { id, title };
      kanbanStorage.list.create(boardId, list);
      kanbanStorage.card.reorder(list.id, []);
    },
    [kanbanStorage.list, kanbanStorage.card, boardId]
  );

  const handleListDelete = useCallback(
    (listId: string) => () => {
      kanbanStorage.list.delete(boardId, listId);
    },
    [kanbanStorage.list, boardId]
  );

  const handleListMove = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const newOrders = [...lists];
      const [draggedItem] = newOrders.splice(dragIndex, 1); // 드래그된 아이템 제거
      newOrders.splice(hoverIndex, 0, draggedItem); // 새로운 위치에 아이템 추가

      kanbanStorage.list.reorder(
        boardId,
        newOrders.map(list => list.id)
      );
    },
    [kanbanStorage.list, lists, boardId]
  );

  const handleDragEnd = useCallback(
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
        const cardIdOrders = kanbanStorage.card.getOrders(droppableIdListId);
        kanbanStorage.card.reorder(
          droppableIdListId,
          cardIdOrders.map((item, index) =>
            index === draggableCardIndex
              ? cardIdOrders[droppableIdCardIndex]
              : index === droppableIdCardIndex
              ? cardIdOrders[draggableCardIndex]
              : item
          )
        );
        // 다른 목록으로 카드 옮길 때: 기존 리스트에서 카드 uuid 삭제, 드롭 리스트에서 카드 uuid 추가
      } else {
        const draggableCardIdOrders = kanbanStorage.card.getOrders(draggableListId);
        kanbanStorage.card.reorder(
          draggableListId,
          draggableCardIdOrders.filter((notUsed, index) => index !== draggableCardIndex)
        );
        const droppableIdCardIdOrders = kanbanStorage.card.getOrders(droppableIdListId);
        kanbanStorage.card.reorder(droppableIdListId, [
          ...droppableIdCardIdOrders.slice(0, droppableIdCardIndex),
          result.draggableId,
          ...droppableIdCardIdOrders.slice(droppableIdCardIndex)
        ]);
      }
    },
    [kanbanStorage.card]
  );

  return (
    <section className="app-base">
      <Title className="mb-4 text-white">{boardTitle}</Title>
      <DragDropContext onDragEnd={handleDragEnd}>
        <ListDroppable>
          <div className="flex justify-start">
            <div className="flex">
              {lists?.map((list, index) => (
                <List
                  key={list.id}
                  list={list}
                  index={index}
                  onListMove={handleListMove}
                  onListDelete={handleListDelete(list.id)}
                />
              ))}
            </div>
            <AddItemForm
              itemMode="list"
              onItemAdd={handleListAdd}
              listsLength={lists.length}
            />
          </div>
        </ListDroppable>
      </DragDropContext>
    </section>
  );
};

export default Board;
