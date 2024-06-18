import { Title } from 'app/components';
import { useCallback } from 'react';
import {
  AddItemForm,
  KWBoard,
  KWCard,
  KWCardForm,
  KWItemType,
  KWListForm,
  KWListUUID,
  List,
  useKanbanBoardContent
} from 'kanbanwave';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import StrictModeDroppable from 'kanbanwave/StrictModeDroppable';
import { date, dummy } from 'app/utils';

type BoardProps = {
  /** @todo board 대신 boardId를 받도록 리팩토링 */
  board: KWBoard;
};

const Board = ({ board: boardProp }: BoardProps) => {
  const boardContentStore = useKanbanBoardContent();

  const { lists, ...board } = boardContentStore.getBoardContent(boardProp.id);

  const cardsByList = lists.reduce<Partial<Record<KWListUUID, KWCard[]>>>((acc, list) => {
    acc[list.id] = list.cards;
    return acc;
  }, {});

  const handleListAdd = useCallback(
    (title: string) => {
      const list: KWListForm = { title };
      boardContentStore.createList(board.id, list);
    },
    [boardContentStore, board.id]
  );

  const handleListDelete = useCallback(
    (listId: string) => () => {
      boardContentStore.deleteList(board.id, listId);
    },
    [boardContentStore, board.id]
  );

  const handleCardAdd = useCallback(
    (listId: string) => (title: string) => {
      const currentDate = new Date();
      const card: KWCardForm = {
        title,
        writer: {
          id: dummy.randomUUID(),
          name: dummy.randomName(),
          email: dummy.randomEmail()
        },
        description: dummy.randomParagraphs(5),
        startDate: date.makeDayMonthYear(currentDate),
        dueDate: date.makeDayMonthYear(currentDate)
      };
      boardContentStore.createCard(board.id, listId, card);
    },
    [boardContentStore, board.id]
  );

  const handleCardDelete = useCallback(
    (listId: string) => (cardId: string) => {
      boardContentStore.deleteCard(board.id, listId, cardId);
    },
    [boardContentStore, board.id]
  );

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { type, draggableId, source, destination } = result;
      if (!destination) return;

      if (type === KWItemType.LIST) {
        boardContentStore.reorderList(
          destination.droppableId,
          draggableId,
          destination.index
        );
      } else if (type === KWItemType.CARD) {
        boardContentStore.reorderCard(
          board.id,
          source.droppableId,
          destination.droppableId,
          draggableId,
          destination.index
        );
      }
    },
    [boardContentStore, board.id]
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
                  cards={cardsByList[list.id] ?? []}
                  index={index}
                  onListDelete={handleListDelete(list.id)}
                  onCardAdd={handleCardAdd(list.id)}
                  onCardDelete={handleCardDelete(list.id)}
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
