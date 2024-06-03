import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { KWBoard, KWBoardState, BoardUUID } from 'store';

const initialState: KWBoardState = {
  allBoards: [],
  boardOrders: []
};

const boardSlice = createSlice({
  name: 'board',
  initialState: initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<KWBoard>) => {
      const board = action.payload;
      state.allBoards.push(board);
      state.boardOrders.push(board.id);
    },
    deleteBoard: (state, action: PayloadAction<BoardUUID>) => {
      const boardId = action.payload;
      state.allBoards = state.allBoards.filter(board => board.id !== boardId);
      state.boardOrders = state.boardOrders.filter(id => id !== boardId);
    },
    setBoard: (state, action: PayloadAction<BoardUUID[]>) => {
      state.boardOrders = action.payload || initialState.boardOrders;
    }
  }
});

export const { addBoard, deleteBoard, setBoard } = boardSlice.actions;
export const boardReducer = boardSlice.reducer;
