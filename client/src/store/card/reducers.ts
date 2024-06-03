import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { KWCard, KWCardState, CardUUID, ListUUID } from 'store';

const initialState: KWCardState = {
  allCards: [],
  cardOrders: {}
};

const cardSlice = createSlice({
  name: 'card',
  initialState: initialState,
  reducers: {
    addCard: (state, action: PayloadAction<{ listId: ListUUID; card: KWCard }>) => {
      const { listId, card } = action.payload;
      state.allCards.push(card);
      state.cardOrders[listId] = state.cardOrders[listId]
        ? [...state.cardOrders[listId], card.id]
        : [card.id];
    },
    deleteCard: (
      state,
      action: PayloadAction<{ listId: ListUUID; cardId: CardUUID }>
    ) => {
      const { listId, cardId } = action.payload;
      state.allCards = state.allCards.filter(card => card.id !== cardId);
      if (state.cardOrders[listId]) {
        state.cardOrders[listId] = state.cardOrders[listId].filter(id => id !== cardId);
      }
    },
    setCard: (
      state,
      action: PayloadAction<{ listId: ListUUID; cardIds: CardUUID[] }>
    ) => {
      const { listId, cardIds } = action.payload;
      state.cardOrders[listId] = cardIds;
    }
  }
});

export const { addCard, deleteCard, setCard } = cardSlice.actions;
export const cardReducer = cardSlice.reducer;
