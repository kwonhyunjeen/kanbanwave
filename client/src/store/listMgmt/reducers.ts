import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { List, ListMgmtState } from 'store/commonTypes';

const initialState: ListMgmtState = {};

const listMgmt = createSlice({
  name: 'listMgmt',
  initialState: initialState,
  reducers: {
    addList: (state: ListMgmtState, action: PayloadAction<List>) => {
      return { ...state, [action.payload.uuid]: action.payload };
    },
    removeList: (state: ListMgmtState, action: PayloadAction<string>) => {
      const { [action.payload]: _, ...newState } = state; // 상태를 직접 변경하는 대신 새로운 객체를 생성하여 반환
      return newState;
    }
  }
});


export const { addList, removeList } = listMgmt.actions;
export const listMgmtReducer = listMgmt.reducer;
