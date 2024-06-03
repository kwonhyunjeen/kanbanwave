import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BoardUUID, KWList, KWListState, ListUUID } from 'store';

const initialState: KWListState = {
  allLists: [],
  listOrders: {}
};

const listSlice = createSlice({
  name: 'list',
  initialState: initialState,
  reducers: {
    addList: (state, action: PayloadAction<{ boardId: BoardUUID; list: KWList }>) => {
      const { boardId, list } = action.payload;
      state.allLists.push(list);
      state.listOrders[boardId] = state.listOrders[boardId]
        ? [...state.listOrders[boardId], list.id]
        : [list.id];
    },
    deleteList: (
      state,
      action: PayloadAction<{ boardId: BoardUUID; listId: ListUUID }>
    ) => {
      const { boardId, listId } = action.payload;
      state.allLists = state.allLists.filter(list => list.id !== listId);
      if (state.listOrders[boardId]) {
        state.listOrders[boardId] = state.listOrders[boardId].filter(id => id !== listId);
      }
    },
    setList: (
      state,
      action: PayloadAction<{ boardId: BoardUUID; listIds: ListUUID[] }>
    ) => {
      const { boardId, listIds } = action.payload;
      state.listOrders[boardId] = listIds;
    }
  }
});

export const { addList, deleteList, setList } = listSlice.actions;
export const listReducer = listSlice.reducer;
