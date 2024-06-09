import { RouterProvider } from 'react-router-dom';
import router from 'routes/router';
import { KanbanStorageProvider } from 'components';
import { PropsWithChildren } from 'react';
import { KWBoard, BoardUUID, KWCard, CardUUID, KWList, ListUUID } from 'types';
import { DB } from 'utils';

export const sampleKanbanStorage = {
  board: {
    getAll: () => DB.getBoards(DB.getBoardOrders()),
    getOrders: () => DB.getBoardOrders(),
    create: (board: KWBoard) => {
      DB.setBoards([...DB.getBoards(), board]);
      DB.setBoardOrders([...DB.getBoardOrders(), board.id]);
    },
    delete: (boardId: BoardUUID) => {
      DB.setBoardOrders(DB.getBoardOrders().filter(id => id !== boardId));
      DB.removeBoards([boardId]);

      const listIds = DB.getListOrdersByBoardId(boardId);
      DB.removeListOrdersByBoardId(boardId);
      DB.removeLists(listIds);

      listIds.forEach(listId => {
        const cardIds = DB.getCardOrdersByListId(listId);
        DB.removeCardOrdersByListId(listId);
        DB.removeCards(cardIds);
      });
    }
  },
  list: {
    getAll: (boardId: BoardUUID) => DB.getLists(DB.getListOrdersByBoardId(boardId)),
    getOrders: (boardId: BoardUUID) => DB.getListOrdersByBoardId(boardId),
    create: (boardId: BoardUUID, list: KWList) => {
      DB.setLists([...DB.getLists(), list]);
      DB.setListOrdersByBoardId(boardId, [
        ...DB.getListOrdersByBoardId(boardId),
        list.id
      ]);
    },
    delete: (boardId: BoardUUID, listId: ListUUID) => {
      DB.setListOrdersByBoardId(
        boardId,
        DB.getListOrdersByBoardId(boardId).filter(id => id !== listId)
      );
      DB.removeLists([listId]);

      const cardIds = DB.getCardOrdersByListId(listId);
      DB.removeCardOrdersByListId(listId);
      DB.removeCards(cardIds);
    },
    reorder: (boardId: BoardUUID, draggedListId: ListUUID, droppedListIndex: number) => {
      const listOrders = DB.getListOrdersByBoardId(boardId);

      const draggedListIndex = listOrders.findIndex(id => id === draggedListId);
      if (draggedListIndex === -1) {
        throw new Error(`List not found by '${draggedListId}'.`);
      }

      listOrders.splice(draggedListIndex, 1);
      listOrders.splice(droppedListIndex, 0, draggedListId);

      DB.setListOrdersByBoardId(boardId, listOrders);
    }
  },
  card: {
    getAll: (listId: ListUUID) => DB.getCards(DB.getCardOrdersByListId(listId)),
    getOrders: (listId: ListUUID) => DB.getCardOrdersByListId(listId),
    create: (listId: ListUUID, card: KWCard) => {
      DB.setCards([...DB.getCards(), card]);
      DB.setCardOrdersByListId(listId, [...DB.getCardOrdersByListId(listId), card.id]);
    },
    delete: (listId: ListUUID, cardId: CardUUID) => {
      DB.setCardOrdersByListId(
        listId,
        DB.getCardOrdersByListId(listId).filter(id => id !== cardId)
      );
      DB.removeCards([cardId]);
    },
    reorder: (
      fromListId: ListUUID,
      toListId: ListUUID,
      draggedCardId: CardUUID,
      droppedCardIndex: number
    ) => {
      const isSameList = fromListId === toListId;

      // from과 to가 같다면, cardOrders는 같은 객체를 참조함
      const cardOrdersFromList = DB.getCardOrdersByListId(fromListId);
      const cardOrdersToList = !isSameList
        ? DB.getCardOrdersByListId(toListId)
        : cardOrdersFromList;

      const draggedCardIndex = cardOrdersFromList.findIndex(id => id === draggedCardId);
      if (draggedCardIndex === -1) {
        throw new Error(`Card not found by '${draggedCardId}'.`);
      }

      cardOrdersFromList.splice(draggedCardIndex, 1);
      cardOrdersToList.splice(droppedCardIndex, 0, draggedCardId);

      if (!isSameList) DB.setCardOrdersByListId(fromListId, cardOrdersFromList);
      DB.setCardOrdersByListId(toListId, cardOrdersToList);
    }
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
    <KanbanProvider>
      <RouterProvider router={router} />
    </KanbanProvider>
  );
}

export default App;
