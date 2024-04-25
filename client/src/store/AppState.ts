import { ListOrdersState, ListMgmtState, CardMgmtState, CardOrdersState } from './commonTypes';

export type AppState = {
  listMgmt: ListMgmtState;
  listOrders: ListOrdersState;
  cardMgmt: CardMgmtState;
  cardOrders: CardOrdersState;
};
