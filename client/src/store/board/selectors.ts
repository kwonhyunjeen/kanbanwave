import { createSelector } from '@reduxjs/toolkit';
import { BoardState } from 'store/commonTypes';

export const boardSelector = (state: BoardState) => state;

export const selectBoardOrders = createSelector(boardSelector, state => {
  return state.boardOrders;
});

export const selectBoardMgmt = createSelector(boardSelector, state => {
  return state.boardMgmt;
});

export const selectBoards = createSelector(
  selectBoardOrders,
  selectBoardMgmt,
  (boardOrders, boardMgmt) => {
    return boardOrders.map(id => boardMgmt[id]);
  }
);
