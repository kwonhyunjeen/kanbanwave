import { useToggle } from 'hooks';
import { IconButton } from '../../components/common';

const ListCard = () => {
  const [open, menuOpen] = useToggle(false);
  const handleMenuOpen = () => {
    menuOpen();
  };

  return (
    <>
      <div className="card group">
        <a className="break-words whitespace-normal">
          <div>title</div>
          <IconButton
            name="edit"
            className="absolute hidden w-8 right-1 top-1 group-hover:flex"
            onClick={handleMenuOpen}
          />
        </a>
      </div>
      {open && (
        <ul className="flex flex-row justify-around mb-1 menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
          <li>
            <a>Edit card</a>
          </li>
          <li>
            <a>Delete card</a>
          </li>
        </ul>
      )}
    </>
  );
};

export default ListCard;
