import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import Board from './Board';
import { useKanbanBoard } from './KanbanStorageProvider';

const BoardList = () => {
  const boardStore = useKanbanBoard();
  const boards = boardStore.getBoards();

  const handleBoardDeleteClick = useCallback(
    (boardId: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      boardStore.deleteBoard(boardId);
    },
    [boardStore]
  );

  return (
    <ul className="flex flex-wrap gap-4">
      {boards.map(board => (
        <li className="w-[23%]">
          <Link to={`/boards/${board.id}`} state={{ board }}>
            <Board
              board={board}
              onDeleteClick={e => handleBoardDeleteClick(board.id)(e)}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BoardList;
