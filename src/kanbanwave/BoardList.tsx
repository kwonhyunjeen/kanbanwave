import { useCallback } from 'react';
import Board from './Board';
import NewBoard from './NewBoard';
import { useKanbanBoard } from './KanbanStorageProvider';
import { KWBoard, KWBoardForm } from './types';

type BoardListProps = {
  boardRender?: (props: { board: KWBoard; children: React.ReactNode }) => React.ReactNode;
};

const BoardList = ({ boardRender }: BoardListProps) => {
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
        const boardNode: React.ReactNode = (
          <Board board={board} onDeleteClick={handleBoardDeleteClick(board.id)} />
        );
        return (
          <li className="w-[23%]">
            {boardRender ? boardRender({ board, children: boardNode }) : boardNode}
          </li>
        );
      })}
      <NewBoard onAdd={handleBoardAdd} />
    </ul>
  );
};

export default BoardList;
