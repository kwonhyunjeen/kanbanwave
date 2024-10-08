import { NoMatch } from '@/components/routes';
import { RouterParamKeys } from '@/routes/router';
import { BoardView } from 'kanbanwave';
import { useParams } from 'react-router-dom';

const BoardPage = () => {
  const { boardId } = useParams<RouterParamKeys>();

  if (boardId == null) {
    return <NoMatch />;
  }

  /** @todo 카드 상세 페이지 개발되면 cardRender로 링크 연결 */
  return (
    <section className="p-8">
      <div className="flex flex-col">
        <BoardView boardId={boardId} />
      </div>
    </section>
  );
};

export default BoardPage;
