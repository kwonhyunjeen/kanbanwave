import { KWBoard } from '../../core/types';
import IconButton from '../IconButton/IconButton';
import styles from './Board.module.css';

type BoardProps = {
  board: KWBoard;
  /** @todo boardRender에서 onClick을 주입할 수 있도록 리팩토링 */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onDeleteClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Board = ({ board, onClick, onDeleteClick }: BoardProps) => {
  return (
    <div
      className={styles.container}
      onClick={e => {
        onClick?.(e);
        if (!(e.target instanceof Element)) {
          return;
        }
        if (e.target.closest('[data-event-target="delete-button"]')) {
          e.preventDefault();
        }
      }}>
      <div className={styles.headerContainer}>
        <h2 className={styles.title}>{board.title}</h2>
        <div className={styles.action}>
          <IconButton
            type="button"
            aria-label="delete a board"
            data-event-target="delete-button"
            icon="delete"
            onClick={onDeleteClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Board;
