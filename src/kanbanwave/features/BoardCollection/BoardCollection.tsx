import { Fragment } from 'react';
import { KWBoard, KWBoardForm } from '../../core/types';
import Board from '../../components/Board/Board';
import NewBoard from '../../components/NewBoard/NewBoard';
import useQuery from '../../hooks/useQuery';
import { useKanbanwaveStore } from '../KanbanStorageProvider';
import styles from './BoardCollection.module.css';
import Spinner from 'kanbanwave/components/Spinner/Spinner';

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
      <Spinner />
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
    <div className={styles.container}>
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
      {boards &&
        boards.map(board => {
          const boardProps = {
            board: board,
            onDeleteClick: makeBoardDeleteClickHandler(board.id)
          };
          return (
            <Fragment key={board.id}>
              {boardRender ? (
                boardRender({
                  Component: Board,
                  props: boardProps,
                  meta: { board }
                })
              ) : (
                <Board {...boardProps} />
              )}
            </Fragment>
          );
        })}
    </div>
  );
};

export default BoardCollection;
