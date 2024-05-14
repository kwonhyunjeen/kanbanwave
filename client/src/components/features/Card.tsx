import { useToggle } from 'hooks';
import { IconButton, CardDraggable } from 'components';
import { Card as ICard } from 'store/commonTypes';

type CardProps = {
  card: ICard;
  draggableId: string;
  index: number;
  onCardClick?: () => void;
  onCardEdit?: () => void;
  onCardRemove?: () => void;
};

const Card = ({
  card,
  draggableId,
  index,
  onCardClick,
  onCardEdit,
  onCardRemove
}: CardProps) => {
  const [open, menuOpen] = useToggle(false);
  const handleMenuOpen = () => {
    menuOpen();
  };

  return (
    <CardDraggable draggableId={draggableId} index={index}>
      <div className="card group" onClick={onCardClick}>
        <a className="relative flex items-center justify-between break-words whitespace-normal">
          <div>{card.title}</div>
          <IconButton
            name="edit"
            className="single-icon group-hover:flex"
            onClick={handleMenuOpen}
          />
        </a>
      </div>
      {open && (
        <ul className="flex flex-row justify-around mb-1 menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
          <li onClick={onCardEdit}>
            <a>Edit card</a>
          </li>
          <li onClick={onCardRemove}>
            <a>Delete card</a>
          </li>
        </ul>
      )}
    </CardDraggable>
  );
};

export default Card;