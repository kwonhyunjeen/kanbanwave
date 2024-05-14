import { combineReducers } from 'redux';
import { listReducer } from './list';
import { cardReducer } from './card';

export const rootReducer = combineReducers({
  card: cardReducer,
  list: listReducer
});
