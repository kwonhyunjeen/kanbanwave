import { RouterProvider } from 'react-router-dom';
import router from 'routes/router';
import { Provider as ReduxProvider } from 'react-redux';
import { useStore } from 'store/useStore';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { KanbanStorage, KanbanStorageProvider } from 'components';
import { PropsWithChildren, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as BOARD from 'store/board';
import * as LIST from 'store/list';
import * as CARD from 'store/card';
import {
  BoardUUID,
  Card,
  CardOrdersState,
  List,
  ListOrdersState,
  ListUUID
} from 'store/commonTypes';

const selectListsByBoardId = (
  listState: List[],
  listOrdersState: ListOrdersState,
  boardId: BoardUUID
) => {
  const listIds = listOrdersState[boardId] || [];
  return listIds
    .map(listId => listState.find(list => list.id === listId))
    .filter(Boolean) as List[];
};

const selectListOrdersByBoardId = (
  listOrdersState: ListOrdersState,
  boardId: BoardUUID
) => {
  return listOrdersState[boardId] || [];
};

const selectCardsByListId = (
  cardState: Card[],
  cardOrdersState: CardOrdersState,
  listId: ListUUID
) => {
  const cardIds = cardOrdersState[listId] || [];
  return cardIds
    .map(cardId => cardState.find(card => card.id === cardId))
    .filter(Boolean) as Card[];
};

const selectCardOrdersByListId = (cardOrdersState: CardOrdersState, listId: ListUUID) => {
  return cardOrdersState[listId] || [];
};

function KanbanProvider({ children }: PropsWithChildren) {
  const dispatch = useDispatch();

  const boards = useSelector(BOARD.selectAllBoards);
  const boardOrders = useSelector(BOARD.selectBoardOrders);

  const listState = useSelector(LIST.selectAllLists);
  const listOrdersState = useSelector(LIST.selectListOrders);
  const cardState = useSelector(CARD.selectAllCards);
  const cardOrdersState = useSelector(CARD.selectCardOrders);

  const kanbanStorage = useMemo<KanbanStorage>(
    () => ({
      board: {
        getAll: () => boards,
        getOrders: () => boardOrders,
        create: board => dispatch(BOARD.addBoard(board)),
        delete: boardId => dispatch(BOARD.deleteBoard(boardId)),
        reorder: boardIds => dispatch(BOARD.setBoard(boardIds))
      },
      list: {
        getAll: boardId => selectListsByBoardId(listState, listOrdersState, boardId),
        getOrders: boardId => selectListOrdersByBoardId(listOrdersState, boardId),
        create: (boardId, list) => dispatch(LIST.addList({ boardId, list })),
        delete: (boardId, listId) => dispatch(LIST.deleteList({ boardId, listId })),
        reorder: (boardId, listIds) => dispatch(LIST.setList({ boardId, listIds }))
      },
      card: {
        getAll: listId => selectCardsByListId(cardState, cardOrdersState, listId),
        getOrders: listId => selectCardOrdersByListId(cardOrdersState, listId),
        create: (listId, card) => dispatch(CARD.addCard({ listId, card })),
        delete: (listId, cardId) => dispatch(CARD.deleteCard({ listId, cardId })),
        reorder: (listId, cardIds) => dispatch(CARD.setCard({ listId, cardIds }))
      }
    }),
    [
      dispatch,
      boards,
      boardOrders,
      listState,
      listOrdersState,
      cardState,
      cardOrdersState
    ]
  );

  return (
    <KanbanStorageProvider storage={kanbanStorage}>{children}</KanbanStorageProvider>
  );
}

function App() {
  const store = useStore();

  return (
    <ReduxProvider store={store}>
      <DndProvider backend={HTML5Backend}>
        <KanbanProvider>
          <RouterProvider router={router} />
        </KanbanProvider>
      </DndProvider>
    </ReduxProvider>
  );
}

export default App;
