import { RouterProvider } from 'react-router-dom';
import router from 'app/routes/router';
import { PropsWithChildren } from 'react';
import {
  KWBoard,
  KWBoardForm,
  KWBoardUUID,
  KWCard,
  KWCardForm,
  KWCardUUID,
  KWList,
  KWListForm,
  KWListUUID,
  KanbanStorageProvider,
  KanbanwaveStorage
} from 'kanbanwave';
import { DB } from 'app/utils';

export const sampleKanbanStorage: KanbanwaveStorage = {
  getBoards: () => DB.getBoards(),

  getBoardContent: (boardId: KWBoardUUID) => ({
    ...DB.getBoards([boardId])[0],
    lists: DB.getLists(DB.getListOrdersByBoardId(boardId)).map(list => ({
      ...list,
      cards: DB.getCards(DB.getCardOrdersByListId(list.id))
    }))
  }),

  createBoard: (board: KWBoardForm) => {
    DB.setBoards([...DB.getBoards(), { ...board, id: crypto.randomUUID() }]);
  },

  updateBoard: (board: KWBoard) => {
    DB.setBoards(DB.getBoards().map(it => (it.id === board.id ? board : it)));
  },

  deleteBoard: (boardId: KWBoardUUID) => {
    DB.removeBoards([boardId]);
    const listIds = DB.getListOrdersByBoardId(boardId);
    DB.removeLists(listIds);
    listIds.forEach(listId => {
      const cardIds = DB.getCardOrdersByListId(listId);
      DB.removeCards(cardIds);
    });
  },

  createList: (boardId: KWBoardUUID, list: KWListForm) => {
    const listId = crypto.randomUUID();
    DB.setLists([...DB.getLists(), { ...list, id: listId, boardId }]);
    DB.setListOrdersByBoardId(boardId, [...DB.getListOrdersByBoardId(boardId), listId]);
  },

  updateList: (boardId: KWBoardUUID, list: KWList) => {
    DB.setLists(DB.getLists().map(it => (it.id === list.id ? list : it)));
  },

  deleteList: (boardId: KWBoardUUID, listId: KWListUUID) => {
    DB.setListOrdersByBoardId(
      boardId,
      DB.getListOrdersByBoardId(boardId).filter(id => id !== listId)
    );
    DB.removeLists([listId]);
    const cardIds = DB.getCardOrdersByListId(listId);
    DB.removeCardOrdersByListId(listId);
    DB.removeCards(cardIds);
  },

  reorderList: (
    boardId: KWBoardUUID,
    draggedListId: KWListUUID,
    droppedListIndex: number
  ) => {
    const listOrders = DB.getListOrdersByBoardId(boardId);
    const draggedListIndex = listOrders.findIndex(id => id === draggedListId);
    if (draggedListIndex === -1) {
      throw new Error(`List not found by '${draggedListId}'.`);
    }
    listOrders.splice(draggedListIndex, 1);
    listOrders.splice(droppedListIndex, 0, draggedListId);
    DB.setListOrdersByBoardId(boardId, listOrders);
  },

  getCard: (cardId: KWCardUUID) => DB.getCards([cardId])[0],

  createCard: (boardId: KWBoardUUID, listId: KWListUUID, card: KWCardForm) => {
    const cardId = crypto.randomUUID();
    DB.setCards([...DB.getCards(), { ...card, id: cardId, boardId, listId }]);
    DB.setCardOrdersByListId(listId, [...DB.getCardOrdersByListId(listId), cardId]);
  },

  updateCard: (boardId: KWBoardUUID, listId: KWListUUID, card: KWCard) => {
    DB.setCards(DB.getCards().map(it => (it.id === card.id ? card : it)));
  },

  deleteCard: (boardId: KWBoardUUID, listId: KWListUUID, cardId: KWCardUUID) => {
    DB.setCardOrdersByListId(
      listId,
      DB.getCardOrdersByListId(listId).filter(id => id !== cardId)
    );
    DB.removeCards([cardId]);
  },

  reorderCard: (
    boardId: KWBoardUUID,
    fromListId: KWListUUID,
    toListId: KWListUUID,
    draggedCardId: KWCardUUID,
    droppedCardIndex: number
  ) => {
    console.log({ fromListId, toListId, draggedCardId, droppedCardIndex });
    const isSameList = fromListId === toListId;
    const cardOrdersFromList = DB.getCardOrdersByListId(fromListId);
    // from과 to가 같다면, cardOrders는 같은 객체를 참조함
    const cardOrdersToList = isSameList
      ? cardOrdersFromList
      : DB.getCardOrdersByListId(toListId);
    const draggedCardIndex = cardOrdersFromList.findIndex(id => id === draggedCardId);
    if (draggedCardIndex === -1) {
      throw new Error(`Card not found by '${draggedCardId}'.`);
    }
    cardOrdersFromList.splice(draggedCardIndex, 1);
    cardOrdersToList.splice(droppedCardIndex, 0, draggedCardId);
    if (!isSameList) DB.setCardOrdersByListId(fromListId, cardOrdersFromList);
    DB.setCardOrdersByListId(toListId, cardOrdersToList);
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
