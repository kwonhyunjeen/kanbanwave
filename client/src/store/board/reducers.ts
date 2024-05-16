import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Board, BoardMgmtState, BoardOrdersState, BoardUUID } from 'store/commonTypes';

const initialBoardOrdersState: BoardOrdersState = [];
const initialBoardMgmtState: BoardMgmtState = {};

// board 추가, 삭제할 때 발생하는 boards의 순서를 관리
const boardOrdersSlice = createSlice({
  name: 'boardOrders',
  initialState: initialBoardOrdersState,
  reducers: {
    // board의 상태가 변경될 때마다 boards의 순서를 설정
    setBoardOrders: (state: BoardOrdersState, action: PayloadAction<BoardUUID[]>) => {
      return action.payload || initialBoardOrdersState;
    },
    // 새로운 board의 id를 boards에 추가
    addBoardToOrders: (state: BoardOrdersState, action: PayloadAction<BoardUUID>) => {
      state.push(action.payload);
    },
    // 삭제할 board의 id를 boards에서 제거
    removeBoardFromOrders: (
      state: BoardOrdersState,
      action: PayloadAction<BoardUUID>
    ) => {
      return (state || []).filter(uuid => uuid !== action.payload);
    }
  }
});

// 모든 board에 대한 정보를 유지하고 갱신(추가, 삭제)
const boardMgmtSlice = createSlice({
  name: 'boardMgmt',
  initialState: initialBoardMgmtState,
  reducers: {
    // 새로운 board 추가
    addBoard: (state: BoardMgmtState, action: PayloadAction<Board>) => {
      state[action.payload.id] = action.payload;
    },
    // 특정 board 제거
    removeBoard: (state: BoardMgmtState, action: PayloadAction<BoardUUID>) => {
      const { [action.payload]: _, ...newState } = state;
      return newState;
    }
  }
});

export const { setBoardOrders, addBoardToOrders, removeBoardFromOrders } =
  boardOrdersSlice.actions;
export const boardOrdersReducer = boardOrdersSlice.reducer;

export const { addBoard, removeBoard } = boardMgmtSlice.actions;
export const boardMgmtReducer = boardMgmtSlice.reducer;
