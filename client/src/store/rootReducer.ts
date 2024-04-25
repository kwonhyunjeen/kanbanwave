import { combineReducers } from 'redux';
import { listMgmtReducer } from './listMgmt';
import { listOrdersReducer } from './listOrders';
import { cardMgmtReducer } from './cardMgmt';
import { cardOrdersReducer } from './cardOrders';

export const rootReducer = combineReducers({
  listMgmt: listMgmtReducer,
  listOrders: listOrdersReducer,
  cardMgmt: cardMgmtReducer,
  cardOrders: cardOrdersReducer
});
