import Header from './Header';
import Nav from './Nav';
import { useToggle } from 'hooks';
import clsx from 'clsx';

const Layout = () => {
  const [open, drawerOpen] = useToggle(false);
  return (
    <>
      <Header />
      <div className="flex min-h-screen pt-16">
        <Nav open={open} onClickDrawer={drawerOpen} />
        <main
          className={clsx(
            'w-screen flex-grow  overflow-auto transition-all duration-300 py-6 px-12',
            {
              'ml-64': !open
            }
          )}>
          <h1>Main Content</h1>
        </main>
      </div>
    </>
  );
};

export default Layout;
