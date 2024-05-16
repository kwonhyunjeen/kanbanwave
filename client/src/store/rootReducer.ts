import { combineReducers } from 'redux';
import { listReducer } from './list';
import { cardReducer } from './card';
import { boardMgmtReducer, boardOrdersReducer } from './board';

export const rootReducer = combineReducers({
  card: cardReducer,
  list: listReducer,
  boardOrders: boardOrdersReducer,
  boardMgmt: boardMgmtReducer
});
