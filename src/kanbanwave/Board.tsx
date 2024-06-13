import { Title } from 'app/components';
import { useCallback } from 'react';
import * as Dummy from 'app/dummy';
import {
  AddItemForm,
  KWBoard,
  KWItemType,
  List,
  useKanbanCard,
  useKanbanList
} from 'kanbanwave';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import StrictModeDroppable from 'kanbanwave/StrictModeDroppable';

type BoardProps = {
  board: KWBoard;
};

const Board = ({ board }: BoardProps) => {
  const listStore = useKanbanList();
  const cardStore = useKanbanCard();
  const lists = listStore.getAll(board.id);

  const handleListAdd = useCallback(
    (title: string) => {
      const id = Dummy.randomUUID();
      const list = { id, title };
      listStore.create(board.id, list);
    },
    [listStore, board.id]
  );

  const handleListDelete = useCallback(
    (listId: string) => () => {
      listStore.delete(board.id, listId);
    },
    [listStore, board.id]
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
      <Title className="mb-4 text-white">{board.title}</Title>
      <DragDropContext onDragEnd={handleDragEnd}>
        <StrictModeDroppable
          droppableId={board.id}
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
