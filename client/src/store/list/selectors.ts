import { createSelector } from '@reduxjs/toolkit';
import { ListState } from 'store/commonTypes';

export const listSelector = (state: ListState) => state;

export const selectListOrders = createSelector(listSelector, statte => {
  return statte.listOrders;
});

export const selectListMgmt = createSelector(listSelector, state => {
  return state.listMgmt;
});

export const selectLists = createSelector(
  selectListOrders,
  selectListMgmt,
  (listOrders, listMgmt) => {
    return listOrders.map(uuid => listMgmt[uuid]);
  }
);
