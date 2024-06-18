import { Board } from 'kanbanwave';
import { useLocation } from 'react-router-dom';

const BoardPage = () => {
  const location = useLocation();
  const board = location.state?.board;
  return <Board board={board} />;
};

export default BoardPage;
