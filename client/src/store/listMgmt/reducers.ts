import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { List, ListMgmtState } from 'store/commonTypes';

const initialState: ListMgmtState = {};

// 모든 목록에 대한 정보를 유지하고 갱신(추가, 삭제)
const listMgmt = createSlice({
  name: 'listMgmt',
  initialState: initialState,
  reducers: {
    // 새로운 목록 추가
    addList: (state: ListMgmtState, action: PayloadAction<List>) => {
      return { ...state, [action.payload.uuid]: action.payload };
    },
    // 특정 목록 삭제
    removeList: (state: ListMgmtState, action: PayloadAction<string>) => {
      const { [action.payload]: _, ...newState } = state;
      return newState;
    }
  }
});

export const { addList, removeList } = listMgmt.actions;
export const listMgmtReducer = listMgmt.reducer;
