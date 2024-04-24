import { ListOrdersState, ListMgmtState } from './commonTypes';

export type AppState = {
  listMgmt: ListMgmtState;
  listOrders: ListOrdersState;
};
