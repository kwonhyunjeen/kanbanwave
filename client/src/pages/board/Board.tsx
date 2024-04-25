import { useDispatch, useSelector } from 'react-redux';
import { AddItemForm, Title } from 'components';
import { useCallback } from 'react';
import * as Dummy from 'dummy';
import { AppState } from 'store/AppState';
import * as LO from 'store/listOrders';
import * as LM from 'store/listMgmt';
import type { ListOrdersState, ListMgmtState } from 'store/commonTypes';
import { BoardList } from 'pages';

const Board = () => {
  const dispatch = useDispatch();

  const listOrders = useSelector<AppState, ListOrdersState>(state => state.listOrders);
  const listMgmt = useSelector<AppState, ListMgmtState>(state => state.listMgmt);
  const lists = listOrders?.map(uuid => listMgmt[uuid]);

  const onListAdd = useCallback(
    (title: string) => {
      // @todo Update to real data once server integration is completed
      const uuid = Dummy.randomUUID();
      const list = { uuid, title };
      dispatch(LO.addListToOrders(uuid));
      dispatch(LM.addList(list));
    },
    [dispatch]
  );

  const onRemoveList = useCallback(
    (listId: string) => () => {
      dispatch(LM.removeList(listId));
      dispatch(LO.removeListFromOrders(listId));
    },
    [dispatch]
  );

  return (
    <section className="app-base">
      <Title className="mb-4 text-white">Board</Title>
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
        <AddItemForm itemMode="list" onItemAdd={onListAdd} listsLength={lists.length} />
      </div>
    </section>
  );
};

export default Board;
