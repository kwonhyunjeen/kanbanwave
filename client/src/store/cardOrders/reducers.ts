import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CardOrdersState, ListIdCardId, ListIdCardIdS } from 'store/commonTypes';

const initialState: CardOrdersState = {};

// 각 목록에 속한 카드의 순서를 관리
const cardOrders = createSlice({
  name: 'cardOrders',
  initialState: initialState,
  reducers: {
    // 카드의 순서 변경이 있을 매마다 특정 목록에 속한 카드의 순서를 설정
    setCardOrdersFromList: (
      state: CardOrdersState,
      action: PayloadAction<ListIdCardIdS>
    ) => {
      return { ...state, [action.payload.listId]: action.payload.cardIds };
    },
    // 특정 목록 삭제
    // listMgmt/removeList에서 특정 목록을 삭제했어도, cardOrders에 일부 키로 존재할 수 있기 때문에
    // cardOrders에서도 해당 목록을 삭제해 메모리 효율적으로 관리
    removeList: (state: CardOrdersState, action: PayloadAction<string>) => {
      const { [action.payload]: _, ...newState } = state;
      return newState;
    },
    // 특정 리스트의 카드 목록 앞에 새로운 카드 추가
    prependCardToList: (state: CardOrdersState, action: PayloadAction<ListIdCardId>) => {
      const cardIds = state[action.payload.listId] || [];
      return { ...state, [action.payload.listId]: [action.payload.cardId, ...cardIds] };
    },
    // 특정 리스트의 카드 목록 뒤에 새로운 카드 추가
    appendCardToList: (state: CardOrdersState, action: PayloadAction<ListIdCardId>) => {
      const cardIds = state[action.payload.listId] || [];
      return { ...state, [action.payload.listId]: [...cardIds, action.payload.cardId] };
    },
    // 특정 리스트의 카드 목록에서 특정 카드를 제거
    removeCardFromList: (state: CardOrdersState, action: PayloadAction<ListIdCardId>) => {
      const cardIds = state[action.payload.listId];
      return {
        ...state,
        [action.payload.listId]: cardIds.filter(id => id !== action.payload.cardId)
      };
    }
  }
});

export const {
  setCardOrdersFromList,
  removeList,
  prependCardToList,
  appendCardToList,
  removeCardFromList
} = cardOrders.actions;
export const cardOrdersReducer = cardOrders.reducer;
