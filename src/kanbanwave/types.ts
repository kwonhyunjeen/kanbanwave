export type CardUUID = string;
export type ListUUID = string;
export type BoardUUID = string;

export type KWUser = {
  id: string;
  name: string;
  email: string;
};

export type KWCard = {
  id: CardUUID;
  title: string;
  writer?: KWUser;
  description?: string;
  startDate?: string;
  dueDate?: string;
  relativeDate?: string | null;
};

export type KWList = {
  id: ListUUID;
  title: string;
  cards?: CardUUID[];
};

export type KWBoard = {
  id: BoardUUID;
  title: string;
  lists?: ListUUID[];
};

export const KWItemType = {
  CARD: 'card',
  LIST: 'list'
} as const;
export type KWItemType = (typeof KWItemType)[keyof typeof KWItemType];

export type KanbanStorageUnit = {
  getAll: (...args: any[]) => unknown;
  getOrders: (...args: any[]) => unknown;
  create: (...args: any[]) => unknown;
  delete: (...args: any[]) => unknown;
  reorder?: (...args: any[]) => unknown;
};

export type KanbanBoardStorage = {
  getAll: () => KWBoard[];
  getOrders: () => BoardUUID[];
  create: (board: KWBoard) => void;
  delete: (boardId: BoardUUID) => void;
};

export type KanbanListStorage = {
  getAll: (boardId: BoardUUID) => KWList[];
  getOrders: (boardId: BoardUUID) => ListUUID[];
  create: (boardId: BoardUUID, list: KWList) => void;
  delete: (boardId: BoardUUID, listId: ListUUID) => void;
  reorder: (
    boardId: BoardUUID,
    draggedListId: ListUUID,
    droppedListIndex: number
  ) => void;
};

export type KanbanCardStorage = {
  getAll: (listId: ListUUID) => KWCard[];
  getOrders: (listId: ListUUID) => CardUUID[];
  create: (listId: ListUUID, card: KWCard) => void;
  delete: (listId: ListUUID, cardId: CardUUID) => void;
  reorder: (
    fromListId: ListUUID,
    toListId: ListUUID,
    draggedCardId: CardUUID,
    droppedCardIndex: number
  ) => void;
};

export type KanbanStorage = {
  board: KanbanBoardStorage;
  list: KanbanListStorage;
  card: KanbanCardStorage;
};
