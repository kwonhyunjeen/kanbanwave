import { useToggle } from 'app/hooks';
import { IconButton } from 'app/components';
import { KWCard } from './types';
import CardDraggable from './CardDraggable';

type CardProps = {
  card: KWCard;
  draggableId: string;
  index: number;
  onCardClick?: () => void;
  onCardEdit?: () => void;
  onCardDelete?: () => void;
};

const Card = ({
  card,
  draggableId,
  index,
  onCardClick,
  onCardEdit,
  onCardDelete
}: CardProps) => {
  const [open, menuOpen] = useToggle(false);
  const handleMenuOpen = () => {
    menuOpen();
  };

  return (
    <CardDraggable draggableId={draggableId} index={index}>
      <div className="card group" onClick={onCardClick}>
        {/* @todo 카드 상세 페이지 개발되면, 링크 연결 */}
        <a className="relative flex items-center justify-between overflow-hidden break-words whitespace-normal">
          <div className="w-[calc(100%-32px)]">{card.title}</div>
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
          <li onClick={onCardDelete}>
            <a>Delete card</a>
          </li>
        </ul>
      )}
    </CardDraggable>
  );
};

export default Card;
