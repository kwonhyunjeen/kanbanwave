import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { List, ListState, ListUUID } from 'store/commonTypes';

const initialState: ListState = {
  listOrders: [],
  listMgmt: {}
};

// list 추가 및 삭제, 드래그 앤 드롭으로 순서를 변경할 때 발생하는 list의 순서 관리
const listSlice = createSlice({
  name: 'list',
  initialState: initialState,
  reducers: {
    //특정 board에 속한 list의 순서를 설정
    setListFromBoard: (state: ListState, action: PayloadAction<ListUUID[]>) => {
      state.listOrders = action.payload || initialState.listOrders;
    },
    // 특정 board에 새로운 list 추가
    addListToBoard: (state: ListState, action: PayloadAction<ListUUID>) => {
      state.listOrders.push(action.payload);
    },
    // 특정 board에서 list 제거
    removeListFromBoard: (state: ListState, action: PayloadAction<ListUUID>) => {
      state.listOrders = (state.listOrders || []).filter(uuid => uuid !== action.payload);
    },
    // 새로운 list 추가
    addList: (state: ListState, action: PayloadAction<List>) => {
      state.listMgmt[action.payload.id] = action.payload;
    },
    // 특정 list 삭제
    removeList: (state: ListState, action: PayloadAction<string>) => {
      const { [action.payload]: _, ...newListMgmt } = state.listMgmt;
      state.listMgmt = newListMgmt;
    }
  }
});

export const {
  setListFromBoard,
  addListToBoard,
  removeListFromBoard,
  addList,
  removeList
} = listSlice.actions;
export const listReducer = listSlice.reducer;
