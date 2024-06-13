import { KWBoard, BoardUUID, KWCard, CardUUID, KWList, ListUUID } from 'kanbanwave';

const getItem = <T = unknown>(key: string): T | null =>
  JSON.parse(localStorage.getItem(key) ?? 'null');
const setItem = <T = unknown>(key: string, value: T): void =>
  localStorage.setItem(key, JSON.stringify(value));
const removeItem = (key: string): void => localStorage.removeItem(key);

const BOARD_KEY = () => 'kw_boards';
const BOARD_ORDERS_KEY = () => 'kw_board_orders';
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

export const getBoardOrders = (): BoardUUID[] => getItem(BOARD_ORDERS_KEY()) || [];
export const setBoardOrders = (boardIds: BoardUUID[]) =>
  setItem(BOARD_ORDERS_KEY(), boardIds);

export const getBoards = (boardIds?: BoardUUID[]): KWBoard[] => {
  const allBoards = getItem<KWBoard[]>(BOARD_KEY()) || [];
  return boardIds == null ? allBoards : extractItemsByIds(allBoards, boardIds);
};
export const setBoards = (boards: KWBoard[]) => setItem(BOARD_KEY(), boards);
export const removeBoards = (boardIds?: BoardUUID[]) => {
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

export const getListOrdersByBoardId = (boardId: BoardUUID): ListUUID[] =>
  getItem(LIST_ORDERS_KEY_BY_BOARD(boardId)) || [];
export const setListOrdersByBoardId = (boardId: BoardUUID, listIds: ListUUID[]) =>
  setItem(LIST_ORDERS_KEY_BY_BOARD(boardId), listIds);
export const removeListOrdersByBoardId = (boardId: BoardUUID) =>
  removeItem(LIST_ORDERS_KEY_BY_BOARD(boardId));

export const getLists = (listIds?: ListUUID[]): KWList[] => {
  const allLists = getItem<KWList[]>(LIST_KEY()) || [];
  return listIds == null ? allLists : extractItemsByIds(allLists, listIds);
};
export const setLists = (lists: KWList[]) => setItem(LIST_KEY(), lists);
export const removeLists = (listIds?: ListUUID[]) => {
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

export const getCardOrdersByListId = (listId: ListUUID): CardUUID[] =>
  getItem(CARD_ORDERS_KEY_BY_LIST(listId)) || [];
export const setCardOrdersByListId = (listId: ListUUID, cardIds: CardUUID[]) =>
  setItem(CARD_ORDERS_KEY_BY_LIST(listId), cardIds);
export const removeCardOrdersByListId = (listId: ListUUID) =>
  removeItem(CARD_ORDERS_KEY_BY_LIST(listId));

export const getCards = (cardIds?: CardUUID[]): KWCard[] => {
  const allCards = getItem<KWCard[]>(CARD_KEY()) || [];
  return cardIds == null ? allCards : extractItemsByIds(allCards, cardIds);
};
export const setCards = (cards: KWCard[]) => setItem(CARD_KEY(), cards);
export const removeCards = (cardIds?: CardUUID[]) => {
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
