import { IconButton, Subtitle } from 'app/components';
import bgBoard from 'app/assets/bg-board.jpg';
import { KWBoard } from './types';

type BoardProps = {
  board: KWBoard;
  /** @todo boardRender에서 onClick을 주입할 수 있도록 리팩토링 */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onDeleteClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Board = ({ board, onClick, onDeleteClick }: BoardProps) => {
  return (
    <div
      className="p-2 transition-all rounded-lg group hover:bg-zinc-500/50"
      onClick={e => {
        onClick?.(e);
        if (!(e.target instanceof Element)) {
          return;
        }
        if (e.target.closest('[data-event-target="delete-button"]')) {
          e.preventDefault();
        }
      }}>
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
              data-event-target="delete-button"
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
