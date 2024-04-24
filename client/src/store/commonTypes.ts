export type ListUUID = string;

export type List = {
  uuid: ListUUID;
  title: string;
};

export type ListMgmtState = Record<string, List>;
export type ListOrdersState = ListUUID[];

export type ListState = {
  listMgmt: ListMgmtState;
  listOrders: ListOrdersState;
};
