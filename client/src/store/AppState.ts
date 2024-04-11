import { ListIdOrdersState, ListMgmtState } from './commonTypes';

export type AppState = {
  listMgmt: ListMgmtState;
  listIdOrders: ListIdOrdersState;
};
