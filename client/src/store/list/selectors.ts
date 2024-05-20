import { createSelector } from '@reduxjs/toolkit';
import { BoardUUID, List, ListUUID } from 'store/commonTypes';
import { RootState } from 'store/useStore';

export const selectListState = (state: RootState) => state.list;

export const selectAllLists = createSelector(selectListState, state => {
  return state.allLists;
});

export const selectListOrders = createSelector(selectListState, state => {
  return state.listOrders;
});

export const selectListById = (listId: ListUUID) =>
  createSelector(selectAllLists, allLists => {
    return allLists.find(list => list.id === listId);
  });

export const selectListsByBoardId = (boardId: BoardUUID) =>
  createSelector(selectAllLists, selectListOrders, (allLists, listOrders) => {
    const listIds = listOrders[boardId] || [];
    return listIds
      .map(listId => allLists.find(list => list.id === listId))
      .filter(Boolean) as List[];
  });
