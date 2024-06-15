import { KWBoard, KWBoardUUID, KWCard, KWCardUUID, KWList, KWListUUID } from 'kanbanwave';

const getItem = <T = unknown>(key: string): T | null =>
  JSON.parse(localStorage.getItem(key) ?? 'null');
const setItem = <T = unknown>(key: string, value: T): void =>
  localStorage.setItem(key, JSON.stringify(value));
const removeItem = (key: string): void => localStorage.removeItem(key);

const BOARD_KEY = () => 'kw_boards';
const LIST_KEY = () => `kw_lists`;
const LIST_ORDERS_KEY_BY_BOARD = (boardId: string) => `kw_list_orders_${boardId}`;
const CARD_KEY = () => `kw_cards`;
const CARD_ORDERS_KEY_BY_LIST = (listId: string) => `kw_card_orders_${listId}`;

const extractItemsByIds = <T extends { id: string }>(items: T[], ids: string[]): T[] => {
  const itemMap = new Map<string, T>();
  items.forEach(item => itemMap.set(item.id, item));
  return ids.map(id => itemMap.get(id)).filter((item): item is T => item != null);
};

const excludeItemsByIds = <T extends { id: string }>(items: T[], ids: string[]): T[] => {
  const idSet = new Set<string>();
  ids.forEach(id => idSet.add(id));
  return items.filter(item => !idSet.has(item.id));
};

export const getBoards = (boardIds?: KWBoardUUID[]): KWBoard[] => {
  const allBoards = getItem<KWBoard[]>(BOARD_KEY()) || [];
  return boardIds == null ? allBoards : extractItemsByIds(allBoards, boardIds);
};
export const setBoards = (boards: KWBoard[]) => setItem(BOARD_KEY(), boards);
export const removeBoards = (boardIds?: KWBoardUUID[]) => {
  const allBoards = getItem<KWBoard[]>(BOARD_KEY());
  if (allBoards == null) {
    return;
  }
  if (boardIds != null) {
    setItem(BOARD_KEY(), excludeItemsByIds(allBoards, boardIds));
  } else {
    removeItem(BOARD_KEY());
  }
};

export const getListOrdersByBoardId = (boardId: KWBoardUUID): KWListUUID[] =>
  getItem(LIST_ORDERS_KEY_BY_BOARD(boardId)) || [];
export const setListOrdersByBoardId = (boardId: KWBoardUUID, listIds: KWListUUID[]) =>
  setItem(LIST_ORDERS_KEY_BY_BOARD(boardId), listIds);
export const removeListOrdersByBoardId = (boardId: KWBoardUUID) =>
  removeItem(LIST_ORDERS_KEY_BY_BOARD(boardId));

export const getLists = (listIds?: KWListUUID[]): KWList[] => {
  const allLists = getItem<KWList[]>(LIST_KEY()) || [];
  return listIds == null ? allLists : extractItemsByIds(allLists, listIds);
};
export const setLists = (lists: KWList[]) => setItem(LIST_KEY(), lists);
export const removeLists = (listIds?: KWListUUID[]) => {
  const allLists = getItem<KWList[]>(LIST_KEY());
  if (allLists == null) {
    return;
  }
  if (listIds != null) {
    setItem(LIST_KEY(), excludeItemsByIds(allLists, listIds));
  } else {
    removeItem(LIST_KEY());
  }
};

export const getCardOrdersByListId = (listId: KWListUUID): KWCardUUID[] =>
  getItem(CARD_ORDERS_KEY_BY_LIST(listId)) || [];
export const setCardOrdersByListId = (listId: KWListUUID, cardIds: KWCardUUID[]) =>
  setItem(CARD_ORDERS_KEY_BY_LIST(listId), cardIds);
export const removeCardOrdersByListId = (listId: KWListUUID) =>
  removeItem(CARD_ORDERS_KEY_BY_LIST(listId));

export const getCards = (cardIds?: KWCardUUID[]): KWCard[] => {
  const allCards = getItem<KWCard[]>(CARD_KEY()) || [];
  return cardIds == null ? allCards : extractItemsByIds(allCards, cardIds);
};
export const setCards = (cards: KWCard[]) => setItem(CARD_KEY(), cards);
export const removeCards = (cardIds?: KWCardUUID[]) => {
  const allCards = getItem<KWCard[]>(CARD_KEY());
  if (allCards == null) {
    return;
  }
  if (cardIds != null) {
    setItem(CARD_KEY(), excludeItemsByIds(allCards, cardIds));
  } else {
    removeItem(CARD_KEY());
  }
};
