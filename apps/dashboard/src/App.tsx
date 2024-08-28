import { RouterProvider } from 'react-router-dom';
import router from '@/routes/router';
import { PropsWithChildren, useEffect } from 'react';
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
import * as API from '@/api';

const sampleKanbanStorage: KanbanwaveStorage = {
  getBoards: () => API.getBoards(),

  getBoardContent: (boardId: KWBoardUUID) => API.getBoardContent(boardId),

  createBoard: (board: KWBoardForm) => API.createBoard(board),

  updateBoard: (board: KWBoard) => API.updateBoard(board),

  deleteBoard: (boardId: KWBoardUUID) => API.deleteBoard(boardId),

  createList: (boardId: KWBoardUUID, list: KWListForm) => API.createList(boardId, list),

  updateList: (boardId: KWBoardUUID, list: KWList) => API.updateList(list),

  deleteList: (boardId: KWBoardUUID, listId: KWListUUID) => API.deleteList(listId),

  reorderList: (
    boardId: KWBoardUUID,
    draggedListId: KWListUUID,
    droppedListIndex: number
  ) => API.reorderList(boardId, draggedListId, droppedListIndex),

  getCard: (cardId: KWCardUUID) => API.getCard(cardId),

  createCard: (boardId: KWBoardUUID, listId: KWListUUID, card: KWCardForm) =>
    API.createCard(listId, card),

  updateCard: (boardId: KWBoardUUID, listId: KWListUUID, card: KWCard) =>
    API.updateCard(card),

  deleteCard: (boardId: KWBoardUUID, listId: KWListUUID, cardId: KWCardUUID) =>
    API.deleteCard(cardId),

  reorderCard: (
    boardId: KWBoardUUID,
    fromListId: KWListUUID,
    toListId: KWListUUID,
    draggedCardId: KWCardUUID,
    droppedCardIndex: number
  ) => API.reorderCard(fromListId, toListId, draggedCardId, droppedCardIndex)
};

function KanbanProvider({ children }: PropsWithChildren) {
  return (
    <KanbanStorageProvider storage={sampleKanbanStorage}>
      {children}
    </KanbanStorageProvider>
  );
}

function App() {
  useEffect(() => {
    console.log(
      "%cKanbanWave",
      "color: #87CEEB; padding: 10px; font-size: 20px; font-weight: bold;"
    );
  }, []);
  
  return (
    <KanbanProvider>
      <RouterProvider router={router} />
    </KanbanProvider>
  );
}

export default App;
