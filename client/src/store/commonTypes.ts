export type ListUUID = string;

export type List = {
  uuid: ListUUID;
  title: string;
};

export type AllListState = List[];
export type ListMgmtState = Record<string, List>;
export type ListIdOrdersState = ListUUID[];

export type ListState = {
  allList: AllListState;
  listMgmt: ListMgmtState;
  listIdOrders: ListIdOrdersState;
};
