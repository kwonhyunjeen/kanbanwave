import { useCallback } from 'react';
import Board from './Board';
import NewBoard from './NewBoard';
import { useKanbanBoardCollection } from './KanbanStorageProvider';
import { KWBoard, KWBoardForm } from './types';

type BoardCollectionProps = {
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

const BoardCollection = ({ boardRender, newBoardRender }: BoardCollectionProps) => {
  const boardCollectionStore = useKanbanBoardCollection();
  const boards = boardCollectionStore.getBoards();

  const handleBoardAdd = useCallback(
    (title: string) => {
      const board: KWBoardForm = { title };
      boardCollectionStore.createBoard(board);
    },
    [boardCollectionStore]
  );

  const makeBoardDeleteClickHandler = useCallback(
    (boardId: string) => () => {
      boardCollectionStore.deleteBoard(boardId);
    },
    [boardCollectionStore]
  );

  return (
    <ul className="flex flex-wrap gap-4">
      {boards.map(board => {
        const boardProps = {
          board: board,
          onDeleteClick: makeBoardDeleteClickHandler(board.id)
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

export default BoardCollection;
