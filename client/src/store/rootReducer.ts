import { combineReducers } from 'redux';
import { listReducer } from './list';
import { cardReducer } from './card';
import { boardReducer } from './board';

export const rootReducer = combineReducers({
  card: cardReducer,
  list: listReducer,
  board: boardReducer
});
