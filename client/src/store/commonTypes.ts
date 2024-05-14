export type CardUUID = string;
export type ListUUID = string;

export type User = {
  id: string;
  name: string;
  email: string;
};

export type Card = {
  id: CardUUID;
  writer?: User;
  title: string;
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

export type ListIdCardIds = { listId: ListUUID; cardIds: CardUUID[] };
export type ListIdCardId = {
  cardId: CardUUID;
  listId: ListUUID;
};

export type ListMgmtState = Record<string, List>;
export type ListOrdersState = ListUUID[];

export type ListState = {
  listMgmt: ListMgmtState;
  listOrders: ListOrdersState;
};

export type CardMgmtState = Record<string, Card>;
export type CardOrdersState = Record<ListUUID, CardUUID[]>;

export type CardState = {
  cardMgmt: CardMgmtState;
  cardOrders: CardOrdersState;
};

export const ItemType = {
  CARD: 'card',
  LIST: 'list'
} as const;
export type ItemType = (typeof ItemType)[keyof typeof ItemType];
