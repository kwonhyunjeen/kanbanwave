import { BaseLayout } from 'app/components';
import { NoMatch } from 'app/components/routes';
import { BoardPage, BoardsPage } from 'app/pages';
import { createBrowserRouter } from 'react-router-dom';

export type RouterParamKeys = 'boardId';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      { path: '/boards', element: <BoardsPage /> },
      { path: '/boards/:boardId', element: <BoardPage /> }
    ]
  },
  { path: '*', element: <NoMatch /> }
]);

export default router;
