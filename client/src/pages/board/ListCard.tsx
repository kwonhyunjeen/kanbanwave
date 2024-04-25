import { useToggle } from 'hooks';
import { IconButton } from '../../components/common';
import { Card } from 'store/commonTypes';

type ListCardProps = {
  card: Card;
  onCardClick?: () => void;
  onCardEdit?: () => void;
  onCardRemove?: () => void;
};

const ListCard = ({ card, onCardClick, onCardEdit, onCardRemove }: ListCardProps) => {
  const [open, menuOpen] = useToggle(false);
  const handleMenuOpen = () => {
    menuOpen();
  };

  return (
    <>
      <div className="card group" onClick={onCardClick}>
        <a className="break-words whitespace-normal">
          <div>{card.title}</div>
          <IconButton
            name="edit"
            className="absolute hidden w-8 right-1 top-1 group-hover:flex"
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
    </>
  );
};

export default ListCard;
