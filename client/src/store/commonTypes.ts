export type CardUUID = string;
export type ListUUID = string;
export type BoardUUID = string;

export type User = {
  id: string;
  name: string;
  email: string;
};

export type Card = {
  id: CardUUID;
  title: string;
  writer?: User;
  description?: string;
  startDate?: string;
  dueDate?: string;
  relativeDate?: string | null;
};

export type List = {
  id: ListUUID;
  title: string;
  cards?: CardUUID[];
};

export type Board = {
  id: BoardUUID;
  title: string;
  lists?: ListUUID[];
};

export type CardOrdersState = {
  [listId: ListUUID]: CardUUID[];
};

export type CardState = {
  allCards: Card[]; 
  cardOrders: CardOrdersState; 
};

export type ListOrdersState = {
  [boardId: BoardUUID]: ListUUID[];
};

export type ListState = {
  allLists: List[];
  listOrders: ListOrdersState;
};

export type BoardOrdersState = BoardUUID[];

export type BoardState = {
  allBoards: Board[];
  boardOrders: BoardOrdersState;
};

export const ItemType = {
  CARD: 'card',
  LIST: 'list'
} as const;
export type ItemType = (typeof ItemType)[keyof typeof ItemType];
