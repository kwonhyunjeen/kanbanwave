import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { List, ListMgmtState, ListOrdersState, ListUUID } from 'store/commonTypes';

const initialListOrdersState: ListOrdersState = [];
const initialListMgmtState: ListMgmtState = {};

// 목록 추가, 드래그 앤 드롭으로 순서를 변경, 목록 삭제할 때 발생하는 목록의 순서를 관리
const listOrdersSlice = createSlice({
  name: 'listOrders',
  initialState: initialListOrdersState,
  reducers: {
    // 목로의 순서 변경이 있을 때마다 목록의 순서를 설정
    setListOrders: (state: ListOrdersState, action: PayloadAction<ListUUID[]>) => {
      return action.payload || initialListOrdersState;
    },
    // 새로운 목록의 uuid를 목록 순서 배열에 추가
    addListToOrders: (state: ListOrdersState, action: PayloadAction<ListUUID>) => {
      state.push(action.payload);
    },
    // 특정 목록의 uuid를 목록 순서 배열에서 제거
    removeListFromOrders: (state: ListOrdersState, action: PayloadAction<ListUUID>) => {
      return (state || []).filter(uuid => uuid !== action.payload);
    }
  }
});

// 모든 목록에 대한 정보를 유지하고 갱신(추가, 삭제)
const listMgmtSlice = createSlice({
  name: 'listMgmt',
  initialState: initialListMgmtState,
  reducers: {
    // 새로운 목록 추가
    addList: (state: ListMgmtState, action: PayloadAction<List>) => {
      state[action.payload.uuid] = action.payload;
    },
    // 특정 목록 삭제
    removeList: (state: ListMgmtState, action: PayloadAction<string>) => {
      delete state[action.payload];
    }
  }
});

export const { setListOrders, addListToOrders, removeListFromOrders } =
  listOrdersSlice.actions;
export const listOrdersReducer = listOrdersSlice.reducer;

export const { addList, removeList } = listMgmtSlice.actions;
export const listMgmtReducer = listMgmtSlice.reducer;
