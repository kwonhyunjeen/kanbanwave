import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Input,
  Title
} from 'app/components';
import { useToggle } from 'app/hooks';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useKanbanBoard } from './KanbanStorageProvider';
import Board from './Board';

const BoardList = () => {
  const [open, dialogOpen] = useToggle(false);

  const boardStore = useKanbanBoard();
  const boards = boardStore.getBoards();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      title: ''
    }
  });

  const handleClose = () => {
    dialogOpen();
    reset();
  };

  const handleBoardSubmit = useCallback(
    (data: { title: string }) => {
      const { title } = data;
      boardStore.createBoard({ title });
      dialogOpen();
      reset();
    },
    [boardStore, dialogOpen, reset]
  );

  const handleBoardDeleteClick = useCallback(
    (boardId: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      boardStore.deleteBoard(boardId);
    },
    [boardStore]
  );

  return (
    <section className="app-base">
      <Title className="mb-4 text-white">Boards</Title>
      <div className="m-9">
        <IconButton
          name="dashboard_customize"
          className="mb-10 ml-2"
          onClick={dialogOpen}>
          Create new board
        </IconButton>
        <Dialog open={open} closeIcon onClose={handleClose} className="w-80">
          <form onSubmit={handleSubmit(handleBoardSubmit)}>
            <DialogTitle>Create board</DialogTitle>
            <DialogContent>
              <label htmlFor="title" className="pb-1 text-sm font-semibold label">
                * Board title
              </label>
              <Input
                id="title"
                type="text"
                {...register('title', {
                  required: 'Board title is required',
                  maxLength: {
                    value: 100,
                    message: 'Maximum character is 100'
                  }
                })}
                placeholder="Enter a title"
                wrapperClassName={errors.title ? 'input-bordered input-error' : ''}
              />
              {errors.title && (
                <p className="pl-1 mt-1 text-xs text-red-600">{errors.title.message}</p>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Confirm</Button>
            </DialogActions>
          </form>
        </Dialog>
        <ul className="flex flex-wrap gap-4">
          {boards.map(board => (
            <li className='w-[23%]'>
              <Link to={`/boards/${board.id}`} state={{ board }}>
                <Board
                  board={board}
                  onDeleteClick={e => handleBoardDeleteClick(board.id)(e)}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BoardList;
