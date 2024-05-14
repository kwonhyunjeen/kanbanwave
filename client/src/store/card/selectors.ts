import { createSelector } from '@reduxjs/toolkit';
import { AppState } from 'store/AppState';

export const CardSelector = (state: AppState) => state.card;

export const selectCardOrders = createSelector(CardSelector, state => {
  return state.cardOrders;
});

export const selectCardMgmt = createSelector(CardSelector, state => {
  return state.cardMgmt;
});

export const selectCards = (listId: string) =>
  createSelector(selectCardOrders, selectCardMgmt, (cardOrders, cardMgmt) => {
    const cardIds = cardOrders[listId];
    if (!cardIds) {
      return [];
    }
    return cardIds.map(cardId => cardMgmt[cardId]);
  });
