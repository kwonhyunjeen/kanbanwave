import { useToggle } from 'app/hooks';
import { IconButton } from 'app/components';
import { KWCard } from './types';
import CardDraggable from './CardDraggable';

type CardProps = {
  card: KWCard;
  cardIndex: number;
  /** @todo cardRender에서 onClick을 주입할 수 있도록 리팩토링 */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onEditClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDeleteClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Card = ({ card, cardIndex, onClick, onEditClick, onDeleteClick }: CardProps) => {
  const [open, menuOpen] = useToggle(false);
  const handleMenuOpen = () => {
    menuOpen();
  };

  return (
    <CardDraggable cardId={card.id} cardIndex={cardIndex}>
      <div
        className="card group"
        onClick={e => {
          onClick?.(e);
          if (!(e.target instanceof Element)) {
            return;
          }
          if (e.target.closest('[data-event-target="menu-button"]')) {
            e.preventDefault();
          }
        }}>
        <div className="relative flex items-center justify-between overflow-hidden break-words whitespace-normal">
          <div className="w-[calc(100%-32px)]">{card.title}</div>
          <IconButton
            name="edit"
            className="single-icon group-hover:flex"
            onClick={handleMenuOpen}
            data-event-target="menu-button"
          />
        </div>
      </div>
      {open && (
        <ul className="flex flex-row justify-around mb-1 menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
          <li>
            <button type="button" onClick={onEditClick}>
              Edit card
            </button>
          </li>
          <li>
            <button type="button" onClick={onDeleteClick}>
              Delete card
            </button>
          </li>
        </ul>
      )}
    </CardDraggable>
  );
};

export default Card;
