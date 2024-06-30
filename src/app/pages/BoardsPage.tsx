import { useForm } from 'react-hook-form';
import { BoardCollection, useKanbanwaveStore } from 'kanbanwave';
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
import { Link } from 'react-router-dom';

const BoardsPage = () => {
  const [open, dialogOpen] = useToggle(false);

  const kanbanwaveStore = useKanbanwaveStore();

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

  const handleBoardSubmit = (data: { title: string }) => {
    const { title } = data;
    kanbanwaveStore.createBoard({ title });
    dialogOpen();
    reset();
  };

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
        <BoardCollection
          boardRender={provided => (
            <Link to={`/boards/${provided.meta.board.id}`}>
              <provided.Component {...provided.props} />
            </Link>
          )}
        />
      </div>
    </section>
  );
};

export default BoardsPage;
