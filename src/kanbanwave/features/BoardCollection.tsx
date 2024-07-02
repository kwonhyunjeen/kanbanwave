import { KWBoard, KWBoardForm } from '../core/types';
import Board from '../components/Board';
import NewBoard from '../components/NewBoard';
import useQuery from '../hooks/useQuery';
import { useKanbanwaveStore } from './KanbanStorageProvider';

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
  const { getBoards, createBoard, deleteBoard } = useKanbanwaveStore();

  const { status, data: boards } = useQuery(getBoards, []);

  if (status === 'pending') {
    return (
      <div>
        <mark>Loading...</mark>
      </div>
    );
  }

  const handleBoardAdd = (title: string) => {
    const board: KWBoardForm = { title };
    createBoard(board);
  };

  const makeBoardDeleteClickHandler = (boardId: string) => () => {
    deleteBoard(boardId);
  };

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
