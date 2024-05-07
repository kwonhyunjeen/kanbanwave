import { Header, Nav } from 'components';
import { useToggle } from 'hooks';
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';

const BaseLayout = () => {
  const [open, drawerOpen] = useToggle(false);
  return (
    <div className="app-layout">
      <Header />
      <div className="app-container">
        <Nav open={open} onClickDrawer={drawerOpen} />
        <main
          className={clsx('app-main', {
            'ml-[260px]': !open
          })}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BaseLayout;
