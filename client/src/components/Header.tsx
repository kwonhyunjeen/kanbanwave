import { Avatar, Icon, Input, Subtitle } from './common';

const Header = () => {
  return (
    <header className="fixed right-0 left-auto h-16 border-b navbar bg-base-100">
      <div className="flex-1">
        <a className="text-xl btn btn-ghost" href="/">
          <Subtitle>MyTrello</Subtitle>
        </a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <Input type="text" leftIcon={<Icon name="search" />} placeholder="Search" />
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <Avatar />
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Card</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
