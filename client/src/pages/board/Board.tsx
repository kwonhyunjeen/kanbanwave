import { useDispatch, useSelector } from 'react-redux';
import { AddItemForm, Title } from 'components';
import { useCallback } from 'react';
import * as Dummy from 'dummy';
import { BoardList } from 'pages';
import * as LIST from 'store/list';
import { selectLists } from 'store/list/selectors';

const Board = () => {
  const dispatch = useDispatch();

  const lists = useSelector(selectLists)

  const onListAdd = useCallback(
    (title: string) => {
      // @todo Update to real data once server integration is completed
      const uuid = Dummy.randomUUID();
      const list = { uuid, title };
      dispatch(LIST.addListToOrders(uuid));
      dispatch(LIST.addList(list));
    },
    [dispatch]
  );

  const onRemoveList = useCallback(
    (listId: string) => () => {
      dispatch(LIST.removeList(listId));
      dispatch(LIST.removeListFromOrders(listId));
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
