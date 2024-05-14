import clsx from 'clsx';
import { Icon, IconButton } from 'components';

type NavProps = {
  open: boolean;
  onClickDrawer: () => void;
};

const Nav = ({ open, onClickDrawer }: NavProps) => {
  return (
    <nav
      className={clsx('app-nav', {
        'translate-x-0 ': !open,
        '-translate-x-[15rem]': open
      })}>
      {!open ? (
        <>
          <div className="flex items-center h-16 p-4 border-b">
            <Icon name="cruelty_free" className="mr-2 text-3xl" />
            <p className="flex-1">Trello workspace</p>
            <IconButton
              name="double_arrow"
              onClick={onClickDrawer}
              className="rotate-180 single-icon"
            />
          </div>
          <ul className="menu">
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
              <details open>
                <summary className="font-semibold">Your boards</summary>
                <ul>
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
        </>
      ) : (
        <div className="absolute h-full bg-sky-100 -right-1" onClick={onClickDrawer}>
          <IconButton
            name="double_arrow"
            className="w-6 h-full border-0 rounded-none shadow-none single-icon hover:bg-sky-100"
          />
        </div>
      )}
    </nav>
  );
};

export default Nav;
