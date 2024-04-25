import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Card, CardMgmtState } from 'store/commonTypes';

const initialState: CardMgmtState = {};

// 모든 카드에 대한 정보를 유지하고 갱신(추가, 삭제)
const cardMgmt = createSlice({
  name: 'cardMgmt',
  initialState: initialState,
  reducers: {
    // 새로운 카드 추가
    addCard: (state: CardMgmtState, action: PayloadAction<Card>) => {
      return { ...state, [action.payload.uuid]: action.payload };
    },
    // 특정 카드 삭제
    removeCard: (state: CardMgmtState, action: PayloadAction<string>) => {
      const { [action.payload]: _, ...newState } = state;
      return newState;
    }
  }
});

export const { addCard, removeCard } = cardMgmt.actions;
export const cardMgmtReducer = cardMgmt.reducer;
