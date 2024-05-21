import { createSelector } from '@reduxjs/toolkit';
import { Card, CardUUID, ListUUID } from 'store/commonTypes';
import { RootState } from 'store/useStore';

export const selectCardState = (state: RootState) => state.card;

export const selectAllCards = createSelector(selectCardState, state => {
  return state.allCards;
});

export const selectCardOrders = createSelector(selectCardState, state => {
  return state.cardOrders;
});

export const selectCardById = (cardId: CardUUID) =>
  createSelector(selectAllCards, allCards => {
    return allCards.find(card => card.id === cardId);
  });

export const selectCardsByListId = (listId: ListUUID) =>
  createSelector(selectAllCards, selectCardOrders, (allCards, cardOrders) => {
    const cardIds = cardOrders[listId] || [];
    return cardIds
      .map(cardId => allCards.find(card => card.id === cardId))
      .filter(Boolean) as Card[];
  });
