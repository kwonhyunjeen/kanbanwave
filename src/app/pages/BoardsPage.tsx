import { Title } from 'app/components';
import { Link } from 'react-router-dom';
import BoardCollection from 'kanbanwave/features/BoardCollection/BoardCollection';

const BoardsPage = () => {
  return (
    <section className="p-8">
      <div className="flex flex-col mx-auto my-0 max-w-[1600px]">
        <Title className="mb-4 text-white">Boards</Title>
        <div className="max-w-[1600px] pt-5 px-0">
          <BoardCollection
            boardRender={provided => (
              <Link to={`/boards/${provided.meta.board.id}`}>
                <provided.Component {...provided.props} />
              </Link>
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default BoardsPage;
