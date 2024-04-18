import { createAction } from '@reduxjs/toolkit';
import { List } from 'store/commonTypes';

export const ADD_LIST = 'listMgmt/add';
export const REMOVE_LIST = 'listMgmt/remove';

export const addList = createAction<List>(ADD_LIST);
export const removeList = createAction<string>(REMOVE_LIST);
