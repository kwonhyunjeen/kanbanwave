import { BaseLayout } from 'components';
import { NoMatch } from 'components/routes';
import { BoardPage, BoardsPage } from 'pages';
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
