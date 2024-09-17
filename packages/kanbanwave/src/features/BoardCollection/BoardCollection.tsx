import { Fragment } from 'react';
import { KWBoard, KWBoardForm } from '../../core/types';
import Board from '../../components/Board/Board';
import AddBoard from '../../components/AddBoard/AddBoard';
import useQuery from '../../hooks/useQuery';
import { useKWStore } from '../KWStorageProvider';
import styles from './BoardCollection.module.css';
import Spinner from '../../components/Spinner/Spinner';

type BoardCollectionProps = {
  boardRender?: (provided: {
    Component: typeof Board;
    props: React.ComponentPropsWithRef<typeof Board>;
    meta: { board: KWBoard };
  }) => React.ReactNode;
  addBoardRender?: (provided: {
    Component: typeof AddBoard;
    props: React.ComponentPropsWithRef<typeof AddBoard>;
    meta: Record<PropertyKey, never>;
  }) => React.ReactNode;
};

const BoardCollection = ({ boardRender, addBoardRender }: BoardCollectionProps) => {
  const { getBoards, createBoard, deleteBoard } = useKWStore();

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
        return addBoardRender ? (
          addBoardRender({
            Component: AddBoard,
            props: newBoardProps,
            meta: {}
          })
        ) : (
          <AddBoard {...newBoardProps} />
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
