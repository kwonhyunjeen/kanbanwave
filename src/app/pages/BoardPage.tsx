import { NoMatch } from 'app/components/routes';
import { RouterParamKeys } from 'app/routes/router';
import { BoardView } from 'kanbanwave';
import { useParams } from 'react-router-dom';

const BoardPage = () => {
  const { boardId } = useParams<RouterParamKeys>();

  if (boardId == null) {
    return <NoMatch />;
  }

  /** @todo 카드 상세 페이지 개발되면 cardRender로 링크 연결 */
  return <BoardView boardId={boardId} />;
};

export default BoardPage;
