import { Title } from '@/components';
import { Board, BoardCollection } from 'kanbanwave';
import { Link } from 'react-router-dom';

const BoardsPage = () => {
  return (
    <section className="p-8">
      <div className="flex flex-col">
        <Title className="mb-8 text-black">Boards</Title>
        <BoardCollection
          boardRender={({ boardProps, board }) => (
            <Board {...boardProps} as={Link} to={`/boards/${board.id}`} />
          )}
        />
      </div>
    </section>
  );
};

export default BoardsPage;
