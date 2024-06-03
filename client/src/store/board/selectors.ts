import { createSelector } from '@reduxjs/toolkit';
import { BoardUUID } from 'store';
import { RootState } from 'store/useStore';

export const selectBoardState = (state: RootState) => state.board;

export const selectAllBoards = createSelector(selectBoardState, state => {
  return state.allBoards;
});

export const selectBoardOrders = createSelector(selectBoardState, state => {
  return state.boardOrders;
});

export const selectBoardById = (boardId: BoardUUID) =>
  createSelector(selectAllBoards, allBoards => {
    return allBoards.find(board => board.id === boardId);
  });
