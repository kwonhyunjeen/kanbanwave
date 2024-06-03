import { KWBoard, BoardUUID, KWCard, CardUUID, KWList, ListUUID } from 'store';

const getItem = (key: string) => JSON.parse(localStorage.getItem(key) ?? 'null');
const setItem = (key: string, value: unknown) =>
  localStorage.setItem(key, JSON.stringify(value));
const removeItem = (key: string) => localStorage.removeItem(key);

const BOARD_KEY = () => 'kanban_boards';
const BOARD_ORDERS_KEY = () => 'kanban_board_orders';
const LIST_KEY_OF_BOARD = (boardId: string) => `kanban_lists_${boardId}`;
const LIST_ORDERS_KEY_OF_BOARD = (boardId: string) => `kanban_list_orders_${boardId}`;
const CARD_KEY_OF_LIST = (listId: string) => `kanban_cards_${listId}`;
const CARD_ORDERS_KEY_OF_LIST = (listId: string) => `kanban_card_orders_${listId}`;

export const getBoards = (): KWBoard[] => getItem(BOARD_KEY()) || [];
export const setBoards = (boards: KWBoard[]) => setItem(BOARD_KEY(), boards);
export const getBoardOrders = (): BoardUUID[] => getItem(BOARD_ORDERS_KEY()) || [];
export const setBoardOrders = (boardIds: BoardUUID[]) =>
  setItem(BOARD_ORDERS_KEY(), boardIds);

export const getListsOfBoard = (boardId: BoardUUID): KWList[] =>
  getItem(LIST_KEY_OF_BOARD(boardId)) || [];
export const setListsOfBoard = (boardId: BoardUUID, lists: KWList[]) =>
  setItem(LIST_KEY_OF_BOARD(boardId), lists);
export const removeListsOfBoard = (boardId: BoardUUID) =>
  removeItem(LIST_KEY_OF_BOARD(boardId));
export const getListOrdersOfBoard = (boardId: BoardUUID): ListUUID[] =>
  getItem(LIST_ORDERS_KEY_OF_BOARD(boardId)) || [];
export const setListOrdersOfBoard = (boardId: BoardUUID, listIds: ListUUID[]) =>
  setItem(LIST_ORDERS_KEY_OF_BOARD(boardId), listIds);
export const removeListOrdersOfBoard = (boardId: BoardUUID) =>
  removeItem(LIST_ORDERS_KEY_OF_BOARD(boardId));

export const getCardsOfList = (listId: ListUUID): KWCard[] =>
  getItem(CARD_KEY_OF_LIST(listId)) || [];
export const setCardsOfList = (listId: ListUUID, cards: KWCard[]) =>
  setItem(CARD_KEY_OF_LIST(listId), cards);
export const removeCardsOfList = (listId: ListUUID) =>
  removeItem(CARD_KEY_OF_LIST(listId));
export const getCardOrders = (listId: ListUUID): CardUUID[] =>
  getItem(CARD_ORDERS_KEY_OF_LIST(listId)) || [];
export const setCardOrdersOfList = (listId: ListUUID, cardIds: CardUUID[]) =>
  setItem(CARD_ORDERS_KEY_OF_LIST(listId), cardIds);
export const removeCardOrdersOfList = (listId: ListUUID) =>
  removeItem(CARD_ORDERS_KEY_OF_LIST(listId));
