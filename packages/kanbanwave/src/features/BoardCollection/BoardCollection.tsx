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
    boardProps: React.ComponentPropsWithRef<typeof Board>;
    board: KWBoard;
  }) => React.ReactNode;
  addBoardRender?: (provided: {
    addBoardProps: React.ComponentPropsWithRef<typeof AddBoard>;
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
        const addBoardProps = {
          onAdd: handleBoardAdd
        };
        return addBoardRender ? (
          addBoardRender({
            addBoardProps: addBoardProps
          })
        ) : (
          <AddBoard {...addBoardProps} />
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
                  boardProps: boardProps,
                  board: board
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
