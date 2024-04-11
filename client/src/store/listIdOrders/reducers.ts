import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ListIdOrdersState } from 'store/commonTypes';

const initialState: ListIdOrdersState = [];

const listIdOrders = createSlice({
  name: 'listIdOrders',
  initialState: initialState,
  reducers: {
    setListIdOrders: (
      state: ListIdOrdersState,
      action: PayloadAction<ListIdOrdersState>
    ) => {
      return action.payload || initialState; // 상태가 null 또는 undefined인 경우 초기 상태를 반환
    },
    addListIdToOrders: (state: ListIdOrdersState, action: PayloadAction<string>) => {
      return [...state, action.payload]; // 상태가 null 또는 undefined인 경우를 고려하지 않음
    },
    removeListIdFromOrders: (state: ListIdOrdersState, action: PayloadAction<string>) => {
      return (state || []).filter(uuid => uuid !== action.payload); // 상태가 null 또는 undefined인 경우 초기 상태로 설정
    }
  }
});

export const { setListIdOrders, addListIdToOrders, removeListIdFromOrders } =
  listIdOrders.actions;
export const listIdOrdersReducer = listIdOrders.reducer;
