import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ListOrdersState, ListUUID } from 'store/commonTypes';

const initialState: ListOrdersState = [];

// 목록 추가, 드래그 앤 드롭으로 순서를 변경, 목록 삭제할 때 발생하는 목록의 순서를 관리
const listOrders = createSlice({
  name: 'listOrders',
  initialState: initialState,
  reducers: {
    // 목로의 순서 변경이 있을 때마다 목록의 순서를 설정
    setListOrders: (state: ListOrdersState, action: PayloadAction<ListUUID[]>) => {
      return action.payload || initialState;
    },
    // 새로운 목록의 uuid를 목록 순서 배열에 추가
    addListToOrders: (state: ListOrdersState, action: PayloadAction<ListUUID>) => {
      return [...state, action.payload];
    },
    // 특정 목록의 uuid를 목록 순서 배열에서 제거
    removeListFromOrders: (state: ListOrdersState, action: PayloadAction<ListUUID>) => {
      return (state || []).filter(uuid => uuid !== action.payload);
    }
  }
});

export const { setListOrders, addListToOrders, removeListFromOrders } =
  listOrders.actions;
export const listOrdersReducer = listOrders.reducer;
