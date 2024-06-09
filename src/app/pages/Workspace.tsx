import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Input,
  Subtitle,
  Title,
  useKanbanBoard
} from 'app/components';
import { useToggle } from 'app/hooks';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as Dummy from 'app/dummy';
import bgBoard from 'app/assets/bg-board.jpg';

const Workspace = () => {
  const [open, dialogOpen] = useToggle(false);

  const boardStore = useKanbanBoard();
  const boards = boardStore.getAll();

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
      const board = Dummy.makeBoard(Dummy.randomUUID(), title);
      boardStore.create(board);
      dialogOpen();
      reset();
    },
    [boardStore, dialogOpen, reset]
  );

  const handleBoardDelete = useCallback(
    (boardId: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      boardStore.delete(boardId);
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
            <li
              key={board.id}
              className="w-[23%] group hover:bg-zinc-500/50 transition-all rounded-lg p-2">
              <Link
                to={`/board/${board.id}/${board.title}`}
                className="flex flex-col justify-between h-full rounded-lg"
                state={{ board }}>
                <div className="relative flex-shrink-0">
                  <img
                    src={bgBoard}
                    alt="Board"
                    className="object-cover w-full h-full rounded-lg"
                  />
                  <div className="absolute flex flex-col justify-between inset-5">
                    <Subtitle
                      size="lg"
                      className="mr-1 overflow-hidden text-white text-ellipsis whitespace-nowrap">
                      {board.title}
                    </Subtitle>
                    <IconButton
                      name="delete_outlined"
                      type="button"
                      aria-label="delete a board"
                      className="self-end opacity-0 btn-square group-hover:opacity-100"
                      iconClassName="w-4"
                      onClick={e => handleBoardDelete(board.id)(e)}
                    />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Workspace;
