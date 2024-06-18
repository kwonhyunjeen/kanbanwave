import { BoardView } from 'kanbanwave';
import { useLocation } from 'react-router-dom';

const BoardPage = () => {
  const location = useLocation();
  const board = location.state?.board;
  /** @todo 카드 상세 페이지 개발되면 cardRender로 링크 연결 */
  return <BoardView board={board} />;
};

export default BoardPage;
