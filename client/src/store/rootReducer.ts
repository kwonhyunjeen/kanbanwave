import { combineReducers } from 'redux';
import { listMgmtReducer, listOrdersReducer } from './list';
import { cardMgmtReducer, cardOrdersReducer } from './card';

export const rootReducer = combineReducers({
  listOrders: listOrdersReducer,
  listMgmt: listMgmtReducer,
  cardOrders: cardOrdersReducer,
  cardMgmt: cardMgmtReducer
});
