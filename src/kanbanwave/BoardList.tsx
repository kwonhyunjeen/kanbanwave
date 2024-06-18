import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import Board from './Board';
import { useKanbanBoard } from './KanbanStorageProvider';
import { KWBoard } from './types';

type BoardListProps = {
  boardRender?: (props: { board: KWBoard; children: React.ReactNode }) => React.ReactNode;
};

const BoardList = ({ boardRender }: BoardListProps) => {
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
      {boards.map(board => {
        const boardNode: React.ReactNode = (
          <Board board={board} onDeleteClick={e => handleBoardDeleteClick(board.id)(e)} />
        );
        return (
          <li className="w-[23%]">
            {boardRender ? boardRender({ board, children: boardNode }) : boardNode}
          </li>
        );
      })}
    </ul>
  );
};

export default BoardList;
