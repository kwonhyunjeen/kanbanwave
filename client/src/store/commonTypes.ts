export type ListUUID = string;
export type CardUUID = string;

export type List = {
  uuid: ListUUID;
  title: string;
};

export type User = {
  uuid: string;
  name: string;
  email: string;
};

export type Card = {
  uuid: CardUUID;
  writer: User;
  title: string;
  description: string;
  date: string;
  relativeDate: string | null;
};

export type CardIdListId = {
  cardId: CardUUID;
  listId: ListUUID;
};

export type ListIdCardId = CardIdListId;
export type ListIdCardIdS = { listId: ListUUID; cardIds: CardUUID[] };
export type CardIdListIdIndex = CardIdListId & {
  index: number;
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
