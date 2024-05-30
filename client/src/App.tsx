import { RouterProvider } from 'react-router-dom';
import router from 'routes/router';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { KanbanStorageProvider } from 'components';
import { PropsWithChildren } from 'react';
import { Board, BoardUUID, Card, CardUUID, List, ListUUID } from 'store';
import { DB } from 'utils';

function sortItemsByOrders<T extends { id: string }>(items: T[], orders: string[]): T[] {
  const itemMap = new Map<string, T>();
  items.forEach(item => itemMap.set(item.id, item));
  return orders.map(id => itemMap.get(id)!);
}

export const sampleKanbanStorage = {
  board: {
    getAll: () => sortItemsByOrders(DB.getBoards(), DB.getBoardOrders()),
    getOrders: () => DB.getBoardOrders(),
    create: (board: Board) => {
      const boards = [...DB.getBoards(), board];
      DB.setBoards(boards);
      DB.setBoardOrders(boards.map(board => board.id));
    },
    delete: (boardId: BoardUUID) => {
      DB.getListsOfBoard(boardId).forEach((list: List) => {
        DB.removeCardsOfList(list.id);
        DB.removeCardOrdersOfList(list.id);
      });

      DB.removeListsOfBoard(boardId);
      DB.removeListOrdersOfBoard(boardId);

      DB.setBoards(DB.getBoards().filter(board => board.id !== boardId));
      DB.setBoardOrders(DB.getBoardOrders().filter(id => id !== boardId));
    },
    reorder: (boardIds: BoardUUID[]) => DB.setBoardOrders(boardIds)
  },
  list: {
    getAll: (boardId: BoardUUID) =>
      sortItemsByOrders(DB.getListsOfBoard(boardId), DB.getListOrdersOfBoard(boardId)),
    getOrders: (boardId: BoardUUID) => DB.getListOrdersOfBoard(boardId),
    create: (boardId: BoardUUID, list: List) => {
      const lists = [...DB.getListsOfBoard(boardId), list];
      DB.setListsOfBoard(boardId, lists);
      DB.setListOrdersOfBoard(
        boardId,
        lists.map(list => list.id)
      );
    },
    delete: (boardId: BoardUUID, listId: ListUUID) => {
      DB.removeCardsOfList(listId);
      DB.removeCardOrdersOfList(listId);

      DB.setListsOfBoard(
        boardId,
        DB.getListsOfBoard(boardId).filter(list => list.id !== listId)
      );
      DB.setListOrdersOfBoard(
        boardId,
        DB.getListOrdersOfBoard(boardId).filter(id => id !== listId)
      );
    },
    reorder: (boardId: BoardUUID, listIds: ListUUID[]) =>
      DB.setListOrdersOfBoard(boardId, listIds)
  },
  card: {
    getAll: (listId: ListUUID) =>
      sortItemsByOrders(DB.getCardsOfList(listId), DB.getCardOrders(listId)),
    getOrders: (listId: ListUUID) => DB.getCardOrders(listId),
    create: (listId: ListUUID, card: Card) => {
      const cards = [...DB.getCardsOfList(listId), card];
      DB.setCardsOfList(listId, cards);
      DB.setCardOrdersOfList(
        listId,
        cards.map(card => card.id)
      );
    },
    delete: (listId: ListUUID, cardId: CardUUID) => {
      DB.setCardsOfList(
        listId,
        DB.getCardsOfList(listId).filter(card => card.id !== cardId)
      );
      DB.setCardOrdersOfList(
        listId,
        DB.getCardOrders(listId).filter(id => id !== cardId)
      );
    },
    reorder: (listId: ListUUID, cardIds: CardUUID[]) =>
      DB.setCardOrdersOfList(listId, cardIds)
  }
};

function KanbanProvider({ children }: PropsWithChildren) {
  return (
    <KanbanStorageProvider storage={sampleKanbanStorage}>
      {children}
    </KanbanStorageProvider>
  );
}

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <KanbanProvider>
        <RouterProvider router={router} />
      </KanbanProvider>
    </DndProvider>
  );
}

export default App;
