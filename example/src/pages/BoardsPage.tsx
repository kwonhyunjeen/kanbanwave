import { Title } from 'app/components';
import { Link } from 'react-router-dom';
import BoardCollection from 'kanbanwave/features/BoardCollection/BoardCollection';

const BoardsPage = () => {
  return (
    <section className="p-8">
      <div className="flex flex-col mx-auto max-w-[1600px]">
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
