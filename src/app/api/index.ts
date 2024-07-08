import * as DB from './DB';
import {
  KWBoard,
  KWBoardForm,
  KWBoardUUID,
  KWCard,
  KWCardForm,
  KWCardUUID,
  KWList,
  KWListForm,
  KWListUUID
} from 'kanbanwave';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getBoards = async () => {
  await delay(300);
  return DB.getBoards();
};

export const getBoardContent = async (boardId: KWBoardUUID) => {
  await delay(300);
  return {
    ...DB.getBoards([boardId])[0],
    lists: DB.getLists(DB.getListOrdersByBoardId(boardId)).map(list => ({
      ...list,
      cards: DB.getCards(DB.getCardOrdersByListId(list.id))
    }))
  };
};

export const createBoard = (board: KWBoardForm) => {
  DB.setBoards([...DB.getBoards(), { ...board, id: crypto.randomUUID() }]);
};

export const updateBoard = (board: KWBoard) => {
  if (DB.getBoards([board.id])[0] == null) {
    throw new Error(`Board not found by '${board.id}'.`);
  }
  DB.setBoards(DB.getBoards().map(it => (it.id === board.id ? board : it)));
};

export const deleteBoard = (boardId: KWBoardUUID) => {
  const board = DB.getBoards([boardId])[0];
  if (board == null) {
    throw new Error(`Board not found by '${boardId}'.`);
  }
  DB.removeBoards([boardId]);
  const listIds = DB.getListOrdersByBoardId(boardId);
  DB.removeLists(listIds);
  listIds.forEach(listId => {
    const cardIds = DB.getCardOrdersByListId(listId);
    DB.removeCards(cardIds);
  });
};

export const createList = (boardId: KWBoardUUID, list: KWListForm) => {
  const board = DB.getBoards([boardId])[0];
  if (board == null) {
    throw new Error(`Board not found by '${boardId}'.`);
  }
  const listId = crypto.randomUUID();
  DB.setLists([...DB.getLists(), { ...list, id: listId, boardId }]);
  DB.setListOrdersByBoardId(boardId, [...DB.getListOrdersByBoardId(boardId), listId]);
};

export const updateList = (list: KWList) => {
  if (DB.getLists([list.id])[0] == null) {
    throw new Error(`Board not found by '${list.id}'.`);
  }
  DB.setLists(DB.getLists().map(it => (it.id === list.id ? list : it)));
};

export const deleteList = (listId: KWListUUID) => {
  const list = DB.getLists([listId])[0];
  if (list == null) {
    throw new Error(`List not found by '${listId}'.`);
  }
  const { boardId } = list;
  DB.setListOrdersByBoardId(
    boardId,
    DB.getListOrdersByBoardId(boardId).filter(id => id !== listId)
  );
  DB.removeLists([listId]);
  const cardIds = DB.getCardOrdersByListId(listId);
  DB.removeCardOrdersByListId(listId);
  DB.removeCards(cardIds);
};

export const reorderList = async (
  boardId: KWBoardUUID,
  draggedListId: KWListUUID,
  droppedListIndex: number
) => {
  await delay(300);
  const listOrders = DB.getListOrdersByBoardId(boardId);
  const draggedListIndex = listOrders.findIndex(id => id === draggedListId);
  if (draggedListIndex === -1) {
    throw new Error(`List not found by '${draggedListId}'.`);
  }
  listOrders.splice(draggedListIndex, 1);
  listOrders.splice(droppedListIndex, 0, draggedListId);
  DB.setListOrdersByBoardId(boardId, listOrders);
};

export const getCard = async (cardId: KWCardUUID) => DB.getCards([cardId])[0];

export const createCard = (listId: KWListUUID, card: KWCardForm) => {
  const list = DB.getLists([listId])[0];
  if (list == null) {
    throw new Error(`List not found by '${listId}'.`);
  }
  const { boardId } = list;
  const cardId = crypto.randomUUID();
  DB.setCards([...DB.getCards(), { ...card, id: cardId, boardId, listId }]);
  DB.setCardOrdersByListId(listId, [...DB.getCardOrdersByListId(listId), cardId]);
};

export const updateCard = (card: KWCard) => {
  DB.setCards(DB.getCards().map(it => (it.id === card.id ? card : it)));
};

export const deleteCard = (cardId: KWCardUUID) => {
  const card = DB.getCards([cardId])[0];
  if (card == null) {
    throw new Error(`Card not found by '${cardId}'.`);
  }
  const { listId } = card;
  DB.setCardOrdersByListId(
    listId,
    DB.getCardOrdersByListId(listId).filter(id => id !== cardId)
  );
  DB.removeCards([cardId]);
};

export const reorderCard = async (
  fromListId: KWListUUID,
  toListId: KWListUUID,
  draggedCardId: KWCardUUID,
  droppedCardIndex: number
) => {
  await delay(300);
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
};
