import clsx from 'clsx';
import { Icon, IconButton } from './common';

type NavProps = {
  open: boolean;
  onClickDrawer: () => void;
};

const Nav = ({ open, onClickDrawer }: NavProps) => {
  return (
    <nav
      className={clsx('app-nav', {
        'translate-x-0': !open,
        '-translate-x-[15rem]': open
      })}>
      <div className="flex items-center h-16 p-4 border-b">
        <Icon name="cruelty_free" className="mr-2 text-3xl" />
        <p className="flex-1">Trello workspace</p>
        <IconButton
          name="double_arrow"
          onClick={onClickDrawer}
          className={clsx('btn-xs btn-ghost btn-square', {
            'fixed -right-4 bg-transparent border-0 shadow-none': open,
            'rotate-180': !open
          })}
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
