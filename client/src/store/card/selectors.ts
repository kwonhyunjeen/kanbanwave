import { createSelector } from '@reduxjs/toolkit';
import { CardState } from 'store/commonTypes';

export const CardSelector = (state: CardState) => state;

export const selectCardOrders = createSelector(CardSelector, state => {
  return state.cardOrders;
});

export const selectCardMgmt = createSelector(CardSelector, state => {
  return state.cardMgmt;
});

export const selectCards = createSelector(
  selectCardOrders,
  selectCardMgmt,
  (cardOrders, cardMgmt) => {
    return (listId: string) => {
      const uuids = cardOrders[listId] || [];
      return uuids.map(uuid => cardMgmt[uuid]);
    };
  }
);
