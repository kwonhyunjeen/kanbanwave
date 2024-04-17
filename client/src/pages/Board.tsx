import { useDispatch, useSelector } from 'react-redux';
import { AddItemForm, BoardList, Title } from 'components';
import { useCallback } from 'react';
import * as Dummy from '../dummy';
import { AppState } from 'store/AppState';
import * as LO from '../store/listIdOrders';
import * as LM from '../store/listMgmt';
import type { ListIdOrdersState, ListMgmtState } from 'store/commonTypes';

const Board = () => {
  const dispatch = useDispatch();

  const listIdOrders = useSelector<AppState, ListIdOrdersState>(
    state => state.listIdOrders
  );
  const listMgmt = useSelector<AppState, ListMgmtState>(state => state.listMgmt);

  const lists = listIdOrders?.map(uuid => listMgmt[uuid]);

  const initialInputVisible = lists.length;

  const onAddList = useCallback(
    (title: string) => {
      const uuid = Dummy.randomUUID();
      const list = { uuid, title };
      dispatch(LO.addListIdToOrders(uuid));
      dispatch(LM.addList(list));
    },
    [dispatch]
  );

  const onRemoveList = useCallback(
    (listId: string) => () => {
      dispatch(LM.removeList(listId));
      dispatch(LO.removeListIdFromOrders(listId));
    },
    [dispatch]
  );

  return (
    <section className="app-base">
      <Title className="mb-4">Board</Title>
      <div className="flex justify-start">
        <div className="flex">
          {lists?.map(list => (
            <BoardList
              key={list.uuid}
              list={list}
              onRemoveList={onRemoveList(list.uuid)}
            />
          ))}
        </div>
        <AddItemForm
          itemMode="list"
          onAddItem={onAddList}
          initialInputVisible={initialInputVisible}
        />
      </div>
    </section>
  );
};

export default Board;
