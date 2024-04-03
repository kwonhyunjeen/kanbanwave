import clsx from 'clsx';
import { Icon, IconButton } from './common';

type NavProps = {
  open: boolean;
  onClickDrawer: () => void;
};

const Nav = ({ open, onClickDrawer }: NavProps) => {
  return (
    <nav
      className={clsx('fixed h-full w-nav-drawer border-r transition-all duration-300', {
        'translate-x-0': !open,
        '-translate-x-[14.5rem]': open
      })}>
      <div className="flex items-center p-4 border-b">
        <Icon name="cruelty_free" className="mr-2 text-3xl" />
        <p className="flex-1">Trello workspace</p>
        <IconButton
          name="double_arrow"
          onClick={onClickDrawer}
          className={
            open
              ? 'fixed -right-4 btn-circle btn-xs'
              : 'btn-xs btn-ghost btn-square rotate-180'
          }
        />
      </div>
      <ul className="bg-white menu">
        <li>
          <a>
            <Icon name="dashboard" />
            Boards
          </a>
        </li>
        <li>
          <a>
            <Icon name="person" />
            Members
          </a>
        </li>
        <li>
          <details open className="transition duration-300 ease-in-out">
            <summary className="font-semibold">Your boards</summary>
            <ul className="transition-all duration-300 ease-in-out">
              <li>
                <a>Untitled board 1</a>
              </li>
              <li>
                <a>Untitled board 2</a>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
