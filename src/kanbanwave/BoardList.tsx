import { useCallback } from 'react';
import Board from './Board';
import NewBoard from './NewBoard';
import { useKanbanBoard } from './KanbanStorageProvider';
import { KWBoard, KWBoardForm } from './types';

type BoardListProps = {
  boardRender?: (provided: {
    Component: typeof Board;
    props: React.ComponentPropsWithRef<typeof Board>;
    meta: { board: KWBoard };
  }) => React.ReactNode;
  newBoardRender?: (provided: {
    Component: typeof NewBoard;
    props: React.ComponentPropsWithRef<typeof NewBoard>;
    meta: Record<PropertyKey, never>;
  }) => React.ReactNode;
};

const BoardList = ({ boardRender, newBoardRender }: BoardListProps) => {
  const boardStore = useKanbanBoard();
  const boards = boardStore.getBoards();

  const handleBoardAdd = useCallback(
    (title: string) => {
      const board: KWBoardForm = { title };
      boardStore.createBoard(board);
    },
    [boardStore]
  );

  const handleBoardDeleteClick = useCallback(
    (boardId: string) => () => {
      boardStore.deleteBoard(boardId);
    },
    [boardStore]
  );

  return (
    <ul className="flex flex-wrap gap-4">
      {boards.map(board => {
        const boardProps = {
          board: board,
          onDeleteClick: handleBoardDeleteClick(board.id)
        };
        return (
          <li key={board.id} className="w-[23%]">
            {boardRender ? (
              boardRender({
                Component: Board,
                props: boardProps,
                meta: { board }
              })
            ) : (
              <Board {...boardProps} />
            )}
          </li>
        );
      })}
      {(() => {
        const newBoardProps = {
          onAdd: handleBoardAdd
        };
        return newBoardRender ? (
          newBoardRender({
            Component: NewBoard,
            props: newBoardProps,
            meta: {}
          })
        ) : (
          <NewBoard {...newBoardProps} />
        );
      })()}
    </ul>
  );
};

export default BoardList;
