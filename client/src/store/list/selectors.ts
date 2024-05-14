import { createSelector } from '@reduxjs/toolkit';
import { AppState } from 'store/AppState';

export const listSelector = (state: AppState) => state.list;

export const selectListOrders = createSelector(listSelector, state => {
  return state.listOrders;
});

export const selectListMgmt = createSelector(listSelector, state => {
  return state.listMgmt;
});

export const selectLists = createSelector(listSelector, list => {
  return list.listOrders.map(id => list.listMgmt[id]);
});
