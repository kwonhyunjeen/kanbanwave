import {
  AddItemForm,
  Title,
  List,
  useKanbanList,
  useKanbanCard,
  StrictModeDroppable
} from 'components';
import { useCallback, useRef } from 'react';
import * as Dummy from 'dummy';
import { KWItemType } from 'store';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useLocation } from 'react-router-dom';

const Board = () => {
  const location = useLocation();

  const boardTitle = location.state?.board?.title;
  const boardId = location.state?.board?.id;

  const listStore = useKanbanList();
  const cardStore = useKanbanCard();
  const lists = listStore.getAll(boardId);

  const handleListAdd = useCallback(
    (title: string) => {
      const id = Dummy.randomUUID();
      const list = { id, title };
      listStore.create(boardId, list);
      cardStore.reorder(list.id, []);
    },
    [listStore, cardStore, boardId]
  );

  const handleListDelete = useCallback(
    (listId: string) => () => {
      listStore.delete(boardId, listId);
    },
    [listStore, boardId]
  );

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const { source: dragLocation, destination: dropLocation, type } = result;

      if (type === KWItemType.LIST) {
        const newOrder = Array.from(lists);
        const [removed] = newOrder.splice(dragLocation.index, 1);
        newOrder.splice(dropLocation.index, 0, removed);
        listStore.reorder(
          boardId,
          newOrder.map(list => list.id)
        );
      } else if (type === KWItemType.CARD) {
        const listIdOfDragLocation = dragLocation.droppableId;
        const listIdOfDropLocation = dropLocation.droppableId;

        const draggedCards = Array.from(cardStore.getAll(listIdOfDragLocation));
        const [removed] = draggedCards.splice(dragLocation.index, 1);

        // 같은 목록에서 카드 옮길 때: 두 카드의 index 교체
        if (listIdOfDragLocation === listIdOfDropLocation) {
          draggedCards.splice(dropLocation.index, 0, removed);
          cardStore.reorder(
            listIdOfDragLocation,
            draggedCards.map(card => card.id)
          );
          // 다른 목록으로 카드 옮길 때: 기존 리스트에서 카드 uuid 삭제, 드롭 리스트에서 카드 uuid 추가
        } else {
          const dropLocationCards = Array.from(cardStore.getAll(listIdOfDropLocation));
          dropLocationCards.splice(dropLocation.index, 0, removed);
          console.log(listIdOfDragLocation, listIdOfDropLocation);
          cardStore.reorder(
            listIdOfDragLocation,
            draggedCards.map(card => card.id)
          );
          cardStore.reorder(
            listIdOfDropLocation,
            dropLocationCards.map(card => card.id)
          );
        }
      }
    },
    [lists, listStore, cardStore, boardId]
  );

  return (
    <section className="app-base">
      <Title className="mb-4 text-white">{boardTitle}</Title>
      <DragDropContext onDragEnd={handleDragEnd}>
        <StrictModeDroppable
          droppableId="board"
          direction="horizontal"
          type={KWItemType.LIST}>
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex justify-start">
              {lists.map((list, index) => (
                <List
                  key={list.id}
                  list={list}
                  index={index}
                  onListDelete={handleListDelete(list.id)}
                />
              ))}
              {provided.placeholder}
              <AddItemForm
                itemMode="list"
                onItemAdd={handleListAdd}
                listsLength={lists.length}
              />
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </section>
  );
};

export default Board;
