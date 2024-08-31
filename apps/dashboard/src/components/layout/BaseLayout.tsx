import { Header, Nav } from '@/components';
import { useToggle } from '@/hooks';
import { Outlet } from 'react-router-dom';

const BaseLayout = () => {
  const [isNavOpen, toggleNav] = useToggle(true);
  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1">
        <Nav isOpen={isNavOpen} onToggleNav={toggleNav} />
        <main className="grow overflow-y-auto bg-slate-100">
          <Header />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BaseLayout;
