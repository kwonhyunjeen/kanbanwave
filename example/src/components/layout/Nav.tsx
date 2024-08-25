import clsx from 'clsx';
import { Icon, IconButton, Subtitle } from '@/components';
import { Link } from 'react-router-dom';
import { KWBoard, useKanbanwaveStore } from 'kanbanwave';
import { useEffect, useState } from 'react';

type NavProps = {
  isOpen: boolean;
  onToggleNav?: () => void;
};

const Nav = ({ isOpen, onToggleNav }: NavProps) => {
  const { getBoards } = useKanbanwaveStore();
  const [boards, setBoards] = useState<KWBoard[]>([]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);

  const handleToggleDetails = () => setIsDetailsOpen(!isDetailsOpen);

  useEffect(() => {
    (async () => {
      setBoards(await getBoards());
    })();
  }, [getBoards]);

  return (
    <nav
      className={`bg-white transition-all duration-300 ${
        isOpen ? 'w-64 px-3' : 'w-11 px-1'
      }`}>
      <div className="py-4 w-[calc(theme(spacing[64])-theme(spacing[6]))]">
        <IconButton
          icon="view_sidebar"
          onClick={onToggleNav}
          color="default"
          className="mb-6 ml-1 rotate-180"
        />
        <div
          className={`flex flex-col w-full gap-2 transition-all ${
            isOpen ? 'visible opacity-100' : 'invisible opacity-0'
          }`}>
          <Link
            to="/boards"
            className="flex items-center w-full h-10 px-2 transition-all duration-300 hover:bg-zinc-400/50 hover:rounded-md">
            <Icon name="view_kanban" className="mr-3" />
            Boards
          </Link>
          <div className="mt-4">
            <Subtitle
              size="lg"
              className="flex items-center justify-between px-1 mb-2 font-semibold cursor-pointer"
              onClick={handleToggleDetails}>
              Your boards
              <Icon name={isDetailsOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'} />
            </Subtitle>
            <div
              className={clsx(
                'transition-all duration-200 overflow-hidden cursor-pointer',
                isDetailsOpen ? 'max-h-screen' : 'max-h-0'
              )}>
              {isDetailsOpen && (
                <>
                  {boards.map(board => (
                    <div
                      key={board.id}
                      className="px-3 py-2 my-1 transition-all duration-200 hover:bg-zinc-400/50 hover:rounded-md">
                      <Link
                        to={`/boards/${board.id}`}
                        state={{ board }}
                        className="block w-full">
                        {board.title}
                      </Link>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
