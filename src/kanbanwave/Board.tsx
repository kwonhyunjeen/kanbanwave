import { IconButton, Subtitle } from 'app/components';
import bgBoard from 'app/assets/bg-board.jpg';
import { KWBoard } from './types';

type BoardProps = {
  board: KWBoard;
  onDeleteClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Board = ({ board, onDeleteClick }: BoardProps) => {
  return (
    <div className="p-2 transition-all rounded-lg group hover:bg-zinc-500/50">
      <div className="flex flex-col justify-between h-full rounded-lg">
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
              onClick={onDeleteClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
