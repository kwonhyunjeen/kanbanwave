import {
  Title,
} from 'app/components';
import { useCallback } from 'react';
import * as Dummy from 'app/dummy';
import { AddItemForm, KWItemType, List, useKanbanCard, useKanbanList } from 'kanbanwave';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useLocation } from 'react-router-dom';
import StrictModeDroppable from 'kanbanwave/StrictModeDroppable';

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
    },
    [listStore, boardId]
  );

  const handleListDelete = useCallback(
    (listId: string) => () => {
      listStore.delete(boardId, listId);
    },
    [listStore, boardId]
  );

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { type, draggableId, source, destination } = result;
      if (!destination) return;

      if (type === KWItemType.LIST) {
        listStore.reorder(destination.droppableId, draggableId, destination.index);
      } else if (type === KWItemType.CARD) {
        cardStore.reorder(
          source.droppableId,
          destination.droppableId,
          draggableId,
          destination.index
        );
      }
    },
    [listStore, cardStore]
  );

  return (
    <section className="app-base">
      <Title className="mb-4 text-white">{boardTitle}</Title>
      <DragDropContext onDragEnd={handleDragEnd}>
        <StrictModeDroppable
          droppableId={boardId}
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
