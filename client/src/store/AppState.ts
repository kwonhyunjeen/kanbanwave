import { BoardState, CardState, ListState } from './commonTypes';

export type AppState = {
  list: ListState;
  card: CardState;
  board: BoardState;
};
