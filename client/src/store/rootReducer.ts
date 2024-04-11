import { combineReducers } from 'redux';
import { listMgmtReducer } from './listMgmt';
import { listIdOrdersReducer } from './listIdOrders';

export const rootReducer = combineReducers({
  listMgmt: listMgmtReducer,
  listIdOrders: listIdOrdersReducer
});
