import { combineReducers } from 'redux';
import { listMgmtReducer } from './listMgmt';
import { listOrdersReducer } from './listOrders';

export const rootReducer = combineReducers({
  listMgmt: listMgmtReducer,
  listOrders: listOrdersReducer
});
