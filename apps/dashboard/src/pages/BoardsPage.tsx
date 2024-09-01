import { Title } from '@/components';
import { Link } from 'react-router-dom';
import { BoardCollection } from 'kanbanwave';

const BoardsPage = () => {
  return (
    <section className="p-8">
      <div className="mx-auto flex max-w-[1600px] flex-col">
        <Title className="mb-8 text-black">Boards</Title>
        <BoardCollection
          boardRender={provided => (
            <Link to={`/boards/${provided.meta.board.id}`}>
              <provided.Component {...provided.props} />
            </Link>
          )}
        />
      </div>
    </section>
  );
};

export default BoardsPage;
