import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  Card,
  CardState,
  CardUUID,
  ListIdCardId,
  ListIdCardIds,
  ListUUID
} from 'store/commonTypes';

const initialState: CardState = {
  cardOrders: {},
  cardMgmt: {}
};

// card 추가 및 삭제, 드래그 앤 드롭으로 순서를 변경할 때 발생하는 card의 순서를 관리
const cardSlice = createSlice({
  name: 'card',
  initialState: initialState,
  reducers: {
    // 특정 list에 속한 card의 순서를 설정
    setCardFromList: (state, action: PayloadAction<ListIdCardIds>) => {
      const { listId, cardIds } = action.payload;
      state.cardOrders[listId] = cardIds;
    },
    // listMgmt/removeList에서 특정 list를 삭제했어도, cardOrders에 일부 키로 존재할 수 있기 때문에
    // cardOrders에서도 해당 list를 삭제해 메모리 효율적으로 관리
    removeListFromCard: (state, action: PayloadAction<ListUUID>) => {
      const { [action.payload]: _, ...newCardOrders } = state.cardOrders;
      state.cardOrders = newCardOrders;
    },
    // 특정 list에 새로운 card를 추가하는 액션입니다.
    addCardToList: (state, action: PayloadAction<ListIdCardId>) => {
      const { listId, cardId } = action.payload;
      state.cardOrders[listId] = [...(state.cardOrders[listId] || []), cardId];
    },
    // 특정 list에서 card를 제거
    removeCardFromList: (state, action: PayloadAction<ListIdCardId>) => {
      const { listId, cardId } = action.payload;
      state.cardOrders[listId] = (state.cardOrders[listId] || []).filter(
        id => id !== cardId
      );
    },
    // 새로운 card 추가
    addCard(state, action: PayloadAction<Card>) {
      state.cardMgmt[action.payload.id] = action.payload;
    },
    // 특정 card 삭제
    removeCard: (state, action: PayloadAction<CardUUID>) => {
      const { [action.payload]: _, ...newCardMgmt } = state.cardMgmt;
      state.cardMgmt = newCardMgmt;
    }
  }
});

export const {
  setCardFromList,
  removeListFromCard,
  addCardToList,
  removeCardFromList,
  addCard,
  removeCard
} = cardSlice.actions;
export const cardReducer = cardSlice.reducer;
